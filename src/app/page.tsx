import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";

export default function Home() {
  return (
    <main className="min-h-screen bg-lightBg dark:bg-darkBg font-(family-name:--font-monsterrat)">
      <Header />

      <h1 className="text-3xl text-[#5603AD] font-(family-name:--font-gothic) font-bold text-center py-8">Dimas Ferreira</h1>
      <p className="text-[#ff002b] px-4">human designer</p>
      <ImageGallery />

      <Footer />
    </main>
  )
}
