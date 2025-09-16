"use client";

import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={'/'}>
            <Image
                src="/assets/logo/logo_petfinder.png"
                alt="Tìm Thú Cưng - Nền tảng tìm kiếm thú cưng thất lạc và nhận nuôi"
                width={100}
                height={100}
                className="w-16 h-16 md:w-18 md:h-18 object-contain"
                priority
            />
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Tìm kiếm thú cưng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>

          <nav className="hidden md:flex space-x-4">
            <Link href={'/'}>
              <Button variant="ghost" className={`text-gray-700 hover:text-orange-500 ${pathname == '/' && 'text-orange-500' }`}>
                Trang chủ
              </Button>
            </Link>
            <Link href={'/about'}>
              <Button variant="ghost" className={`text-gray-700 hover:text-orange-500 ${pathname == '/about' && 'text-orange-500' }`}>
                Về chúng tôi
              </Button>
            </Link>
            <Link href={'/contact'}>
              <Button variant="ghost" className={`text-gray-700 hover:text-orange-500 ${pathname == '/contact' && 'text-orange-500' }`}>
                Liên hệ
              </Button>
            </Link>
          </nav>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm thú cưng..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>
            <nav className="space-y-2">
              <Link href={'/'}>
                <Button variant="ghost" className="w-full justify-start text-gray-700">
                  Trang chủ
                </Button>
              </Link>
              <Link href={'/about'}>
                <Button variant="ghost" className="w-full justify-start text-gray-700">
                  Về chúng tôi
                </Button>
              </Link>
              <Link href={'/contact'}>
                <Button variant="ghost" className="w-full justify-start text-gray-700">
                  Liên hệ
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}