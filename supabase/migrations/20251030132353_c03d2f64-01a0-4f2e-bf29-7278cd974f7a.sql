-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create heuristic evaluations table
CREATE TABLE public.heuristic_evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  evaluator_name TEXT NOT NULL,
  evaluation_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  heuristics JSONB NOT NULL,
  overall_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on heuristic_evaluations
ALTER TABLE public.heuristic_evaluations ENABLE ROW LEVEL SECURITY;

-- Heuristic evaluations policies
CREATE POLICY "Users can view their own evaluations"
  ON public.heuristic_evaluations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own evaluations"
  ON public.heuristic_evaluations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own evaluations"
  ON public.heuristic_evaluations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own evaluations"
  ON public.heuristic_evaluations FOR DELETE
  USING (auth.uid() = user_id);

-- Create cognitive walkthroughs table
CREATE TABLE public.cognitive_walkthroughs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  evaluator_name TEXT NOT NULL,
  evaluation_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tasks JSONB NOT NULL,
  overall_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on cognitive_walkthroughs
ALTER TABLE public.cognitive_walkthroughs ENABLE ROW LEVEL SECURITY;

-- Cognitive walkthroughs policies
CREATE POLICY "Users can view their own walkthroughs"
  ON public.cognitive_walkthroughs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own walkthroughs"
  ON public.cognitive_walkthroughs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own walkthroughs"
  ON public.cognitive_walkthroughs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own walkthroughs"
  ON public.cognitive_walkthroughs FOR DELETE
  USING (auth.uid() = user_id);

-- Create usability tests table
CREATE TABLE public.usability_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  test_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  participant_info JSONB NOT NULL,
  test_scenarios JSONB NOT NULL,
  findings JSONB NOT NULL,
  overall_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on usability_tests
ALTER TABLE public.usability_tests ENABLE ROW LEVEL SECURITY;

-- Usability tests policies
CREATE POLICY "Users can view their own tests"
  ON public.usability_tests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tests"
  ON public.usability_tests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tests"
  ON public.usability_tests FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tests"
  ON public.usability_tests FOR DELETE
  USING (auth.uid() = user_id);

-- Create contact submissions table
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on contact_submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Contact submissions policies (users can only see their own submissions)
CREATE POLICY "Users can view their own submissions"
  ON public.contact_submissions FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create contact submissions"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_heuristic_evaluations_updated_at
  BEFORE UPDATE ON public.heuristic_evaluations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cognitive_walkthroughs_updated_at
  BEFORE UPDATE ON public.cognitive_walkthroughs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_usability_tests_updated_at
  BEFORE UPDATE ON public.usability_tests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();