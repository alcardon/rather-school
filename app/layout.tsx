import "./globals.css";
import { createClient } from "@/lib/supabase-browser";
import type { Database } from "@/lib/database.types";
import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
export type TypedSupabaseClient = SupabaseClient<Database>;
import { AuthProvider } from "@/components/auth/authProvider";
import SupabaseListener from "@/components/auth/supabaseListener";
import SupabaseProvider from "@/components/auth/supabaseProvider";

// do not cache this layout
export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <head />
      <body>
        <SupabaseProvider>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <AuthProvider accessToken={session?.access_token}>
            {children}
          </AuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
