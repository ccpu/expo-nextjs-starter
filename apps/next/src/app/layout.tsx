import "./global.css";

import { ThemeProvider, ThemeToggle } from "@acme/ui";

export const metadata = {
  title: "Create Expo & nextjs App",
  description:
    "Create Expo & nextjs App with TypeScript, Tailwind CSS, and more",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className="bg-background text-foreground">
        <ThemeProvider>
          {children} <ThemeToggle className="fixed bottom-4 right-4" />
        </ThemeProvider>
      </body>
    </html>
  );
}
