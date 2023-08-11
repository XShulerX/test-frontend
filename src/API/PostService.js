import axios from "axios";

export default class PostService {

    static async getAll(limit = 10, page = 1) {
        const key = "749e518e5a2f49d7bd7cdbac8ac975b0";
        const response = await axios.get(
            `https://api.rawg.io/api/games?key=${key}`, {
                params:{
                    page_size: limit,
                    page: page
                }
            }
        );
        return response;
    }
}
