import axios from 'axios';

export default class Search {
  private query: string;
  private recipes: any; //Array<Object>;

  constructor(query: string) {
    this.query = query;
  }

  getResults = async () => {
    try {
      const res: any = await axios.get(
        // `${process.env.PROXY}http://food2fork.com/api/search?key=${process.env.API_KEY}&q=${this.query}`
        `https://forkify-api.herokuapp.com/api/search?&q=${this.query}`
      );
      let { recipes } = res.data;
      return recipes;
    } catch (error) {
      alert('something went wrong: ' + error);
      console.log(error);
    }
  };
}
