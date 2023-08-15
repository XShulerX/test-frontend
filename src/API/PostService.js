import axios from "axios";

const keyAPI = "749e518e5a2f49d7bd7cdbac8ac975b0";

export default class PostService {
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
        ordering,
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
                    ordering: ordering,
                    withCredentials: true,
                },
            }
        );
        return response;
    }

    static async getTestAPI(
        limit = 10,
        page = 1,
        search = "Grand Theft Auto",
        search_exact = true,
        ordering = "released",
        platforms = 1
    ) {
        const response = await axios.get(
            `https://api.rawg.io/api/games?key=${keyAPI}`,
            {
                params: {
                    search: search,
                    search_exact: search_exact,
                    ordering: ordering,
                    parent_platforms: platforms,
                    withCredentials: true,
                },
            }
        );
        return response;
    }
}
