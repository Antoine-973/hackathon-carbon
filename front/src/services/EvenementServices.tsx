import {ServicesBases} from "./servicesBases";

export const EvenementServices = {
    getEvenements: async () => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/events', {
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