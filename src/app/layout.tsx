import './globals.css';
import Link from 'next/link';
export const metadata = {
  title: "React Mini Tools"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        
      {children}
      </body>
    </html>
  );
}