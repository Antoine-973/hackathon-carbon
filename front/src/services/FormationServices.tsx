import {ServicesBases} from "./servicesBases";

export const FormationServices = {
    getFormations: async () => {
        const response = await fetch(ServicesBases.apiUrl+'/formation', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    }
}