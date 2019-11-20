import axios from 'axios';

export interface Ingredient {
  count: number;
  ingredient: string;
  unit: string;
}

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

  getId() {return this.id};
  getTitle() {return this.title};
  getAuthor() {return this.author};
  getUrl() {return this.url};
  getIngredient() {return this.parseIngredients()}
  getImg() {return this.img};
  getTime() {return this.time};
  getServing() { return this.serving}

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

    const newIngredients: Array<Ingredient> = this.ingredients.map(el => {
      // 1) Uniforms unit
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, idx) => {
        ingredient = ingredient.replace(unit, unitsShort[idx]);
      });
      // 2) Remove parentheses
      ingredient.replace(/\s*\(.*?\)\s*/g, ' ');

      // 3)Parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

      let objIng: Ingredient;
      if (unitIndex > -1) {
        // There is a unit
        // Ex. 4 1/2 cups, arrCount is [4, 1/2]
        // Ex. 4  cups, arrCount is [4]

        const arrCount: Array<string> = arrIng.slice(0, unitIndex);

        let count: number;
        if (arrCount.length === 1) {
          count = eval(arrCount[0].replace('-', '+'));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        };
      } else if (parseInt(arrIng[0], 10)) {
        // There is NO unit, but 1st element is a number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        };
      } else if (unitIndex === -1) {
        // There is NO unit and NO number in 1st position
        objIng = {
          count: 1,
          unit: '',
          ingredient
        };
      }

      return objIng;
    });
    return newIngredients;
  }
}
