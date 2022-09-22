export class Ingredient {
  constructor(
    public name: string,
    public amount: number,
    public recipe_id: number,
    public id?: number
  ) {}
}
