import React, { useEffect, useRef, useState } from "react";
import PostService from "../API/PostService";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { useObserver } from "../hooks/useObserver";

import { getPageCount, getPagesArray } from "../utils/pages";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({
        query: "",
        ordering: "",
        platforms: "",
        orderByAscending: true,
    });

    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [previousQuery, setPreviousQuery] = useState();
    // const sortedPosts = useSortedPosts(
    //     posts,
    //     filter.sort,
    //     filter.orderByAscending
    // );
    const lastElement = useRef();

    const [fetchPosts, isPostsLoading, postError] = useFetching(
        async (limit, page, query, ordering, platform) => {
            const response = await PostService.getSearch(limit, page, query, ordering, platform);
            setPreviousQuery(response);
            setPosts([...posts, ...response.data.results]);
            const totalCount = response.data.count;
            setTotalPages(getPageCount(totalCount, limit));
        }
    );

    useEffect(() => {
        fetchPosts(limit, page);
    }, [page]);

    return (
        <div className="Posts">
            <PostFilter fetchPosts={fetchPosts} filter={filter} setFilter={setFilter} setPosts={setPosts}/>
            {postError && <h1>Произошла ошибка ${postError}</h1>}

            <PostList posts={posts} title="Каталог игр" />

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
            <div ref={lastElement} style={{ height: 20 }}></div>
        </div>
    );
}

export default Posts;
