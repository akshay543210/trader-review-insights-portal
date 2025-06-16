
export interface PropFirm {
  id: number;
  name: string;
  category: 'beginner' | 'intermediate' | 'pro';
  price: number;
  originalPrice: number;
  couponCode: string;
  reviewScore: number;
  trustRating: number;
  description: string;
  features: string[];
  image: string;
}
