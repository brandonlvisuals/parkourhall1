'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { label: 'Hem', href: '/' },
  { label: 'Schema', href: '/schema' },
  { label: 'Länkar', href: '/lankar' },
  { label: 'Info', href: '/info' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#3d5568] border-b border-[#1f1f1f]">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Parkourhall1"
            height={36}
            width={114}
            className="object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-semibold tracking-wide transition-colors ${
                    isActive
                      ? 'text-[#C7B39A]'
                      : 'text-gray-300 hover:text-[#C7B39A]'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Öppna meny"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#1f1f1f] bg-[#3d5568]">
          <ul className="flex flex-col px-4 py-3 gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block text-sm font-semibold tracking-wide py-1 transition-colors ${
                      isActive
                        ? 'text-[#C7B39A]'
                        : 'text-gray-300 hover:text-[#C7B39A]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </nav>
  )
}
