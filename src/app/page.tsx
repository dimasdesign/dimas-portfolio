import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#3B1C32]">
      <Header />

      <h1 className="text-3xl text-pink-600 font-(family-name:--font-gothic) font-bold text-center py-8">Dimas P. F. Neto</h1>
      <p className="text-cyan-500 px-4">Building dreams and all that</p>
      <ImageGallery />

      <Footer />
    </main>
  )
}
