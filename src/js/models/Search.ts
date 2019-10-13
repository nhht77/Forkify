import axios from 'axios';

class Search {
  private query: string;

  constructor(query: string) {
    this.query = query;
  }

  getResults = async () => {
    try {
      const res: any = await axios.get(
        `${process.env.PROXY}http://food2fork.com/api/search?key=${process.env.API_KEY}&q=${this.query}`
      );
      let { recipes } = await res.data;
      return recipes;
    } catch (error) {
      console.log(error);
    }
  };
}

export { Search };
