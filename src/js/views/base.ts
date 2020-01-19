interface Elements {
  searchInput: HTMLInputElement;
  searchForm: HTMLFormElement;
  searchResult: HTMLElement;
  searchResultList: HTMLUListElement;
  searchResultsPages: HTMLDivElement;
  recipe: HTMLDivElement;
  shopping: HTMLDivElement;
}

interface ElementStrings {
  loader: string;
}

export const elements: Elements = {
  searchInput: <HTMLInputElement>document.querySelector('.search__field'),
  searchForm: <HTMLFormElement>document.querySelector('.search'),
  searchResult: <HTMLElement>document.querySelector('.results'),
  searchResultList: <HTMLUListElement>document.querySelector('.results__list'),
  searchResultsPages: <HTMLDivElement>document.querySelector('.results__pages'),
  recipe: <HTMLDivElement>document.querySelector('.recipe'),
  shopping: <HTMLDivElement>document.querySelector('.shopping__list')
};

export const elementStrings: ElementStrings = {
  loader: 'loader'
};

export const renderLoader: Function = (parent: HTMLElement) => {
  const loader: string = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader: Function = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};
