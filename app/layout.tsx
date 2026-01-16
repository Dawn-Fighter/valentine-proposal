import type { Metadata } from "next";
import { Playfair_Display, Pacifico } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  display: "swap",
});

const pacifico = Pacifico({ 
  weight: "400", 
  subsets: ["latin"], 
  variable: "--font-pacifico",
  display: "swap",
});

export const metadata: Metadata = {
  title: "A Question for Little Bunny",
  description: "I have something important to ask you...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        playfair.variable, 
        pacifico.variable,
        "font-playfair antialiased overflow-hidden bg-cream-ivory text-charcoal"
      )}>
        {children}
      </body>
    </html>
  );
}
