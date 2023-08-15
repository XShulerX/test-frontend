import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";

const Post = () => {
    const [post, setPost] = useState({});
    const { gameId } = useParams();
    const [fetchPost, isPostLoading, postError] = useFetching(async (id) => {
        const response = await PostService.getPost(id);
        setPost(response.data);
    });

    useEffect(() => {
        fetchPost(gameId);
    }, []);

    return (
        <div className="Posts">
            <h1>{post.name}</h1>
        </div>
    );
};

export default Post;
