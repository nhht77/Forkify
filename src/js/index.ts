import { Search } from './models/Search';

const pizza: Search = new Search('pizza');
pizza.getResults().then(res => console.log(res));
