import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PaperAI: The Open Source Collaborative AI Research Platform",
  description: "We built an innovative web application that transforms academic research experience, allowing users to collaborate on research papers without geographical barriers and efficiently. Researchers and scholars often face challenges like information overload and time-consuming literature review. Aside from making personal notes, Paper Ai enables users to annotate, discuss collaboratively and ask AI for quick summary on complex points across a piece of article or research paper. It fosters a shared learning ecosystem and encourages collaboration across disciplines and geographic boundaries. Our goal is to be the go-to platform for academic collaboration and research enhancement. We want to help all learners navigate research and complex articles in a way that is both enjoyable and fulfilling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
