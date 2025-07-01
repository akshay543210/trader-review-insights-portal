
export interface PropFirm {
  id: string;
  name: string;
  cost: number;
  payout: number;
  platform: string | null;
  category: 'explore' | 'cheap' | 'top';
  created_at: string;
  user_id: string;
}

export interface Profile {
  id: string;
  email: string | null;
  role: string;
  created_at: string | null;
  updated_at: string | null;
}
