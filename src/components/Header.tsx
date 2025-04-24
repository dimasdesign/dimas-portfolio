import { ModeToggle } from "./ThemeToggle";

export default function Header() {
    return (
      <header className="w-full border-b-2 border-[#FBF5E0] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-[#FBF5E0]">My Portfolio</h1>
            <nav className="text-sm text-[#FBF5E0] flex items-center space-x-4">
              <ModeToggle />
              <a href="#about" className="hover:text-[#5603AD] transition">About</a>
            </nav>
        </div>
      </header>
    )
  }
