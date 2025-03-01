import { useParams } from "react-router-dom";
import { RecipeDetail } from "../components/RecipeDetail";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Recipe } from "@/types/recipe";

const RecipePage = () => {
  const { id } = useParams();

  const { data: recipe, isLoading } = useQuery({
    queryKey: ['recipe', id],
    queryFn: async () => {
      const { data: recipeData, error: recipeError } = await supabase
        .from('recipies')
        .select(`
          *,
          ingredients:ingredients(name, quantity),
          instructions:instructions(instruction, step_number, tip)
        `)
        .eq('id', id)
        .single();

      if (recipeError) throw recipeError;
      if (!recipeData) return null;

      // Transform the data to match our Recipe type
      return {
        id: recipeData.id,
        name: recipeData.name || '',
        description: recipeData.description || '',
        ingredients: recipeData.ingredients.map((ing: any) => ({
          name: ing.name || '',
          quantity: ing.quantity || '',
          unit: '' // Note: unit is not in the database yet
        })),
        instructions: recipeData.instructions
          .sort((a: any, b: any) => (a.step_number || 0) - (b.step_number || 0))
          .map((inst: any) => inst.instruction || ''),
        prepTime: Math.floor((recipeData.total_time || 0) / 2),
        cookTime: Math.floor((recipeData.total_time || 0) / 2),
        servings: recipeData.serving_size || 0,
        calories: recipeData.calories || 0,
        difficulty: "Medium", // Note: difficulty is not in the database yet
        imageUrl: recipeData.image_url || '/placeholder.svg',
        tags: [], // Note: tags are not in the database yet
        tips: recipeData.instructions
          .sort((a: any, b: any) => (a.step_number || 0) - (b.step_number || 0))
          .map((inst: any) => inst.tip || '')
      } as Recipe;
    }
  });

  if (isLoading) {
    return (
      <div className="container py-8">
        <Button asChild className="mb-8">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to recipes
          </Link>
        </Button>
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-1/2"></div>
          <div className="aspect-video bg-muted rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container py-8 text-center">
        <h1 className="font-display text-3xl mb-4">Recipe not found</h1>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to recipes
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Button asChild className="mb-8">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to recipes
        </Link>
      </Button>
      <RecipeDetail recipe={recipe} />
    </div>
  );
};

export default RecipePage;