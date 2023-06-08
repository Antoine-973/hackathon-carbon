import {ServicesBases} from "./servicesBases";

export const ArticlesServices = {
    getLast: async () => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/article/last', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        } catch (error) {
            return error ;
        }

    }
}