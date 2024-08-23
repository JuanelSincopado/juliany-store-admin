import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://yvdfjxdlamkgngwldrju.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2ZGZqeGRsYW1rZ25nd2xkcmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAzMzA5NzYsImV4cCI6MjAzNTkwNjk3Nn0.RUaQOd1zJKJmTpoB8ExRvipQhQkLSB_BpOLGQuSA7ZE"
);

export default supabase;
