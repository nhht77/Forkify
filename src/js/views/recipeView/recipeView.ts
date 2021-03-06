import { elements } from '../base';
import Recipe, { Ingredient } from '../../models/Recipe';
import { Fraction } from '../../utils/Fraction/';

export const clearRecipe = () => {
  elements.recipe.innerHTML = '';
};

const formatCount = (count: number) => {
  if (count) {
    const newCount = Math.round(count * 10000) / 10000;
    const [int, dec] = newCount
      .toString()
      .split('.')
      .map(el => parseInt(el, 10));

    if (!dec) return newCount;
    if (int === 0) {
      return `${Fraction(newCount).display}`;
    } else {
      return `${int} ${Fraction(newCount - int).display}`;
    }
  }
  return '?';
};

const createIngredient = (ingredient: Ingredient) => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>
`;

export const renderRecipe = (recipe: Recipe) => {
  const markup = `
        <figure class="recipe__fig">
            <img src="${recipe.getImg()}" alt="${recipe.getTitle()}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.getTitle()}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.getTime()}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.getServings()}</span>
                <span class="recipe__info-text"> servings</span>
                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>
            </div>
            <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart-outlined"></use>
                    </svg>
            </button>
        </div>
        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${recipe
                  .getIngredientObjs()
                  .map((el: Ingredient) => createIngredient(el))
                  .join('')}
            </ul>
            <button class="btn-small recipe__btn recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>
        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.getAuthor()}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipe.getUrl()}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>
            </a>
        </div>
    `;
  elements.recipe.insertAdjacentHTML('afterbegin', markup);
};

export const updateServingsIngredients: Function = (recipe: Recipe) => {
  document.querySelector(
    '.recipe__info-data--people'
  ).textContent = recipe.getServings().toString();

  const countElements = Array.from(document.querySelectorAll('.recipe__count'));
  countElements.forEach((el, idx) => {
    let ingredients = recipe.getIngredientObjs();
    el.textContent = formatCount(ingredients[idx].count).toString();
  });
};
