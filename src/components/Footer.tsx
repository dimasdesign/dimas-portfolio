export default function Footer() {
    return (
      <footer className="w-full border-t border-gray-500 px-6 py-4 mt-12">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          © {new Date().getFullYear()} My Portfolio. All rights reserved. Designed by Dimas, developed by <a href="https://github.com/edppf" className="hover:text-black transition"> EdPPF </a>
        </div>
      </footer>
    )
  }
