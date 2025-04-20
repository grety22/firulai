import type { Metadata } from "next";
import "./globals.css";
import { BodyStyleProvider } from "./context/BodyStyleContext";
import StyledBody from "./components/StyledBody"; // import client component

export const metadata: Metadata = {
  title: "ADD Title",
  description: "ADD Description",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <BodyStyleProvider>
        <StyledBody>{children}</StyledBody>
      </BodyStyleProvider>
    </html>
  );
}
