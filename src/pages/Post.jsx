import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APIService from "../API/APIService";
import Rating from "../components/UI/rating/Rating";
import { useFetching } from "../hooks/useFetching";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShowMore from "../components/ShowMore";

const Post = () => {
    const [post, setPost] = useState({});
    const [screenshots, setScreenshots] = useState([]);
    const { gameId } = useParams();
    const [fetchPost, isPostLoading, postError] = useFetching(async (id) => {
        const response = await APIService.getPost(id);
        setPost(response.data);
    });
    const [fetchScreenshots, isLoading, screenshotsError] = useFetching(
        async (id) => {
            const response = await APIService.getGameScreenshots(id);
            setScreenshots(response.data.results);
        }
    );

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        fetchPost(gameId);
        fetchScreenshots(gameId);
    }, []);

    return (
        <div className="postGame">
            <h1 className="title">{post.name}</h1>
            <div className="mainBody">
                <div className="image">
                    <img src={post.background_image} alt="background_image" />
                </div>
                <div className="details">
                    <h2>Details: </h2>
                    <ul>
                        <li>
                            Rating:
                            <Rating
                                dataRating={post.rating}
                                dataId={post.id}
                                size={"30px"}
                            />
                        </li>
                        <li>
                            Platforms:
                            <div className="platforms">
                                {post.parent_platforms?.map(
                                    (platform, index) => (
                                        <div className="platform" key={index}>
                                            <img
                                                className="icon"
                                                src={
                                                    "/icon" +
                                                    platform.platform.name +
                                                    ".png"
                                                }
                                                alt={platform.platform.name}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </li>
                        <li>
                            Website:
                            <div>
                                 <a href={post.website}>{post.website}</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="description">
                <h2>Description</h2>
                <ShowMore text={post.description_raw} limit={250} />
            </div>
            <h2>Screenshots</h2>
            <Slider {...sliderSettings}>
                {screenshots.map((screenshot, index) => (
                    <div key={index}>
                        <img
                            height={200}
                            src={screenshot.image}
                            alt={screenshot.id}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Post;
