import {ServicesBases} from "./servicesBases";

export const FormationServices = {
    getFormations: async () => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/formation', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        }catch(error){
            return error ;
        }

    },


}