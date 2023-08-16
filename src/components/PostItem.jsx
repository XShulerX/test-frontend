import React from "react";
import { Link } from "react-router-dom";
import Rating from "../components/UI/rating/Rating";

const PostItem = (props) => {
    return (
        <div className="post">
            <div className="post__content">
                <div className="coverContainer">
                    <img
                        className="cover"
                        src={props.post.background_image}
                        alt="default"
                    />
                </div>
                <div className="description">
                    <h3 className="title"><Link to={"/game/"+props.post.id}>{props.post.name}</Link></h3>
                    <div className="date">
                        Дата выхода: {props.post.released}
                    </div>
                    <div className="rating"><Rating dataRating={props.post.rating} dataId={props.post.id}/></div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
