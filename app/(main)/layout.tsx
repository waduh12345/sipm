import { Montserrat } from "next/font/google";
import "../globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Our Expertise - JONB Law Firm",
  description: "JONB Law Firm Expertise Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}