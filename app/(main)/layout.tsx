// app/layout.tsx
import { LanguageProvider } from "@/contexts/LanguageContext";

import { Montserrat } from "next/font/google";
import "../globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Jon Bernard & Associates Law Firm",
  description: "Jon Bernard & Associates Law Firm Expertise Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body  className={montserrat.className} suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}