import { Noto_Sans } from "next/font/google";
import "@/app/globals.css";

const notoSans = Noto_Sans({
  weight: "400",
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "HSK1 App",
  description: "created by k1dlen",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable}`}>{children}</body>
    </html>
  );
}
