interface Elements {
  searchInput: HTMLInputElement;
  searchForm: HTMLFormElement;
  searchResultList: HTMLUListElement;
}

export const elements: Elements = {
  searchInput: <HTMLInputElement>document.querySelector('.search__field'),
  searchForm: <HTMLFormElement>document.querySelector('.search'),
  searchResultList: <HTMLUListElement>document.querySelector('.results__list')
};
