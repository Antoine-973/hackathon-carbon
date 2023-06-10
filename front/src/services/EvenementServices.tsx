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

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.log(error);
            throw error; 
        }
    }
}