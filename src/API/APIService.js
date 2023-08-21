import axios from "axios";

const keyAPI = "749e518e5a2f49d7bd7cdbac8ac975b0";

export default class APIService {
    static async getPosts(limit = 10, page = 1) {
        const response = await axios.get(
            `https://api.rawg.io/api/games`,
            {
                params: {
                    key: keyAPI,
                    page_size: limit,
                    page: page,
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

    static async getSearch(
        limit = 10,
        page = 1,
        search = '',

    ) {
        const response = await axios.get(
            `https://api.rawg.io/api/games`,
            {
                params: {
                    key: keyAPI,
                    page_size: limit,
                    page: page,
                    search: search,
                    search_exact: true,
                    search_precise: true,
                    withCredentials: true,
                },
            }
        );
        return response;
    }

    static async getAllPostsByPlatform(
        limit = 10,
        page = 1,
        platform,
    ) {
        const response = await axios.get(
            `https://api.rawg.io/api/games`,
            {
                params: {
                    key: keyAPI,
                    page_size: limit,
                    page: page,
                    parent_platforms: platform,
                    withCredentials: true,
                },
            }
        );
        return response;
    }

    static async getAllOrdering(
        limit = 10,
        page = 1,
        ordering,
    ) {
        const response = await axios.get(
            `https://api.rawg.io/api/games`,
            {
                params: {
                    key: keyAPI,
                    page_size: limit,
                    page: page,
                    ordering: ordering,
                    withCredentials: true,
                },
            }
        );
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
}
