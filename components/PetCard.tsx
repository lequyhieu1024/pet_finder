"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MapPin, 
  Phone, 
  Clock, 
  DollarSign,
  Heart,
  Share2,
  MessageCircle
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

interface PetPost {
  id: string;
  type: 'lost' | 'found';
  petType: string;
  petName?: string;
  breed?: string;
  description: string;
  location: string;
  contactPhone: string;
  contactName: string;
  images: string[];
  reward?: string;
  postedAt: string;
  status: string;
}

interface PetCardProps {
  post: PetPost;
}

export default function PetCard({ post }: PetCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: vi
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${post.type === 'lost' ? 'Tìm thú cưng' : 'Đã tìm thấy'} ${post.petName || 'thú cưng'}`,
        text: post.description,
        url: window.location.href
      });
    }
  };

  const handleContact = () => {
    window.open(`tel:${post.contactPhone}`, '_self');
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-orange-100 text-orange-600">
                  {post.contactName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-gray-900">{post.contactName}</h3>
                <div className="flex items-center text-sm text-gray-500 space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(post.postedAt)}</span>
                </div>
              </div>
            </div>
            <Badge 
              variant={post.type === 'lost' ? 'destructive' : 'default'}
              className={post.type === 'lost' ? 'bg-red-100 text-red-800 hover:bg-red-200' : 'bg-green-100 text-green-800 hover:bg-green-200'}
            >
              {post.type === 'lost' ? 'Tìm thú cưng' : 'Tìm lại chủ'}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {post.petName && `${post.petName} - `}{post.breed || post.petType}
            </h2>
            <p className="text-gray-700 leading-relaxed">{post.description}</p>
          </div>

          {/* Image */}
          {post.images && post.images.length > 0 && (
            <div className="mb-4 relative">
              <img
                src={post.images[currentImageIndex]}
                alt={post.petName || 'Pet'}
                className="w-full h-64 object-cover rounded-lg"
              />
              {post.images.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                  {currentImageIndex + 1}/{post.images.length}
                </div>
              )}
            </div>
          )}

          {/* Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
              <span>{post.location}</span>
            </div>
            
            {post.reward && (
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                <span className="font-medium text-green-600">Phần thưởng: {post.reward}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="px-4 pb-4 border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={`${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
              >
                <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                Thích
              </Button>
              
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                <MessageCircle className="w-4 h-4 mr-1" />
                Bình luận
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleShare}
                className="text-gray-500 hover:text-green-500"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Chia sẻ
              </Button>
            </div>

            <Button 
              onClick={handleContact}
              className="bg-orange-500 hover:bg-orange-600 text-white"
              size="sm"
            >
              <Phone className="w-4 h-4 mr-1" />
              Liên hệ
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}