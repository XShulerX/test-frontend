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
        orderByAscending: '',
    });

    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const lastElement = useRef();

    const [fetchPosts, isPostsLoading, postError] = useFetching(
        async (limit, page, query, ordering, platform) => {
            if (query && !ordering && !platform) {

                const response = await PostService.getSearch(
                    limit,
                    page,
                    query
                );

                setPosts([...posts, ...response.data.results]);
                const totalCount = response.data.count;
                setTotalPages(getPageCount(totalCount, limit));
            }
            if (ordering && !platform) {
                const response = await PostService.getAllOrdering(
                    limit,
                    page,
                    ordering
                );

                setPosts([...posts, ...response.data.results]);
                const totalCount = response.data.count;
                setTotalPages(getPageCount(totalCount, limit));
            }
            if (platform) {

                const response = await PostService.getAllPostsByPlatform(
                    limit,
                    page,
                    platform
                );

                setPosts([...posts, ...response.data.results]);
                const totalCount = response.data.count;
                setTotalPages(getPageCount(totalCount, limit));
            } 
            if(!query && !platform && !ordering){

                const response = await PostService.getPosts(limit, page);

                setPosts([...posts, ...response.data.results]);
                const totalCount = response.data.count;
                setTotalPages(getPageCount(totalCount, limit));
            }
        }
    );

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    });

    useEffect(() => {
        fetchPosts(limit, page, filter.query, filter.orderByAscending + filter.ordering, filter.platform);
    }, [page, filter]);

    return (
        <div className="Posts">
            <PostFilter
                fetchPosts={fetchPosts}
                filter={filter}
                setFilter={setFilter}
                setPosts={setPosts}
            />
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
