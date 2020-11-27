import baseURL from './api';

class ShortenerService {
    constructor(){
        this.api = baseURL('http://localhost:3002/');
    }

    async getLink(code){
        const result = await this.api.get(`links/${code}`);

        return result.data;
    }

    async getStats(code){
        const result = await this.api.get(`links/${code}/stats`);

        return result.data;
    }

    async generate(model){
        console.log(this.api.post('links', model));
        const result = await this.api.post('links', model)
        return result.data;
    }
}

export default ShortenerService;