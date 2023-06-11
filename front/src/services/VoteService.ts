import {ServicesBases} from "./servicesBases.ts";
export const VoteService = {

    vote : async (vote: Vote) => {
        try {
            const response = await fetch(`${ServicesBases.apiUrl}/vote`, {
               method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(vote),
            });
            return await response.json();
        } catch (e) {
            return e;
        }
    },

    deleteVote : async (id: number) => {
        try {
            const response = await fetch(`${ServicesBases.apiUrl}/vote/${id}`, {
                method: 'DELETE',
            });
            return await response.json();
        } catch (e) {
            return e;
        }
    }
}

interface Vote {
    voterId: number,
    positiveCommentId: number,
    negativeCommentId: number,
}