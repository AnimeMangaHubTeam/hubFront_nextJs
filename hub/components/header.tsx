"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header({ isAdmin = false, isTranslator = false, isLoggedIn = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathName = usePathname();

  return (
    <header
      className={`bg-black bg-opacity-75 text-white w-full z-50 transition-all duration-300 fixed top-0 left-0 right-0
        ${pathName === "/auth" ? "hidden" : ""}
        
        `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Site Name */}
          <Link href="/" className="text-2xl font-bold italic tracking-wider">
            Tomodachi
          </Link>
          {/* Navigation for larger screens */}
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link href="/manga/one-piece" className="hover:text-gray-300">
              Catalog
            </Link>
            <Link href="/profile" className="hover:text-gray-300">
              News
            </Link>
            <Link href="/collections" className="hover:text-gray-300">
              Collections
            </Link>
            <button onClick={() => console.log(pathName)}> test</button>
          </nav>
          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-white bg-opacity-20 border-none text-white placeholder-gray-300"
            />
            <Button size="icon" variant="ghost" className="ml-2">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
          {/* Auth Buttons for larger screens */}
          <div className="hidden md:flex space-x-2">
            {!isLoggedIn && (
              <>
                <Button variant="ghost" className="w-full">
                  <Link
                    href={{
                      pathname: "/auth",
                      query: { page: "signIn" },
                    }}
                  >
                    Log In
                  </Link>
                </Button>
                <Button className="w-full">
                  <Link
                    href={{
                      pathname: "/auth",
                      query: { page: "signUp" },
                    }}
                  >
                    Get Started
                  </Link>
                </Button>
              </>
            )}

            {isAdmin && (
              <Button variant="outline" size="sm" className="ml-2">
                Admin
              </Button>
            )}
          </div>
            
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2">
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
              <Link href="/manga/one-piece" className="hover:text-gray-300">
                Catalog
              </Link>
              <Link href="/profile" className="hover:text-gray-300">
                News
              </Link>
              <Link href="/collections" className="hover:text-gray-300">
                Collections
              </Link>
            </nav>
            <div className="flex items-center mt-2">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-white bg-opacity-20 border-none text-white placeholder-gray-300"
              />
              <Button size="icon" variant="ghost" className="ml-2">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
            {!isLoggedIn && (
              <div className="flex space-x-2 mt-2">
                <Button variant="ghost" className="w-full">
                  <Link
                    href={{
                      pathname: "/auth",
                      query: { page: "signIn" },
                    }}
                  >
                    Log In
                  </Link>
                </Button>
                <Button className="w-full">
                  <Link
                    href={{
                      pathname: "/auth",
                      query: { page: "signUp" },
                    }}
                  >
                    Get Started
                  </Link>
                </Button>
              </div>
            )}
            {isAdmin && (
              <Button variant="outline" size="sm" className="mt-2 w-full">
                Admin
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
