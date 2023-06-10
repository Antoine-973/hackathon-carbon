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
    },
    getAll: async () => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/article', {
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
            const response = await fetch(ServicesBases.apiUrl+'/article', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            return error ;
        }
    },
    delete: async (id: number) => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/article/'+id, {
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