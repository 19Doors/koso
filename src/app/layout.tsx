import "./globals.css";
import { Providers } from "./themeprovider";

export const metadata: Metadata = {
  title: "Koso",
  description: "Generate AI Workflows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
