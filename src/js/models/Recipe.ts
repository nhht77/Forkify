import axios from 'axios';

export default class Recipe {
  private id: number;
  private title: string;
  private author: string;
  private url: string;
  private img: string;
  private ingredients: Array<string>;
  private time: number;
  private serving: number;

  constructor(id: number) {
    this.id = id;
  }

  async getRecipe() {
    try {
      // const res        = await axios.get(`https://www.food2fork.com/api/get?key=${process.env.API_KEY}&rId=${this.id}`);
      const res = await axios.get(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.url = res.data.recipe.source_url;
      this.img = res.data.recipe.image_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      alert('Something goes wrong: ' + error);
    }
  }

  calcTime() {
    // Assuming that we need 15 min for each 3 ingredients
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServing() {
    this.serving = 4;
  }

  parseIngredients() {
    const unitsLong = [
      'tablespoons',
      'tablespoon',
      'ounces',
      'ounce',
      'teaspoons',
      'teaspoon',
      'cups',
      'pounds'
    ];
    const unitsShort = [
      'tbsp',
      'tbsp',
      'oz',
      'oz',
      'tsp',
      'tsp',
      'cup',
      'pound'
    ];

    const newIngredients: Array<string> = this.ingredients.map(el => {
      // 1) Uniforms unit
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, idx) => {
        ingredient = ingredient.replace(unit, unitsShort[idx]);
      });
      // 2) Remove parentheses
      ingredient.replace(/\s*\(.*?\)\s*/g, '');

      // 3)Parse ingredients into count, unit and ingredient
      return ingredient;
    });
    return newIngredients;
  }
}
