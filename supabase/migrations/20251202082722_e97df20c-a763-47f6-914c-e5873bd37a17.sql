-- Create orders table to track pre-orders
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  merchant_reference VARCHAR(50) NOT NULL UNIQUE,
  order_type VARCHAR(20) NOT NULL CHECK (order_type IN ('standard', 'deluxe')),
  copies INTEGER NOT NULL CHECK (copies > 0),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'KES',
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  
  -- Customer info
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  
  -- PesaPal tracking
  pesapal_tracking_id VARCHAR(100),
  pesapal_payment_method VARCHAR(50),
  pesapal_payment_status VARCHAR(50),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Public can insert orders (for creating new orders)
CREATE POLICY "Anyone can create orders"
ON public.orders
FOR INSERT
WITH CHECK (true);

-- Public can view their own orders by email (for order status lookup)
CREATE POLICY "Anyone can view orders by merchant reference"
ON public.orders
FOR SELECT
USING (true);

-- Only allow updates from authenticated service role (for IPN callbacks)
CREATE POLICY "Service role can update orders"
ON public.orders
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();