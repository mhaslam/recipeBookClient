import { Recipe } from '../recipes/recipe.model';

export class Book {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public imageUrl: string,
    public color: string,
    public recipeCount: string,
    public recipes: Recipe[]
  ) {}
}

/*
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private String color;
    private int recipeCount;
    private List<String> recipes;
*/