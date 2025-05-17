import { Inter } from "next/font/google";
import "./globals.css";
import NavigationWrapper from "./components/NavigationWrapper";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CodeHive",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavigationWrapper>{children}</NavigationWrapper>
        </Providers>
      </body>
    </html>
  );
}
