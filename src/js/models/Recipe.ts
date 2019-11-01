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
      // console.log(res);
    } catch (error) {
      console.log(error);
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
}
