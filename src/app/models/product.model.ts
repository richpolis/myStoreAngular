export interface Category {
  id: number;
  name: string;
  typeImg?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
}

export interface CreateProduct extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}
