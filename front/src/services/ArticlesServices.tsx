import {ServicesBases} from "./servicesBases";

export const ArticlesServices = {
    getLast: async () => {
        const response = await fetch(ServicesBases.apiUrl+'/article/last', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response)
        return await response.json();
    }
}