"use client";

import {useEffect, useState} from 'react';
import Header from '@/components/Header';
import PetFeed from '@/components/PetFeed';
import CreatePostModal from '@/components/CreatePostModal';
import PaymentModal from '@/components/PaymentModal';
import { Button } from '@/components/ui/button';
import {Edit, Plus} from 'lucide-react';
import Footer from "@/components/Footer";

export default function Home() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingPost, setPendingPost] = useState<any>(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCreatePost = (postData: any) => {
    setPendingPost(postData);
    setShowCreateModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setPendingPost(null);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tìm Kiếm Thú Cưng Thất Lạc
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kết nối cộng đồng yêu thương động vật. Đăng bài tìm kiếm hoặc giúp đỡ những chú thú cưng tìm về nhà.
          </p>
        </div>

        <PetFeed />

        <div className="fixed bottom-20 right-6 z-50 flex items-center">
          <div
              className={`mr-4 transition-opacity duration-500 ${
                  showText ? 'opacity-100' : 'opacity-0'
              } bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg`}
          >
            Đăng bài tìm thú cưng <br/>
            hoặc tìm chủ nhân...
          </div>
          <button
              onClick={() => setShowCreateModal(true)}
              className="w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg flex items-center justify-center animate-shake"
          >
            <Edit className="w-6 h-6 text-white"/>
          </button>
        </div>
      </main>

      <CreatePostModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreatePost}
      />

      <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
          postData={pendingPost}
      />
      <Footer/>
    </div>
  );
}