import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";

interface OrderDetails {
  id: string;
  merchantReference: string;
  orderType: string;
  copies: number;
  amount: number;
  currency: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const merchantReference = searchParams.get("ref");
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      if (!merchantReference) {
        setError("No order reference provided");
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase.functions.invoke("pesapal-get-status", {
          body: null,
          method: "GET",
        });

        // Since we can't pass query params directly, let's use the read from database approach
        const { data: orderData, error: dbError } = await supabase
          .from("orders")
          .select("*")
          .eq("merchant_reference", merchantReference)
          .maybeSingle();

        if (dbError) {
          throw new Error("Failed to fetch order details");
        }

        if (!orderData) {
          throw new Error("Order not found");
        }

        setOrder({
          id: orderData.id,
          merchantReference: orderData.merchant_reference,
          orderType: orderData.order_type,
          copies: orderData.copies,
          amount: orderData.amount,
          currency: orderData.currency,
          status: orderData.status,
          firstName: orderData.first_name,
          lastName: orderData.last_name,
          email: orderData.email,
          createdAt: orderData.created_at,
        });
      } catch (err: any) {
        console.error("Error fetching order:", err);
        setError(err.message || "Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStatus();
    
    // Poll for updates every 5 seconds if status is pending
    const interval = setInterval(() => {
      if (order?.status === "pending") {
        fetchOrderStatus();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [merchantReference, order?.status]);

  const getStatusIcon = () => {
    if (!order) return null;
    
    switch (order.status) {
      case "completed":
        return <CheckCircle className="h-16 w-16 text-green-500" />;
      case "failed":
      case "cancelled":
        return <XCircle className="h-16 w-16 text-red-500" />;
      default:
        return <Clock className="h-16 w-16 text-yellow-500" />;
    }
  };

  const getStatusMessage = () => {
    if (!order) return "";
    
    switch (order.status) {
      case "completed":
        return "Payment Successful!";
      case "failed":
        return "Payment Failed";
      case "cancelled":
        return "Payment Cancelled";
      default:
        return "Payment Processing...";
    }
  };

  const getStatusDescription = () => {
    if (!order) return "";
    
    switch (order.status) {
      case "completed":
        return `Thank you for your order, ${order.firstName}! Your pre-order of ${order.copies} ${order.orderType === "deluxe" ? "Deluxe Edition" : ""} ${order.copies === 1 ? "copy" : "copies"} has been confirmed. You will receive a confirmation email at ${order.email}.`;
      case "failed":
        return "Unfortunately, your payment could not be processed. Please try again or contact support if the problem persists.";
      case "cancelled":
        return "Your payment was cancelled. If this was a mistake, you can try ordering again.";
      default:
        return "We're processing your payment. This page will update automatically once the payment is confirmed.";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-lg mx-auto text-center">
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading order details...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-4">
              <XCircle className="h-16 w-16 text-red-500" />
              <h1 className="text-2xl font-semibold">Error</h1>
              <p className="text-muted-foreground">{error}</p>
              <Link to="/">
                <Button>Return to Home</Button>
              </Link>
            </div>
          ) : order ? (
            <div className="flex flex-col items-center gap-6">
              {getStatusIcon()}
              <h1 className="text-3xl font-semibold">{getStatusMessage()}</h1>
              <p className="text-muted-foreground">{getStatusDescription()}</p>
              
              {/* Order Details */}
              <div className="w-full bg-muted/30 rounded-lg p-6 text-left mt-4">
                <h2 className="font-semibold mb-4">Order Details</h2>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Order Reference:</dt>
                    <dd className="font-mono">{order.merchantReference}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Edition:</dt>
                    <dd>{order.orderType === "deluxe" ? "Deluxe Edition" : "Standard Edition"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Quantity:</dt>
                    <dd>{order.copies} {order.copies === 1 ? "copy" : "copies"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Amount:</dt>
                    <dd className="font-semibold">{order.currency} {Number(order.amount).toLocaleString()}</dd>
                  </div>
                </dl>
              </div>

              <div className="flex gap-4 mt-4">
                <Link to="/">
                  <Button variant="outline">Return to Home</Button>
                </Link>
                {order.status !== "completed" && (
                  <Link to="/#pre-order">
                    <Button>Try Again</Button>
                  </Link>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default PaymentCallback;
