import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://pbdnttcirbuvjxdvwpxf.supabase.co';

const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiZG50dGNpcmJ1dmp4ZHZ3cHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1MDA2OTcsImV4cCI6MjA1MTA3NjY5N30.T0dFsjuuX28lErsbCE0KrHq-YaCsEnKNFhnghIoOgKI';

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
