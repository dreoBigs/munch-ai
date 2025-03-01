export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  difficulty: Difficulty;
  imageUrl: string;
  tags: string[];
  tips?: string[];
}