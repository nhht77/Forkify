import { elements } from './base';

interface Recipe {
  image_url: string;
  publisher: string;
  publisher_url: string;
  recipe_id: string;
  social_rank: number;
  source_url: string;
  title: string;
}

export const getInput: Function = () => elements.searchInput.value;

export const clearInput: Function = () => {
  elements.searchInput.value = '';
};

const renderRecipe: Function = (recipe: Recipe) => {
  const markup: string = `
    <li>
        <a class="results__link results__link--active" href="#${
          recipe.recipe_id
        }">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;

  elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

const limitRecipeTitle: Function = (title: string, limit: number = 20) => {
  const newTitle: Array<string> = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    // return the result
    return `${newTitle.join(' ')} ...`;
  }
  return title;
};

const createButton = (page: number, type: string) => `
<button class="btn-inline results__btn--${type}" data-goto=${
  type === 'prev' ? page - 1 : page + 1
}>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${
          type === 'prev' ? 'left' : 'right'
        }"></use>
    </svg>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
</button>`;

const renderButtons: Function = (
  page: number,
  numberResult: number,
  resultPerPage: number
) => {
  let button: string;
  const pages: number = Math.ceil(numberResult / resultPerPage);

  if (page === 1 && pages > 1) {
    // Only button goes to next page
    button = createButton(page, 'next');
  } else if (page < pages) {
    // both button goes to next & prev page
    button = `
      ${createButton(page, 'prev')}      
      ${createButton(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    // Only button goes to prev page
    button = createButton(page, 'prev');
  }
  elements.searchResultsPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults: Function = (
  recipes: Array<Recipe>,
  page: number = 1,
  resultsPerPage: number = 10
) => {
  // render result of current page
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;

  recipes.slice(start, end).forEach(el => renderRecipe(el));

  // render pagination
  renderButtons(page, recipes.length, resultsPerPage);
};

export const clearResults: Function = () => {
  elements.searchResultList.innerHTML = '';
  elements.searchResultsPages.innerHTML = '';
};
