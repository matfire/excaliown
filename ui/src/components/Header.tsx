import { Link } from "@tanstack/react-router";
import { ModeToggle } from "./mode-toggle";

export function Header() {

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <h1 className="text-2xl font-bold">Excaliown</h1>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-primary">Home</a></li>
              <li><a href="#" className="hover:text-primary">About</a></li>
            </ul>
          </nav>
        </div>
        <ModeToggle />
      </div>
    </header>
  )
}
