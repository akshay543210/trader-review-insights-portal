
-- Step 1: Update admin access for immortalwar777@gmail.com
-- Update the handle_new_user function to include the new admin email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    CASE 
      WHEN NEW.email IN ('akshaysaways@gmail.com', 'immortalwar777@gmail.com') THEN 'admin'
      ELSE 'user'
    END
  );
  RETURN NEW;
END;
$function$;

-- Manually set admin role for immortalwar777@gmail.com if they already exist
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'immortalwar777@gmail.com';

-- Step 2: Create reviews table for the reviews system (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  firm_id uuid REFERENCES public.prop_firms(id) ON DELETE CASCADE,
  user_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  is_verified boolean DEFAULT false,
  helpful_count integer DEFAULT 0
);

-- Enable RLS on reviews table
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can create reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can update reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can delete reviews" ON public.reviews;

-- Create RLS policies for reviews
-- Anyone can read reviews
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT USING (true);

-- Anyone (anonymous or authenticated) can insert reviews
CREATE POLICY "Anyone can create reviews" ON public.reviews
  FOR INSERT WITH CHECK (true);

-- Only admins can update reviews
CREATE POLICY "Admins can update reviews" ON public.reviews
  FOR UPDATE USING (public.is_admin());

-- Only admins can delete reviews
CREATE POLICY "Admins can delete reviews" ON public.reviews
  FOR DELETE USING (public.is_admin());

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_reviews_firm_id ON public.reviews(firm_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);
