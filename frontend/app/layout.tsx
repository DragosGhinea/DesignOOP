import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/context/theme-provider";
import { AuthProvider } from "@/context/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import SessionEnsure from "@/modules/users/components/session/session-ensure";
import SessionSWRConfig from "@/modules/users/components/session/session-swr-config";
import FetchWithAuthorizationProvider from "@/modules/users/context/fetch-with-authorization";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DesignOOP",
  description: "Learning design patterns website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <SessionEnsure>
              <SessionSWRConfig>
                <FetchWithAuthorizationProvider>
                  {children}
                </FetchWithAuthorizationProvider>
              </SessionSWRConfig>
            </SessionEnsure>
          </AuthProvider>
        </ThemeProvider>
        <Toaster closeButton richColors />
      </body>
    </html>
  );
}
