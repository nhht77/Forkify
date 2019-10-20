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
        <a class="results__link results__link--active" href="${
          recipe.source_url
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
  const newTitle: Array<String> = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc: number, cur: string) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
  }

  return `${newTitle.join(' ')} ...`;
};

export const renderResults: Function = (recipes: Array<Recipe>) => {
  recipes.forEach(el => renderRecipe(el));
};

export const clearResults: Function = () => {
  elements.searchResultList.innerHTML = '';
};
