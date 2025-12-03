import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PESAPAL_CONSUMER_KEY = Deno.env.get("PESAPAL_CONSUMER_KEY");
const PESAPAL_CONSUMER_SECRET = Deno.env.get("PESAPAL_CONSUMER_SECRET");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

// Use sandbox for testing, change to production when going live
const IS_LIVE = true;
const PESAPAL_BASE_URL = IS_LIVE 
  ? "https://pay.pesapal.com/v3" 
  : "https://cybqa.pesapal.com/pesapalv3";

interface OrderRequest {
  orderType: "standard" | "deluxe";
  copies: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

async function getAuthToken(): Promise<string> {
  console.log("Getting PesaPal auth token...");
  
  const response = await fetch(`${PESAPAL_BASE_URL}/api/Auth/RequestToken`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      consumer_key: PESAPAL_CONSUMER_KEY,
      consumer_secret: PESAPAL_CONSUMER_SECRET,
    }),
  });

  const data = await response.json();
  console.log("Auth response:", JSON.stringify(data));
  
  if (data.error || !data.token) {
    throw new Error(data.message || "Failed to get auth token");
  }
  
  return data.token;
}

async function registerIPN(token: string, ipnUrl: string): Promise<string> {
  console.log("Registering IPN URL:", ipnUrl);
  
  const response = await fetch(`${PESAPAL_BASE_URL}/api/URLSetup/RegisterIPN`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      url: ipnUrl,
      ipn_notification_type: "POST",
    }),
  });

  const data = await response.json();
  console.log("IPN registration response:", JSON.stringify(data));
  
  if (data.error || !data.ipn_id) {
    throw new Error(data.message || "Failed to register IPN URL");
  }
  
  return data.ipn_id;
}

async function submitOrder(
  token: string, 
  notificationId: string, 
  order: {
    merchantReference: string;
    amount: number;
    description: string;
    callbackUrl: string;
    billingAddress: {
      email: string;
      firstName: string;
      lastName: string;
      phone?: string;
    };
  }
): Promise<string> {
  console.log("Submitting order to PesaPal...");
  
  const requestBody = {
    id: order.merchantReference,
    currency: "KES",
    amount: order.amount,
    description: order.description,
    callback_url: order.callbackUrl,
    notification_id: notificationId,
    billing_address: {
      email_address: order.billingAddress.email,
      first_name: order.billingAddress.firstName,
      last_name: order.billingAddress.lastName,
      phone_number: order.billingAddress.phone || "",
      country_code: "KE",
    },
  };
  
  console.log("Order request body:", JSON.stringify(requestBody));

  const response = await fetch(`${PESAPAL_BASE_URL}/api/Transactions/SubmitOrderRequest`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();
  console.log("Order submission response:", JSON.stringify(data));
  
  if (data.error || !data.redirect_url) {
    // Provide more specific error messages
    if (data.error?.code === "amount_exceeds_default_limit") {
      throw new Error("Payment system limit reached. Please contact info@yaafrika.org for assistance.");
    }
    throw new Error(data.error?.message || data.message || "Failed to submit order");
  }
  
  return data.redirect_url;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderType, copies, firstName, lastName, email, phone }: OrderRequest = await req.json();
    
    console.log("Received order request:", { orderType, copies, firstName, lastName, email, phone });

    // Validate input
    if (!orderType || !copies || !firstName || !lastName || !email) {
      throw new Error("Missing required fields");
    }

    if (copies < 1 || copies > 5000) {
      throw new Error("Invalid number of copies");
    }

    // Calculate amount
    const pricePerCopy = orderType === "deluxe" ? 5000 : 2500;
    const amount = copies * pricePerCopy;
    
    // Generate unique merchant reference
    const merchantReference = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    
    // Save order to database
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        merchant_reference: merchantReference,
        order_type: orderType,
        copies,
        amount,
        currency: "KES",
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone || null,
        status: "pending",
      })
      .select()
      .single();
    
    if (orderError) {
      console.error("Failed to save order:", orderError);
      throw new Error("Failed to create order record");
    }
    
    console.log("Order saved to database:", orderData);

    // Get auth token
    const token = await getAuthToken();
    
    // Get the base URL for callbacks
    const baseUrl = req.headers.get("origin") || "https://theothersideofhard.lovable.app";
    const ipnUrl = `${SUPABASE_URL}/functions/v1/pesapal-ipn`;
    const callbackUrl = `${baseUrl}/payment-callback?ref=${merchantReference}`;
    
    // Register IPN URL
    const notificationId = await registerIPN(token, ipnUrl);
    
    // Submit order to PesaPal
    const description = orderType === "deluxe" 
      ? `Pre-order: ${copies} Deluxe Edition copies of "The Other Side of Hard"`
      : `Pre-order: ${copies} copies of "The Other Side of Hard"`;
    
    const redirectUrl = await submitOrder(token, notificationId, {
      merchantReference,
      amount,
      description,
      callbackUrl,
      billingAddress: {
        email,
        firstName,
        lastName,
        phone,
      },
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        redirectUrl,
        merchantReference,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error creating order:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
