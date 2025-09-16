"use client";

import { useState, useEffect } from 'react';
import PetCard from './PetCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';

const mockPosts = [
  {
    id: '1',
    type: 'lost',
    petType: 'dog',
    petName: 'Lucky',
    breed: 'Golden Retriever',
    description: 'Chó cưng của gia đình tôi bị lạc từ chiều qua tại khu vực Quận 1. Lucky rất thân thiện và đeo vòng cổ màu đỏ.',
    location: 'Quận 1, TP.HCM',
    contactPhone: '0901234567',
    contactName: 'Anh Minh',
    images: ['https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg'],
    reward: '500,000 VNĐ',
    postedAt: '2024-01-15T10:30:00Z',
    status: 'active'
  },
  {
    id: '2',
    type: 'found',
    petType: 'cat',
    breed: 'Mèo ta',
    description: 'Tìm thấy một chú mèo con màu cam tại công viên Tao Đàn. Có vẻ như bị lạc, rất ngoan và thân thiện.',
    location: 'Quận 3, TP.HCM',
    contactPhone: '0987654321',
    contactName: 'Chị Lan',
    images: ['https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg'],
    postedAt: '2024-01-14T15:45:00Z',
    status: 'active'
  },
  {
    id: '3',
    type: 'lost',
    petType: 'dog',
    petName: 'Milu',
    breed: 'Poodle',
    description: 'Milu là chú chó Poodle màu trắng, rất nhỏ và dễ thương. Bị lạc khi đang dạo chơi tại Landmark 81.',
    location: 'Quận Bình Thạnh, TP.HCM',
    contactPhone: '0912345678',
    contactName: 'Chị Hương',
    images: ['https://images.pexels.com/photos/1390361/pexels-photo-1390361.jpeg'],
    reward: '1,000,000 VNĐ',
    postedAt: '2024-01-13T09:15:00Z',
    status: 'active'
  }
];

export default function PetFeed() {
  const [posts, setPosts] = useState(mockPosts);
  const [filteredPosts, setFilteredPosts] = useState<any>(mockPosts);
  const [filterType, setFilterType] = useState('all');
  const [filterPetType, setFilterPetType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');

  useEffect(() => {
    let filtered = posts;

    if (filterType !== 'all') {
      filtered = filtered.filter(post => post.type === filterType);
    }

    if (filterPetType !== 'all') {
      filtered = filtered.filter(post => post.petType === filterPetType);
    }

    if (filterLocation !== 'all') {
      filtered = filtered.filter(post => post.location.includes(filterLocation));
    }

    setFilteredPosts(filtered);
  }, [posts, filterType, filterPetType, filterLocation]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-medium text-gray-900">Bộ lọc</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loại bài đăng
            </label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="lost">Tìm thú cưng</SelectItem>
                <SelectItem value="found">Tìm lại chủ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loại thú cưng
            </label>
            <Select value={filterPetType} onValueChange={setFilterPetType}>
              <SelectTrigger>
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="dog">Chó</SelectItem>
                <SelectItem value="cat">Mèo</SelectItem>
                <SelectItem value="bird">Chim</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Khu vực
            </label>
            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="Quận 1">Quận 1</SelectItem>
                <SelectItem value="Quận 3">Quận 3</SelectItem>
                <SelectItem value="Quận Bình Thạnh">Quận Bình Thạnh</SelectItem>
                <SelectItem value="Quận 7">Quận 7</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post: any) => (
            <PetCard key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Không tìm thấy bài đăng nào phù hợp với bộ lọc.</p>
          </div>
        )}
      </div>
    </div>
  );
}