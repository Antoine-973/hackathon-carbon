import { ServicesBases} from "./servicesBases.tsx";

export const EventServices = {
    getAllEvents: async () => {
        try {
            const response = await fetch(ServicesBases.apiUrl + "/events");
            return await response.json();
        } catch (error) {return error ;}

    },
    create: async (data: any) => {
        try {
            const response = await fetch(ServicesBases.apiUrl + "/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {return error ;}
    },
    delete: async (id: number) => {
        try {
            const response = await fetch(ServicesBases.apiUrl + "/events/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return await response.json();
        } catch (error) {return error ;}
    },

    getEventById: async (id: number) => {
        try {
            const response = await fetch(ServicesBases.apiUrl + "/events/" + id);
            return await response.json();
        } catch (error) {return error ;}
    },

    joinEvent: async (id: number, user) => {
        try {
            const response = await fetch(ServicesBases.apiUrl + "/events/" + id + "/join",{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    participants: [user.id]
                })
            });
            return await response.json();
        } catch (error) {return error ;}

    },

    leaveEvent: async (id: number,user) => {
        try {
            const response = await fetch(ServicesBases.apiUrl + "/events/" + id + "/leave",{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    participants: [user.id]
                })
            });
            return await response.json();
        } catch (error) {return error ;}

    }
}