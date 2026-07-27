export interface PizzaImage {
  image_id: string;
  object_key: string;
  order: number;
  created_at: string;
}

export interface Menu {
  product_id: string;
  name: string;
  description: string;
  price: number;
  is_available: boolean;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_spicy: boolean;
  created_at: string;
  updated_at: string;
  images: PizzaImage[];
}
