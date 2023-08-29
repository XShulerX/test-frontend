import React, { useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useObserver } from "../hooks/useObserver";
import PostItem from "./PostItem";
import Loader from "./UI/Loader/Loader";

const PostList = ({
    posts = [],
    title,
    isPostsLoading,
    setPage,
    page,
    totalPages,
}) => {
    const lastElement = useRef();

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    });

    return (
        <div className="posts">
            <h1 style={{ textAlign: "center" }}>{title}</h1>

                <TransitionGroup className="list">
                    {posts.map((post, index) => (
                        <CSSTransition
                            key={post.id}
                            timeout={500}
                            classNames="post"
                        >
                            <PostItem number={index + 1} post={post} />
                        </CSSTransition>
                    ))}
                    <div
                        ref={lastElement}
                        style={{
                            height: "20px",
                            display: "block",
                        }}
                    ></div>
                </TransitionGroup>

            {isPostsLoading && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "50px",
                    }}
                >
                    <Loader />
                </div>
            )}
        </div>
    );
};

export default PostList;
