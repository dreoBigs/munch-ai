import { Recipe } from "../types/recipe";
import { Badge } from "./ui/badge";
import { Clock, Users, ChefHat } from "lucide-react";
import { Separator } from "./ui/separator";
import { Card } from "./ui/card";

interface RecipeDetailProps {
  recipe: Recipe;
}

export const RecipeDetail = ({ recipe }: RecipeDetailProps) => {
  return (
    <article className="max-w-4xl mx-auto p-6 space-y-8 animate-fade-in">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h1 className="font-display text-4xl">{recipe.name}</h1>
          <Badge variant="secondary" className="text-lg">
            {recipe.difficulty}
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground">{recipe.description}</p>
        <div className="flex gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{recipe.prepTime + recipe.cookTime} mins</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5" />
            <span>{recipe.calories} calories</span>
          </div>
        </div>
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-lg">
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="font-display text-2xl">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex justify-between">
                <span>{ingredient.name}</span>
                <span className="text-muted-foreground">
                  {ingredient.quantity} {ingredient.unit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-display text-2xl">Instructions</h2>
          <ol className="space-y-6">
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>
                <Card className="p-4">
                  <div className="flex gap-4">
                    <span className="font-display text-accent text-lg">
                      {index + 1}.
                    </span>
                    <div className="space-y-2 flex-1">
                      <p>{instruction}</p>
                      {recipe.tips?.[index] && (
                        <p className="text-sm text-muted-foreground bg-muted p-2 rounded-md">
                          💡 Tip: {recipe.tips[index]}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-2">
        {recipe.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
    </article>
  );
};