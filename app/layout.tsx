import { type Metadata } from "next";
import { Comfortaa } from "next/font/google";

import "../app/App.css";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-comfortaa",
});

export const metadata: Metadata = {
  title: "React App",
  description: "Web site created with Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={comfortaa.variable}>
      <body>
        <h1>Newsflash</h1>
        {children}
      </body>
    </html>
  );
}
