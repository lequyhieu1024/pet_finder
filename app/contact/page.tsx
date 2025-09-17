import Header from '@/components/Header';
import Head from 'next/head';
import {Metadata} from "next";
import ContactForm from "@/app/contact/form";
import Footer from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Liên hệ | PetFinder',
        description: 'Tìm hiểu về Tìm Thú Cưng - nền tảng kết nối cộng đồng yêu động vật tại Việt Nam, giúp tìm kiếm thú cưng thất lạc và tìm chủ nhân mới cho thú cưng.',
        openGraph: {
            title: 'Liên hệ | PetFinder',
            description: 'Tìm hiểu về Tìm Thú Cưng - nền tảng kết nối cộng đồng yêu động vật tại Việt Nam, giúp tìm kiếm thú cưng thất lạc và tìm chủ nhân mới cho thú cưng.',
            url: `https://lequyhieu.id.vn/about`,
            images: [
                {
                    url: "/assets/logo/logo_petfinder.png",
                    width: 1200,
                    height: 630,
                },
            ],
        },
    };
}


export default function Contact() {

    return (
        <>
            <Head>
                <title>Liên hệ | PetFinder</title>
                <meta
                    name="description"
                    content="Liên hệ với chúng tôi để được hỗ trợ tìm kiếm thú cưng thất lạc hoặc đăng bài tìm chủ nhân cho thú cưng. Kết nối cộng đồng yêu thương động vật tại Việt Nam."
                />
                <meta
                    name="keywords"
                    content="tìm thú cưng, thú cưng thất lạc, tìm chủ nhân cho thú cưng, liên hệ tìm thú cưng, cộng đồng yêu động vật, thú cưng, mất tích, tìm kiếm, chó mèo, cộng đồng, tìm mèo, tìm chó, tìm pet bị mất, tìm mèo đi lạc, đi lạc"
                />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Tìm Thú Cưng Team" />
                <script type="application/ld+json">
                    {`
                        {
                          "@context": "https://schema.org",
                          "@type": "ContactPage",
                          "name": "Liên Hệ - Tìm Thú Cưng Thất Lạc",
                          "description": "Trang liên hệ để hỗ trợ tìm kiếm thú cưng thất lạc và kết nối cộng đồng yêu động vật.",
                          "url": "https://yourwebsite.com/contact",
                          "publisher": {
                            "@type": "Organization",
                            "name": "Tìm Thú Cưng",
                            "logo": {
                              "@type": "ImageObject",
                              "url": "https://yourwebsite.com/logo.png"
                            }
                          }
                        }
                      `}
                </script>
            </Head>

            <Header />

            <main className="max-w-4xl mx-auto px-4 py-6">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Liên Hệ Với Chúng Tôi
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Bạn cần hỗ trợ tìm thú cưng thất lạc hoặc muốn đăng bài tìm chủ nhân cho thú cưng? Hãy liên hệ với chúng tôi để kết nối với cộng đồng yêu thương động vật!
                    </p>
                </div>

                <ContactForm/>

                <section className="mt-12 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Thông Tin Liên Hệ
                    </h2>
                    <p className="text-gray-600 mb-2">
                        Email: <a href="mailto:support@timthucung.com"
                                  className="text-orange-500 hover:underline">lequyhieu1024@gmail.com</a>
                    </p>
                    <p className="text-gray-600 mb-2">
                        Hotline: <a href="tel:+84338475943" className="text-orange-500 hover:underline">+84 338 475
                        943</a>
                    </p>
                    <p className="text-gray-600">
                        Địa chỉ: Cầu Giấy, Hà Nội
                    </p>
                    <br/>
                    <p className="text-gray-600 mb-2">
                        hoặc liên hệ quản trị viên hệ thống <a href="https://lequyhieu.id.vn" target={'_blank'}
                                          className="text-orange-500 hover:underline">tại đây</a>
                    </p>
                </section>
            </main>
            <Footer/>
        </>
    );
}