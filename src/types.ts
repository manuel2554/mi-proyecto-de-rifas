export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'burger' | 'dessert' | 'yogurt';
  ingredients: string[];
  weight?: number;
  calories?: number;
  rating: number;
  image: string;
  isFeatured?: boolean;
  nutritionalInfo?: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface BurgerIngredient {
  id: string;
  name: string;
  type: 'bread' | 'protein' | 'cheese' | 'topping' | 'sauce';
  price: number;
  image: string;
  description: string;
}

export interface CustomBurger {
  bread: BurgerIngredient | null;
  protein: BurgerIngredient | null;
  cheese: BurgerIngredient | null;
  toppings: BurgerIngredient[];
  sauces: BurgerIngredient[];
}

export interface SectionProps {
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}