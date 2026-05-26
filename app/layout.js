import { Inter, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata = {
  title: "Abdu Rahoof MP - Portfolio",
  description: "Full-Stack Developer Portfolio - Next.js, Laravel, Blockchain",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} h-full antialiased`}>
      <body className="min-h-full bg-obsidian text-white font-sans flex flex-col cursor-none overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
