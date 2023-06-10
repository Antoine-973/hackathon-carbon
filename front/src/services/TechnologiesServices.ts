import {ServicesBases} from "./servicesBases";

export const TechnologiesServices = {
    getAll: async () => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/technology', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        } catch (error) {
            return error ;
        }
    },
    create: async (data: any) => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/technology', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            return error ;
        }
    },
    delete: async (id: number) => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/technology/'+id, {
                method: 'DELETE',
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