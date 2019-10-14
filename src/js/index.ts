import { Search } from './models/Search';


interface State {
    search: string | Search
}

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state : State = {
    search: ''
};

const controlSearch : Function = async () => {
    // 1) Get the query from the view
    const query : string = 'pizza';

    if(query){
        // 2)Now search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results

        // 4) Search for recipes
        const result = await state.search.getResults();

        // 5) Render results on UI
        console.log(result)
    }
}

const form = <HTMLFormElement>document.querySelector('.search');
form.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch()
})


const pizza: Search = new Search('pizza');
pizza.getResults().then(res => console.log(res));
