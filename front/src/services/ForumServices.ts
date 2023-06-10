import {ServicesBases} from "./servicesBases";
export const ForumServices = {


    getAllForums: async () => {
        try {
            const response = await fetch(ServicesBases.apiUrl + "/topic");
            return await response.json();
        } catch (error) {return error ;}
    },

    createForum: async (forum: any) => {
        try {
            const response = await fetch(ServicesBases.apiUrl + "/topic", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(forum),
            });
            return await response.json();
        } catch (error) {return error ;}
    },

    getForum: async (id: number) => {
        try {
            const response = await fetch(ServicesBases.apiUrl + "/topic/" + id);
            const forum = await response.json();
            forum.createdAt = new Date(forum.createdAt);
            forum.updatedAt = new Date(forum.updatedAt);
            return forum ;
        } catch (error) {return error ;}
    },
    createComment: async (data: any) => {
        try {
            const response = await fetch(ServicesBases.apiUrl + '/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            return error;
        }
    }

}