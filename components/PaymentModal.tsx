"use client";

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, CreditCard, Copy } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  postData: any;
}

export default function PaymentModal({ isOpen, onClose, onSuccess, postData }: PaymentModalProps) {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'expired'>('pending');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [paymentUrl, setPaymentUrl] = useState('');

  // Mock payment URL generation
  useEffect(() => {
    if (isOpen && postData) {
      // In real app, this would call your backend to generate Sepay payment link
      const mockPaymentUrl = `https://sepay.vn/payment/${Date.now()}?amount=5000&description=Pet-Finder-Post&limit=1`;
      setPaymentUrl(mockPaymentUrl);
      setTimeLeft(600);
      setPaymentStatus('pending');
    }
  }, [isOpen, postData]);

  // Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (paymentStatus === 'pending' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setPaymentStatus('expired');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [paymentStatus, timeLeft]);

  // Mock payment verification (in real app, this would be webhook or polling)
  useEffect(() => {
    if (paymentStatus === 'processing') {
      const timer = setTimeout(() => {
        setPaymentStatus('success');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [paymentStatus]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const copyPaymentUrl = () => {
    navigator.clipboard.writeText(paymentUrl);
    // In real app, show toast notification
  };

  const handlePaymentSuccess = () => {
    onSuccess();
    setPaymentStatus('pending');
    setTimeLeft(600);
  };

  const simulatePayment = () => {
    setPaymentStatus('processing');
  };

  if (!postData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Thanh toán đăng bài
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Payment Status */}
          <div className="text-center">
            {paymentStatus === 'pending' && (
              <div className="space-y-2">
                <Clock className="w-12 h-12 text-orange-500 mx-auto" />
                <h3 className="font-semibold text-gray-900">Chờ thanh toán</h3>
                <p className="text-sm text-gray-600">
                  Thời gian còn lại: <span className="font-mono text-orange-600">{formatTime(timeLeft)}</span>
                </p>
              </div>
            )}
            
            {paymentStatus === 'processing' && (
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <h3 className="font-semibold text-gray-900">Đang xử lý thanh toán</h3>
                <p className="text-sm text-gray-600">Vui lòng đợi trong giây lát...</p>
              </div>
            )}
            
            {paymentStatus === 'success' && (
              <div className="space-y-2">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                <h3 className="font-semibold text-green-600">Thanh toán thành công!</h3>
                <p className="text-sm text-gray-600">Bài đăng của bạn đã được đăng tải.</p>
              </div>
            )}
            
            {paymentStatus === 'expired' && (
              <div className="space-y-2">
                <Clock className="w-12 h-12 text-red-500 mx-auto" />
                <h3 className="font-semibold text-red-600">Hết thời gian thanh toán</h3>
                <p className="text-sm text-gray-600">Vui lòng tạo lại bài đăng để nhận link thanh toán mới.</p>
              </div>
            )}
          </div>

          {/* Payment Details */}
          {paymentStatus === 'pending' && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Phí đăng bài:</span>
                <span className="font-semibold text-lg">5,000 VNĐ</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Link thanh toán:</span>
                  <Button variant="ghost" size="sm" onClick={copyPaymentUrl}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-2 bg-white rounded border text-xs font-mono break-all">
                  {paymentUrl}
                </div>
              </div>

              <div className="space-y-2">
                <Badge variant="outline" className="w-full justify-center py-2">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Thanh toán qua Sepay
                </Badge>
                <p className="text-xs text-gray-500 text-center">
                  Link chỉ có hiệu lực trong 10 phút và giới hạn 1 giao dịch
                </p>
              </div>
            </div>
          )}

          {/* Post Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Chi tiết bài đăng:</h4>
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Loại:</span> {postData.type === 'lost' ? 'Tìm pet' : 'Tìm lại chủ'}</p>
              <p><span className="font-medium">Thú cưng:</span> {postData.petName || 'Không tên'} - {postData.breed || postData.petType}</p>
              <p><span className="font-medium">Địa điểm:</span> {postData.location}</p>
              <p><span className="font-medium">Liên hệ:</span> {postData.contactName}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {paymentStatus === 'pending' && (
              <>
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Hủy
                </Button>
                <Button onClick={simulatePayment} className="flex-1 bg-orange-500 hover:bg-orange-600">
                  Mở link thanh toán
                </Button>
              </>
            )}
            
            {paymentStatus === 'processing' && (
              <Button disabled className="w-full">
                Đang xử lý...
              </Button>
            )}
            
            {paymentStatus === 'success' && (
              <Button onClick={handlePaymentSuccess} className="w-full bg-green-500 hover:bg-green-600">
                Hoàn tất
              </Button>
            )}
            
            {paymentStatus === 'expired' && (
              <Button onClick={onClose} className="w-full" variant="outline">
                Đóng
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}