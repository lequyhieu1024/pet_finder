import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PetFinder - Tìm Kiếm Thú Cưng Thất Lạc',
  description: 'Nền tảng kết nối cộng đồng giúp tìm kiếm thú cưng bị mất. Đăng bài miễn phí và nhận được sự hỗ trợ từ mọi người.',
  keywords: 'thú cưng, mất tích, tìm kiếm, chó mèo, cộng đồng, tìm mèo, tìm chó, tìm pet bị mất, tìm mèo đi lạc, đi lạc',
  openGraph: {
    title: 'PetFinder - Tìm Kiếm Thú Cưng Thất Lạc',
    description: 'Kết nối cộng đồng yêu thương động vật, giúp các bé thú cưng tìm về nhà',
    type: 'website',
  },
  icons: {
    icon: '/assets/logo/android-chrome-512x512.png',
    shortcut: '/assets/logo/android-chrome-512x512.png',
    apple: '/assets/logo/apple-touch-icon.png'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50 pb-20">
          {children}
        </div>
      </body>
    </html>
  );
}