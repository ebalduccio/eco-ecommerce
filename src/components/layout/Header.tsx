'use client'

import { useState, useEffect } from 'react'
import { 
  Menu, 
  X, 
  Search, 
  Leaf, 
  ShoppingBag, 
  Heart,
  Bell,
  ChevronDown
} from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CartDropdown from '../user/CartDropdown'
import UserDropdown from '../user/UserDropdown'

interface HeaderProps {
  searchTerm: string
  onSearchChange: (term: string) => void
}

const CATEGORIES = [
  { label: "Eco Home", href: "#" },
  { label: "Sustainable Fashion", href: "#" },
  { label: "Zero Waste", href: "#" },
  { label: "Beauty & Care", href: "#" },
  { label: "Eco Gadgets", href: "#" },
]

const NAVIGATION_LINKS = [
  { href: "#", label: "New Arrivals", badge: "New" },
  { href: "#", label: "Best Sellers" },
  { href: "#", label: "Eco Blog" },
  { href: "#", label: "About Us" },
]

export default function Header({ searchTerm, onSearchChange }: HeaderProps): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-green-600 text-white py-2 px-4 text-center text-sm">
        <p>Free shipping on orders over $50 🌱 Use code: ECOSAVE</p>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-white'
      }`}>
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                EcoShop
              </h1>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center max-w-md w-full">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search eco-friendly products..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-full border-gray-200 focus:border-green-500 focus:ring-green-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Icons - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <CartDropdown />
              <UserDropdown />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-4 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:block py-4">
            <div className="flex items-center justify-between">
              {/* Categories Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Menu className="h-5 w-5" />
                    <span>Categories</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {CATEGORIES.map(({ label, href }) => (
                    <DropdownMenuItem key={label}>
                      <a href={href} className="w-full">{label}</a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Main Navigation */}
              <ul className="flex items-center space-x-8">
                {NAVIGATION_LINKS.map(({ href, label, badge }) => (
                  <li key={label}>
                    <a 
                      href={href} 
                      className="text-gray-600 hover:text-green-600 transition-colors relative group"
                    >
                      {label}
                      {badge && (
                        <span className="absolute -top-3 -right-8 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                          {badge}
                        </span>
                      )}
                      <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>

              {/* Special Offers */}
              <Button variant="ghost" className="text-green-600 font-medium">
                Special Offers
              </Button>
            </div>
          </nav>

          {/* Mobile Search Bar */}
          {isMobileSearchOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          <div className={`
            md:hidden 
            fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300
            ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          `}>
            <div className={`
              fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300
              ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
              <div className="p-4 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-green-600">Menu</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">Categories</h3>
                    <ul className="space-y-2">
                      {CATEGORIES.map(({ label, href }) => (
                        <li key={label}>
                          <a href={href} className="block text-gray-600 hover:text-green-600 py-2">
                            {label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">Navigation</h3>
                    <ul className="space-y-2">
                      {NAVIGATION_LINKS.map(({ label, href }) => (
                        <li key={label}>
                          <a href={href} className="block text-gray-600 hover:text-green-600 py-2">
                            {label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <Button className="w-full" variant="default">
                    Sign In
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}