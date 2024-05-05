import axios from "axios";

const ApiService = {
    post: async (url: string, body: any) => {
        try {
            const response = await axios.post(url, body, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    // Can implement other methods if needed
};

export default ApiService;
