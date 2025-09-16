import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-700 text-gray-300 py-6 mt-10">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm">
                    © 2025 <Link target={'_blank'} href={'https://lequyhieu.id.vn'} className="font-semibold text-white">HieuLQ</Link>. All rights reserved.
                </p>

                <div className="flex space-x-5 mt-3 md:mt-0">
                    <Link className="hover:text-pink-400 transition" href={'/about'}>Về chúng tôi</Link>
                    <Link className="hover:text-pink-400 transition" href={'/contact'}>Liên hệ</Link>
                </div>
            </div>
        </footer>
    );
}
