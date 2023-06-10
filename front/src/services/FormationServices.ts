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

    createFormation : async (formation) => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/formation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formation),
            });
            return await response.json();
        }catch(error){
            return error ;
        }
    },

    deleteFormation : async (id) => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/formation/'+id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        }catch(error){
            return error ;
        }
    },

    getFormation : async (id) => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/formation/'+id);
            return await response.json();
        }catch(error){
            return error ;
        }
    },

    joinFormation : async (id, participants) => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/formation/'+id+'/join', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    participants: [participants.id]
                }),
            });
            return await response.json();
        }catch(error){
            return error ;
        }
    },

    leaveFormation : async (id,participants) => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/formation/'+id+'/leave', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    participants: [participants.id]
                }),
            });
            return await response.json();
        }catch(error){
            return error ;
        }
    }


}