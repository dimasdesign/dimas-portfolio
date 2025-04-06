export default function Header() {
    return (
      <header className="w-full border-b border-gray-500 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-300">My Portfolio</h1>
          <nav className="text-sm text-gray-400">
            <a href="#about" className="hover:text-black transition">About</a>
          </nav>
        </div>
      </header>
    )
  }
