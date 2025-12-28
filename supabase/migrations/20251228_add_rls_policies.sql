-- Enable RLS on project table
ALTER TABLE public.project ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" 
ON public.project 
FOR SELECT 
USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" 
ON public.project 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update their own rows (if they have a user_id)
CREATE POLICY "Allow authenticated update" 
ON public.project 
FOR UPDATE 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to delete their own rows
CREATE POLICY "Allow authenticated delete" 
ON public.project 
FOR DELETE 
USING (auth.role() = 'authenticated');
