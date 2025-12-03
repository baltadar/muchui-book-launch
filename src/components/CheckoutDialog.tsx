import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ShoppingCart } from "lucide-react";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderType: "standard" | "deluxe";
  copies: number;
  totalPrice: number;
}

const CheckoutDialog = ({ open, onOpenChange, orderType, copies, totalPrice }: CheckoutDialogProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      toast({ title: "Error", description: "Please enter your first name", variant: "destructive" });
      return false;
    }
    if (!formData.lastName.trim()) {
      toast({ title: "Error", description: "Please enter your last name", variant: "destructive" });
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({ title: "Error", description: "Please enter a valid email address", variant: "destructive" });
      return false;
    }
    if (!formData.phone.trim() || !/^\+?[0-9\s-]{10,}$/.test(formData.phone.trim())) {
      toast({ title: "Error", description: "Please enter a valid phone number", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      console.log("Creating order...", { orderType, copies, ...formData });
      
      const { data, error } = await supabase.functions.invoke("pesapal-create-order", {
        body: {
          orderType,
          copies,
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
        },
      });

      if (error) {
        console.error("Function error:", error);
        throw new Error(error.message || "Failed to create order");
      }

      if (!data.success) {
        throw new Error(data.error || "Failed to create order");
      }

      console.log("Order created, redirecting to:", data.redirectUrl);
      
      // Redirect to PesaPal payment page
      window.location.href = data.redirectUrl;
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to process order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Pre-Order</DialogTitle>
          <DialogDescription>
            {orderType === "deluxe" ? "Deluxe Edition" : "Standard Edition"} - {copies} {copies === 1 ? "copy" : "copies"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Order Summary */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Amount:</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  KES {totalPrice.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Customer Info Form */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="John"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+254 7XX XXX XXX"
              disabled={isLoading}
              required
            />
          </div>

          <Button 
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full h-12 text-lg font-bold"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Pay with PesaPal
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            You will be redirected to PesaPal to complete your payment securely via M-PESA, Airtel Money, or Card.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
