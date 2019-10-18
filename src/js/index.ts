import { Search } from './models/Search';
import * as searchView from './views/';
import { elements } from './views/base';

interface State {
  search: string | Search;
}

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state: State = {
  search: ''
};

const controlSearch: Function = async () => {
  // 1) Get the query from the view
  const query: string = searchView.getInput();
  console.log(query);

  if (query) {
    // 2)Now search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();

    // 4) Search for recipes
    const result = await state.search.getResults();

    // 5) Render results on UI
    console.log(result);
    searchView.renderResults(result);
  }
};

const form: HTMLFormElement = elements.searchForm;
form.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});
