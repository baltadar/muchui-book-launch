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
const IS_LIVE = false;
const PESAPAL_BASE_URL = IS_LIVE 
  ? "https://pay.pesapal.com/v3" 
  : "https://cybqa.pesapal.com/pesapalv3";

async function getAuthToken(): Promise<string> {
  console.log("Getting PesaPal auth token for IPN...");
  
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
  
  if (data.error || !data.token) {
    throw new Error(data.message || "Failed to get auth token");
  }
  
  return data.token;
}

async function getTransactionStatus(token: string, orderTrackingId: string) {
  console.log("Getting transaction status for:", orderTrackingId);
  
  const response = await fetch(
    `${PESAPAL_BASE_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
    {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  console.log("Transaction status response:", JSON.stringify(data));
  
  return data;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received IPN notification");
    console.log("Request method:", req.method);
    
    let orderTrackingId: string | null = null;
    let merchantReference: string | null = null;

    // Handle both GET and POST requests
    if (req.method === "GET") {
      const url = new URL(req.url);
      orderTrackingId = url.searchParams.get("OrderTrackingId");
      merchantReference = url.searchParams.get("OrderMerchantReference");
    } else {
      const body = await req.json();
      console.log("IPN body:", JSON.stringify(body));
      orderTrackingId = body.OrderTrackingId;
      merchantReference = body.OrderMerchantReference;
    }

    console.log("Order tracking ID:", orderTrackingId);
    console.log("Merchant reference:", merchantReference);

    if (!orderTrackingId || !merchantReference) {
      throw new Error("Missing order tracking ID or merchant reference");
    }

    // Get auth token
    const token = await getAuthToken();
    
    // Get transaction status from PesaPal
    const transactionStatus = await getTransactionStatus(token, orderTrackingId);
    
    console.log("Transaction status:", JSON.stringify(transactionStatus));

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Map PesaPal status to our status
    let orderStatus = "pending";
    if (transactionStatus.payment_status_description === "Completed") {
      orderStatus = "completed";
    } else if (transactionStatus.payment_status_description === "Failed") {
      orderStatus = "failed";
    } else if (transactionStatus.payment_status_description === "Cancelled") {
      orderStatus = "cancelled";
    }

    // Update order in database
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: orderStatus,
        pesapal_tracking_id: orderTrackingId,
        pesapal_payment_method: transactionStatus.payment_method || null,
        pesapal_payment_status: transactionStatus.payment_status_description || null,
      })
      .eq("merchant_reference", merchantReference);

    if (updateError) {
      console.error("Failed to update order:", updateError);
      throw new Error("Failed to update order status");
    }

    console.log("Order status updated successfully");

    return new Response(
      JSON.stringify({ 
        status: "success",
        orderStatus,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error processing IPN:", error);
    return new Response(
      JSON.stringify({ 
        status: "error", 
        message: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
