
-- Step 1: Update the profiles table structure to use 'role' instead of 'user'
ALTER TABLE public.profiles 
DROP COLUMN IF EXISTS "user";

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Step 2: Create the propfirms table with the specified structure
CREATE TABLE IF NOT EXISTS public.propfirms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  cost INTEGER NOT NULL DEFAULT 0,
  payout INTEGER NOT NULL DEFAULT 0,
  platform TEXT,
  category TEXT NOT NULL CHECK (category IN ('explore', 'cheap', 'top')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Step 3: Enable RLS on propfirms table
ALTER TABLE public.propfirms ENABLE ROW LEVEL SECURITY;

-- Step 4: Create RLS policies for propfirms
-- Users can view their own data
CREATE POLICY "Users can view own propfirms" ON public.propfirms
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own data
CREATE POLICY "Users can insert own propfirms" ON public.propfirms
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own data
CREATE POLICY "Users can update own propfirms" ON public.propfirms
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own data
CREATE POLICY "Users can delete own propfirms" ON public.propfirms
  FOR DELETE USING (auth.uid() = user_id);

-- Step 5: Create a security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 6: Create admin policies for propfirms (admins can access all data)
CREATE POLICY "Admins can view all propfirms" ON public.propfirms
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can insert all propfirms" ON public.propfirms
  FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update all propfirms" ON public.propfirms
  FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete all propfirms" ON public.propfirms
  FOR DELETE USING (public.is_admin());

-- Step 7: Give admin access to akshaysaways@gmail.com
-- First, we need to find the user ID and update their role
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'akshaysaways@gmail.com';

-- If the profile doesn't exist yet, we'll handle it in the trigger function
-- Update the handle_new_user function to properly set up profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    CASE 
      WHEN NEW.email = 'akshaysaways@gmail.com' THEN 'admin'
      ELSE 'user'
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 8: Insert dummy data for propfirms
INSERT INTO public.propfirms (name, cost, payout, platform, category, user_id) VALUES
-- Explore All Firms
('Alpha Fund', 299, 80, 'MT4/MT5', 'explore', (SELECT id FROM auth.users WHERE email = 'akshaysaways@gmail.com' LIMIT 1)),
('Beta Traders', 349, 85, 'cTrader', 'explore', (SELECT id FROM auth.users WHERE email = 'akshaysaways@gmail.com' LIMIT 1)),
('Delta Capital', 399, 90, 'DXTrade', 'explore', (SELECT id FROM auth.users WHERE email = 'akshaysaways@gmail.com' LIMIT 1)),

-- Cheap Cost Firms
('CheapFX', 99, 70, 'MT4', 'cheap', (SELECT id FROM auth.users WHERE email = 'akshaysaways@gmail.com' LIMIT 1)),
('BudgetTrader', 149, 75, 'MT5', 'cheap', (SELECT id FROM auth.users WHERE email = 'akshaysaways@gmail.com' LIMIT 1)),
('MiniFund', 79, 65, 'WebTrader', 'cheap', (SELECT id FROM auth.users WHERE email = 'akshaysaways@gmail.com' LIMIT 1)),

-- Top 5 Firms
('EliteFX', 599, 95, 'MT4/MT5', 'top', (SELECT id FROM auth.users WHERE email = 'akshaysaways@gmail.com' LIMIT 1)),
('PrimeProp', 649, 92, 'cTrader', 'top', (SELECT id FROM auth.users WHERE email = 'akshaysaways@gmail.com' LIMIT 1)),
('FastPayout', 549, 88, 'DXTrade', 'top', (SELECT id FROM auth.users WHERE email = 'akshaysaways@gmail.com' LIMIT 1)),
('TopTrader', 699, 98, 'MT5', 'top', (SELECT id FROM auth.users WHERE email = 'akshaysaways@gmail.com' LIMIT 1)),
('MaxCapital', 799, 100, 'Proprietary', 'top', (SELECT id FROM auth.users WHERE email = 'akshaysaways@gmail.com' LIMIT 1));

-- Step 9: Enable realtime for propfirms table
ALTER TABLE public.propfirms REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.propfirms;
