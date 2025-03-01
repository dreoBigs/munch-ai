import { Recipe } from "../types/recipe";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <Card className="recipe-card overflow-hidden">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="object-cover w-full h-full"
          />
        </div>
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-display text-xl">{recipe.name}</h3>
            <Badge variant="secondary">{recipe.difficulty}</Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {recipe.description}
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.prepTime + recipe.cookTime} mins</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{recipe.servings} servings</span>
            </div>
            <div>{recipe.calories} cal</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};