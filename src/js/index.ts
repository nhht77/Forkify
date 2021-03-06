import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';


interface State {
  search?: Search;
  recipe?: Recipe;
}

// TEST CODE
// declare global { interface Window { r: Recipe} }
// declare global { interface Window { l: List} }

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

  // TESTING
  // const query: string = "pizza";

  if (query) {
    // 2)Now search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResult);

    try {
      // 4) Search for recipes
      const result: Array<Search> = await state.search.getResults();

      // 5) Render results on UI
      clearLoader();
      searchView.renderResults(result);
    } catch (error) {
      alert('Something wrong with the search ' + error);
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

// TESTING
// window.addEventListener('load', e => {
//   e.preventDefault();
//   controlSearch();
// });

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
  const id: number = parseInt(window.location.hash.replace('#', ''));

  if (id) {
    // Prepare UI for changes
    recipeView.clearRecipe();

    // Highlight search item
    if (state.search) searchView.highlightSelected(id);

    // Create new recipe object
    state.recipe = new Recipe(id);

    // TESTING
    // window.r = state.recipe;

    try {
      // Get recipe data
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServing();

      // render recipe
      console.log(state.recipe);
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      alert('Error processing recipe: ' + error);
    }
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, () => controlRecipe())
);

elements.recipe.addEventListener('click', e => {
  //Typescript checking for clicking target as instance of Element
  if (event.target instanceof Element) {
    // Descrease serving is clicked
    if (event.target.matches('.btn-decrease, .btn-decrease *')) {
      if (state.recipe.getServings() > 1) {
        state.recipe.updateServings('desc');
        recipeView.updateServingsIngredients(state.recipe);
      }
    }
    // Increase serving is clicked
    else if (event.target.matches('.btn-increase, .btn-increase *')) {
      state.recipe.updateServings('inc');
      recipeView.updateServingsIngredients(state.recipe);
    }
  }
});
