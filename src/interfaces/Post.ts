export interface Post {
  id?: string;
  title: string;
  description: string;
  image_url: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
}