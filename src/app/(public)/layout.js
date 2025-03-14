import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TawkToChat from "@/components/TawkToChat";
import "./globals.css";

export const metadata = {
  title: "Museum GitaRupa",
  description: "Cari sejarah tentang seni gita dan rupa disini",
};

export default function RootLayout({children}) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body className="pt-24">
        <Navbar/>
        {children}
        <TawkToChat />
        <Footer/>
      </body>
    </html>
  );
}
