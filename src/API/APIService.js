import axios from "axios";

const keyAPI = "749e518e5a2f49d7bd7cdbac8ac975b0";

export default class APIService {
    static async getPosts(limit = 10, page = 1, search, ordering, platform) {
        const response = await axios.get(
            `https://api.rawg.io/api/games`,
            {
                params: {
                    key: keyAPI,
                    page_size: limit,
                    page: page,
                    search: search === '' ? null : search,
                    ordering: ordering === '' ? null : ordering,
                    parent_platforms: platform === '' ? null : platform,
                    withCredentials: true,
                },
            }
        );
        return response;
    }

    static async getPost(id){
        const response = await axios.get(
            `https://api.rawg.io/api/games/${id}`,{
            params:{
                key: keyAPI,
            },
        });
        return response;
    }

    static async getGameScreenshots(id){
        const response = await axios.get(
            `https://api.rawg.io/api/games/${id}/screenshots`,{
            params:{
                key: keyAPI,
            },
        });
        return response;
    }

    static async getPlatforms(){
        const response = await axios.get(
            `https://api.rawg.io/api/platforms/lists/parents`,{
            params:{
                key: keyAPI,
            },
        });
        return response;
    }
}
