import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import Rating from "../components/UI/rating/Rating";
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
        <div className="postGame">
            <h1 className="title">{post.name}</h1>
            <div className="image">
                <img src={post.background_image} alt="background_image" />
            </div>
            <div className="description">
                {post.description_raw}
            </div>
            <Rating dataRating={post.rating} dataId={post.id} size={'50px'}/>
        </div>
    );
};

export default Post;
