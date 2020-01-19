import { elements } from '../base';
import { Item } from '../../models/List';

const renderItems = (item: Item) => {
  const markup: string = `
    <li class="shopping__item" data-itemid=${item.id}>
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
    `;
  elements.shopping.insertAdjacentHTML('beforeend', markup);
};

const removeItem = (id: string) => {
  const item = document.querySelector(`[data-itemid=${id}]`);
  item.parentElement.removeChild(item);
};
