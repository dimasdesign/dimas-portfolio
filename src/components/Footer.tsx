export default function Footer() {
    return (
      <footer className="w-full border-t-2 border-[#FBF5E0] px-6 py-4 mt-12">
        <div className="max-w-6xl mx-auto text-center text-sm text-[#FBF5E0]">
          © {new Date().getFullYear()} My Portfolio. All rights reserved. Designed by Dimas, developed by <a href="https://github.com/edppf" className="hover:text-[#ff002b] transition"> EdPPF </a>
        </div>
      </footer>
    )
  }
