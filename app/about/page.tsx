import Header from '@/components/Header';
import Head from 'next/head';
import {Metadata} from "next";
import Footer from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Về chúng tôi | PetFinder',
        description: 'Tìm hiểu về Tìm Thú Cưng - nền tảng kết nối cộng đồng yêu động vật tại Việt Nam, giúp tìm kiếm thú cưng thất lạc và tìm chủ nhân mới cho thú cưng.',
        openGraph: {
            title: 'Về chúng tôi | PetFinder',
            description: 'Tìm hiểu về Tìm Thú Cưng - nền tảng kết nối cộng đồng yêu động vật tại Việt Nam, giúp tìm kiếm thú cưng thất lạc và tìm chủ nhân mới cho thú cưng.',
            url: `https://yourwebsite.com/about`,
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

export default function About() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Về Chúng Tôi - Tìm Thú Cưng Thất Lạc</title>
                <meta
                    name="description"
                    content="Tìm hiểu về Tìm Thú Cưng - nền tảng kết nối cộng đồng yêu động vật tại Việt Nam, giúp tìm kiếm thú cưng thất lạc và tìm chủ nhân mới cho thú cưng."
                />
                <meta
                    name="keywords"
                    content="về chúng tôi, tìm thú cưng, thú cưng thất lạc, cộng đồng yêu động vật, tìm chủ nhân cho thú cưng, Tìm Thú Cưng Việt Nam, thú cưng, mất tích, tìm kiếm, chó mèo, cộng đồng, tìm mèo, tìm chó, tìm pet bị mất, tìm mèo đi lạc, đi lạc"
                />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Tìm Thú Cưng Team" />
                <script type="application/ld+json">
                    {`
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": "Về Chúng Tôi - Tìm Thú Cưng Thất Lạc",
              "description": "Tìm Thú Cưng là nền tảng giúp kết nối cộng đồng yêu động vật, hỗ trợ tìm kiếm thú cưng thất lạc và tìm nhà mới cho thú cưng tại Việt Nam.",
              "url": "https://yourwebsite.com/about",
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
                        Về Tìm Thú Cưng
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Chúng tôi là nền tảng kết nối cộng đồng yêu động vật tại Việt Nam, mang sứ mệnh giúp thú cưng thất lạc trở về với chủ nhân và tìm nhà mới cho những chú thú cưng cần yêu thương.
                    </p>
                </div>

                <section className="bg-white p-8 rounded-lg shadow-md mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Sứ Mệnh Của Chúng Tôi
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Tại Tìm Thú Cưng, chúng tôi tin rằng mỗi chú chó, mèo hay bất kỳ thú cưng nào đều xứng đáng có một mái ấm yêu thương. Sứ mệnh của chúng tôi là xây dựng một cộng đồng gắn kết, nơi mọi người có thể dễ dàng đăng bài tìm kiếm thú cưng thất lạc hoặc tìm chủ nhân mới cho những chú thú cưng cần được chăm sóc.
                    </p>
                    <p className="text-gray-600">
                        Với nền tảng dễ sử dụng và thân thiện, chúng tôi hỗ trợ hàng ngàn người dùng tại Việt Nam tìm lại người bạn lông xù của mình hoặc mang đến cơ hội cho những chú thú cưng bị bỏ rơi tìm được ngôi nhà mới.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                        Tại Sao Chọn Tìm Thú Cưng?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-medium text-gray-800 mb-2">
                                Cộng Đồng Yêu Động Vật
                            </h3>
                            <p className="text-gray-600">
                                Kết nối với hàng ngàn người yêu thú cưng trên khắp Việt Nam, cùng nhau chia sẻ và hỗ trợ.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-medium text-gray-800 mb-2">
                                Dễ Dàng Đăng Bài
                            </h3>
                            <p className="text-gray-600">
                                Đăng bài tìm thú cưng thất lạc hoặc tìm chủ nhân mới chỉ với vài thao tác đơn giản.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-medium text-gray-800 mb-2">
                                Hỗ Trợ Nhanh Chóng
                            </h3>
                            <p className="text-gray-600">
                                Đội ngũ hỗ trợ luôn sẵn sàng giúp bạn trong hành trình tìm kiếm hoặc nhận nuôi thú cưng.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Hãy Tham Gia Cùng Chúng Tôi!
                    </h2>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Dù bạn là người đang tìm kiếm chú thú cưng thất lạc hay muốn giúp một chú cún, chú mèo tìm được mái ấm mới, Tìm Thú Cưng luôn đồng hành cùng bạn. Hãy cùng chúng tôi lan tỏa yêu thương đến cộng đồng yêu động vật!
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 transition-colors"
                    >
                        Liên Hệ Ngay
                    </a>
                </section>
            </main>
            <Footer/>
        </div>
    );
}