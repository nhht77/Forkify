import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/';
import { elements, renderLoader, clearLoader } from './views/base';

interface State {
  search?: Search;
}

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state: State = {
  // search
};

/**
 * SEARCH CONTROLLER
 */
const controlSearch: Function = async () => {
  // 1) Get the query from the view
  const query: string = searchView.getInput();

  if (query) {
    // 2)Now search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResult);

    // 4) Search for recipes
    const result: Array<Search> = await state.search.getResults();

    // 5) Render results on UI
    clearLoader();
    searchView.renderResults(result);
  }
};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResultsPages.addEventListener('click', async e => {
  const target = e.target as HTMLElement;
  const button = target.closest('.btn-inline');

  if (button) {
    const pageTogo: number = parseInt(button.getAttribute('data-goto'));
    const results: Array<Search> = await state.search.getResults();
    searchView.clearResults();
    searchView.renderResults(results, pageTogo);
  }
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe: Function = async () => {
  const id = window.location.hash.replace('#', '');
  console.log(id)

  if(id) {
    // Prepare UI for changes

    // Create new recipe object

    // Get recipe data

    // Calculate servings and time

    // render recipe
  }
} 

window.addEventListener('hashchange', () => controlRecipe())

// const r = new Recipe(47746);
// r.getRecipe();
// console.log(r);
