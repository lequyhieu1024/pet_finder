// Mock API functions for development
// Replace with real API calls when backend is ready

export interface PetPost {
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
  status: 'active' | 'resolved' | 'expired';
}

// Mock data storage (in real app, this would be a database)
let mockPosts: PetPost[] = [
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

// Mock API functions
export const mockApi = {
  // Get all posts with optional filters
  getPosts: async (filters?: {
    type?: string;
    petType?: string;
    location?: string;
    status?: string;
  }): Promise<PetPost[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredPosts = [...mockPosts];
        
        if (filters) {
          if (filters.type && filters.type !== 'all') {
            filteredPosts = filteredPosts.filter(post => post.type === filters.type);
          }
          if (filters.petType && filters.petType !== 'all') {
            filteredPosts = filteredPosts.filter(post => post.petType === filters.petType);
          }
          if (filters.location && filters.location !== 'all') {
            filteredPosts = filteredPosts.filter(post => 
              post.location.toLowerCase().includes(filters.location!.toLowerCase())
            );
          }
          if (filters.status && filters.status !== 'all') {
            filteredPosts = filteredPosts.filter(post => post.status === filters.status);
          }
        }
        
        // Sort by most recent first
        filteredPosts.sort((a, b) => 
          new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
        );
        
        resolve(filteredPosts);
      }, 500); // Simulate network delay
    });
  },

  // Get single post by ID
  getPost: async (id: string): Promise<PetPost | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const post = mockPosts.find(p => p.id === id);
        resolve(post || null);
      }, 300);
    });
  },

  // Create new post
  createPost: async (postData: Omit<PetPost, 'id' | 'postedAt' | 'status'>): Promise<PetPost> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPost: PetPost = {
          ...postData,
          id: Date.now().toString(),
          postedAt: new Date().toISOString(),
          status: 'active'
        };
        
        mockPosts.unshift(newPost); // Add to beginning of array
        resolve(newPost);
      }, 1000);
    });
  },

  // Update post status
  updatePostStatus: async (id: string, status: PetPost['status']): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const postIndex = mockPosts.findIndex(p => p.id === id);
        if (postIndex !== -1) {
          mockPosts[postIndex].status = status;
          resolve(true);
        } else {
          resolve(false);
        }
      }, 300);
    });
  },

  // Delete post
  deletePost: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const postIndex = mockPosts.findIndex(p => p.id === id);
        if (postIndex !== -1) {
          mockPosts.splice(postIndex, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 300);
    });
  },

  // Search posts
  searchPosts: async (query: string): Promise<PetPost[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const searchTerm = query.toLowerCase();
        const results = mockPosts.filter(post =>
          post.description.toLowerCase().includes(searchTerm) ||
          post.location.toLowerCase().includes(searchTerm) ||
          (post.petName && post.petName.toLowerCase().includes(searchTerm)) ||
          (post.breed && post.breed.toLowerCase().includes(searchTerm)) ||
          post.contactName.toLowerCase().includes(searchTerm)
        );
        
        resolve(results);
      }, 400);
    });
  },

  // Generate payment link (mock)
  generatePaymentLink: async (postData: any): Promise<{
    url: string;
    expiresAt: string;
    orderId: string;
  }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orderId = `PF_${Date.now()}`;
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes from now
        
        resolve({
          url: `https://sepay.vn/payment/${orderId}?amount=5000&description=Pet-Finder-Post&limit=1`,
          expiresAt,
          orderId
        });
      }, 500);
    });
  },

  // Verify payment (mock)
  verifyPayment: async (orderId: string): Promise<{
    status: 'pending' | 'success' | 'failed' | 'expired';
    amount?: number;
    transactionId?: string;
  }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock successful payment after some time
        const random = Math.random();
        if (random > 0.3) {
          resolve({
            status: 'success',
            amount: 5000,
            transactionId: `TXN_${Date.now()}`
          });
        } else {
          resolve({
            status: 'pending'
          });
        }
      }, 1000);
    });
  }
};

export default mockApi;