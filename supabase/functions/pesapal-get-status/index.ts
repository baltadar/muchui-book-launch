import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const merchantReference = url.searchParams.get("ref");
    
    console.log("Getting order status for:", merchantReference);

    if (!merchantReference) {
      throw new Error("Missing merchant reference");
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Get order from database
    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("merchant_reference", merchantReference)
      .maybeSingle();

    if (error) {
      console.error("Failed to get order:", error);
      throw new Error("Failed to get order");
    }

    if (!order) {
      throw new Error("Order not found");
    }

    console.log("Order found:", order);

    return new Response(
      JSON.stringify({ 
        success: true, 
        order: {
          id: order.id,
          merchantReference: order.merchant_reference,
          orderType: order.order_type,
          copies: order.copies,
          amount: order.amount,
          currency: order.currency,
          status: order.status,
          firstName: order.first_name,
          lastName: order.last_name,
          email: order.email,
          createdAt: order.created_at,
        }
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error getting order status:", error);
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
