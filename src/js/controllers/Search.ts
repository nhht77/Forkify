import axios from "axios";
class foodApiService {
    private key : string = process.env.API_KEY;
    
    async getResult( query : string ){
        return await axios.get(`http://food2fork.com/api/search?key=${this.key}&q=${query}`);
    }
}