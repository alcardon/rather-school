
import "./globals.css";
import { createClient } from "@/lib/supabase-browser";
import type { Database } from "@/lib/database.types";
import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
export type TypedSupabaseClient = SupabaseClient<Database>;
import SupabaseListener from "@/components/common/supabase-listener";
import SupabaseProvider from "@/components/common/supabase-provider";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";
import MuiThemeProvider from "@/components/common/muiThemeProviders";

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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </head>

      <body>
        <MuiThemeProvider >
          <SupabaseProvider>
            <SupabaseListener serverAccessToken={ session?.access_token } />
            { children }
          </SupabaseProvider>
        </MuiThemeProvider>
      </body>

    </html>
  );
}
