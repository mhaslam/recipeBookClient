import { Ingredient } from '../shared/ingredient.model';

export class Book {
  public title: string;
  public description: string;
  public imageUrl: string;

  constructor(title: string, desc: string, imageUrl: string) {
    this.title = title;
    this.description = desc;
    this.imageUrl = imageUrl;
  }
}
