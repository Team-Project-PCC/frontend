import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
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
        <Footer/>
      </body>
    </html>
  );
}
