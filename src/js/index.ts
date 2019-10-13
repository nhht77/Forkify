import axios from 'axios';
import { CLIENT_RENEG_WINDOW } from 'tls';

const getResults = async (query : string) => {
    try {
        const res : any = await axios.get(`${process.env.PROXY}http://food2fork.com/api/search?key=${process.env.API_KEY}&q=${query}`);
        console.log(res.data.recipes);
    } catch (error) {
        console.log(error)
    }
}
getResults('pizza');