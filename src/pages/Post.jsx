import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APIService from "../API/APIService";
import Rating from "../components/UI/rating/Rating";
import { useFetching } from "../hooks/useFetching";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Post = () => {
    const [post, setPost] = useState({});
    const [screenshots, setScreenshots] = useState([]);

    const { gameId } = useParams();
    const [fetchScreenshots, isLoading, screenshotsError] = useFetching(async(id)=>{
        const response = await APIService.getGameScreenshots(id);
        setScreenshots(response.data.results);
    });
    const [fetchPost, isPostLoading, postError] = useFetching(async (id) => {
        const response = await APIService.getPost(id);
        setPost(response.data);
    });

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    useEffect(() => {
        fetchScreenshots(gameId);
        fetchPost(gameId);
    }, []);

    return (
        <div className="postGame">
            <h1 className="title">{post.name}</h1>
            <div className="image">
                <img src={post.background_image} alt="background_image" />
            </div>
            <div className="description">{post.description_raw}</div>
            <Slider {...sliderSettings}>
                {screenshots.map((screenshot, index) => (
                    <div key={index}>
                        <img height={200} src={screenshot.image} alt={screenshot.id}/>
                    </div>
                ))}
            </Slider>
            <Rating dataRating={post.rating} dataId={post.id} size={"50px"} />
        </div>
    );
};

export default Post;
