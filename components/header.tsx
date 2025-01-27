"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import axios from "@/lib/axios";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();
  const { auth, setAuth } = useAuth();
  
  // Check if user is authenticated

  // Access user data
  const { id, userName, email, roles } = auth.user? auth.user : { id: 0, userName: "", email: "", roles: [] };
  const isLoggedIn = auth.isAuthenticated ? true : false;


  const handleLogout = async () => {
    const data = {
      "accessToken": "string",
      "refreshToken": "string"
    }
    try {
      await axios.post('/api/app/auth/logout', null, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      
      setAuth({
        isAuthenticated: false,
        user: null
      });
      
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  return (
    <div
      className={`bg-black ${
        isMenuOpen ? "bg-opacity-100" : "bg-opacity-75"
      }  text-white w-full z-50 transition-all duration-300 fixed top-0 left-0 right-0
        ${
          pathName === "/auth" || pathName.includes("mangaReadingPage")
            ? "hidden"
            : ""
        }
        `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Site Name */}
          <Link
            href="/"
            className="text-2xl font-bold italic tracking-wider text-red-600"
          >
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
            {!isLoggedIn ? (
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
                    Sign Up
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Link href="/profile" className="hover:text-gray-300">
                  Profile
                </Link>
                <Button onClick={handleLogout} variant="ghost">
                  Logout
                </Button>
              </>
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
      </div>
    </div>
  );
}