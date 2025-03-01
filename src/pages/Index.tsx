import { useQuery } from "@tanstack/react-query";
import { RecipeCard } from "../components/RecipeCard";
import { supabase } from "@/integrations/supabase/client";
import { Recipe } from "@/types/recipe";

const Index = () => {
  const { data: recipes, isLoading } = useQuery({
    queryKey: ['recipes'],
    queryFn: async () => {
      const { data: recipesData, error: recipesError } = await supabase
        .from('recipies')
        .select(`
          *,
          ingredients:ingredients(name, quantity),
          instructions:instructions(instruction)
        `);

      if (recipesError) throw recipesError;

      // Transform the data to match our Recipe type
      return recipesData.map((recipe): Recipe => ({
        id: recipe.id,
        name: recipe.name || '',
        description: recipe.description || '',
        ingredients: recipe.ingredients.map((ing: any) => ({
          name: ing.name || '',
          quantity: ing.quantity || '',
          unit: '' // Note: unit is not in the database yet
        })),
        instructions: recipe.instructions.map((inst: any) => inst.instruction || ''),
        prepTime: Math.floor((recipe.total_time || 0) / 2), // Splitting total time between prep and cook
        cookTime: Math.floor((recipe.total_time || 0) / 2),
        servings: recipe.serving_size || 0,
        calories: recipe.calories || 0,
        difficulty: "Medium", // Note: difficulty is not in the database yet
        imageUrl: recipe.image_url || '/placeholder.svg',
        tags: [] // Note: tags are not in the database yet
      }));
    }
  });

  return (
    <div className="min-h-screen">
      <section className="bg-secondary py-16 mb-12">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-md">munch</h1>
            <p className="text-xl text-muted-foreground">
              Discover recipes that are both tasty and good for you
            </p>
          </div>
        </div>
      </section>

      <section className="container py-8">
        <h2 className="font-display text-3xl mb-8">Featured Recipes</h2>
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="aspect-video bg-muted rounded-lg mb-4"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recipes?.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;