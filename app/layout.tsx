// app/layout.tsx
import "./globals.css";

// import "animate.css"; // If you installed via npm
// OR add this to your <head> if using a CDN:
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
      </head>
      <body className="min-h-screen bg-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}