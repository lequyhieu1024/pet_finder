"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Upload, X } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (postData: any) => void;
}

export default function CreatePostModal({ isOpen, onClose, onSubmit }: CreatePostModalProps) {
  const [formData, setFormData] = useState({
    type: 'lost',
    petType: '',
    petName: '',
    breed: '',
    description: '',
    location: '',
    contactPhone: '',
    contactName: '',
    reward: '',
    images: [] as string[]
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + imageFiles.length > 5) {
      alert('Chỉ được tải lên tối đa 5 hình ảnh');
      return;
    }

    // In real app, you'd upload to a server and get URLs
    // For demo, we'll use local URLs
    const newImageUrls = files.map(file => URL.createObjectURL(file));
    
    setImageFiles(prev => [...prev, ...files]);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImageUrls]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.petType || !formData.description || !formData.location || !formData.contactPhone || !formData.contactName) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    onSubmit({
      ...formData,
      id: Date.now().toString(),
      postedAt: new Date().toISOString(),
      status: 'pending'
    });

    // Reset form
    setFormData({
      type: 'lost',
      petType: '',
      petName: '',
      breed: '',
      description: '',
      location: '',
      contactPhone: '',
      contactName: '',
      reward: '',
      images: []
    });
    setImageFiles([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95%] max-w-sm md:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Đăng bài tìm thú cưng
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Post Type */}
          <div>
            <Label className="text-base font-medium">Loại bài đăng *</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value) => handleInputChange('type', value)}
              className="flex space-x-6 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lost" id="lost" />
                <Label htmlFor="lost" className="text-red-600 font-medium">Tìm kiếm thú cưng bị mất</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="found" id="found" />
                <Label htmlFor="found" className="text-green-600 font-medium">Tìm kiếm chủ của thú cưng</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Pet Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="petType">Loại thú cưng *</Label>
              <Select value={formData.petType} onValueChange={(value) => handleInputChange('petType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại thú cưng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">Chó</SelectItem>
                  <SelectItem value="cat">Mèo</SelectItem>
                  <SelectItem value="bird">Chim</SelectItem>
                  <SelectItem value="rabbit">Thỏ</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="petName">Tên thú cưng</Label>
              <Input
                id="petName"
                value={formData.petName}
                onChange={(e) => handleInputChange('petName', e.target.value)}
                placeholder="Tên của thú cưng (nếu có)"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="breed">Giống loài</Label>
            <Input
              id="breed"
              value={formData.breed}
              onChange={(e) => handleInputChange('breed', e.target.value)}
              placeholder="VD: Golden Retriever, Mèo ta, ..."
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Mô tả chi tiết *</Label>
            <Textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Mô tả chi tiết về thú cưng: màu sắc, kích thước, đặc điểm nhận dạng, hoàn cảnh mất tích..."
              className="resize-none"
            />
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">Địa điểm *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="VD: Quận 1, TP.HCM hoặc địa chỉ cụ thể"
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactName">Tên người liên hệ *</Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => handleInputChange('contactName', e.target.value)}
                placeholder="Tên của bạn"
              />
            </div>

            <div>
              <Label htmlFor="contactPhone">Số điện thoại *</Label>
              <Input
                id="contactPhone"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                placeholder="Số điện thoại liên hệ"
              />
            </div>
          </div>

          {/* Reward */}
          {formData.type === 'lost' && (
            <div>
              <Label htmlFor="reward">Phần thưởng</Label>
              <Input
                id="reward"
                value={formData.reward}
                onChange={(e) => handleInputChange('reward', e.target.value)}
                placeholder="VD: 500,000 VNĐ (tùy chọn)"
              />
            </div>
          )}

          {/* Image Upload */}
          <div>
            <Label>Hình ảnh thú cưng</Label>
            <div className="mt-2">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Nhấn để tải lên</span> hoặc kéo thả
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG (Tối đa 5 ảnh)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>

            {/* Image Preview */}
            {formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              Thanh toán 5,000 VNĐ & Đăng bài
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}