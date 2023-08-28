import React, { useEffect, useRef, useState } from "react";
import APIService from "../API/APIService";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import PostSearch from "../components/PostSearch";
import MyButton from "../components/UI/button/MyButton";
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
        orderByAscending: "",
    });
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [filterBar, setFilterBar] = useState(false);

    const lastElement = useRef();
    
    const [fetchPosts, isPostsLoading, postError] = useFetching(
        async (limit, page, query, ordering, platform) => {
            const response = await APIService.getPosts(
                limit,
                page,
                query,
                ordering,
                platform
            );
            setPosts([...posts, ...response.data.results]);
            const totalCount = response.data.count;
            setTotalPages(getPageCount(totalCount, limit));
        }
    );

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    });

    useEffect(() => {
        fetchPosts(
            limit,
            page,
            filter.query,
            filter.orderByAscending + filter.ordering,
            filter.platforms
        );
    }, [page, filter]);

    return (
        <div className="Posts">
            <div className="stickyBlock">
                <div className="searchBar flexContainer">
                    <PostSearch
                        filter={filter}
                        setFilter={setFilter}
                        setPosts={setPosts}
                        setPage={setPage}
                    />
                    <MyButton
                        onClick={() => {
                            setFilterBar(true);
                        }}
                        className="btnFilters"
                    >
                        <img
                            className="icon"
                            src="/iconFilter.png"
                            alt="Фильтры"
                        />
                    </MyButton>
                </div>
            </div>
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
            <div
                onClick={(e) => {
                    if (e.target !== e.currentTarget) return;
                    setFilterBar(false);
                }}
                className={(filterBar ? "active" : "") + " sidebarMenu"}
            >
                <div className="sidebarContent">
                    <PostFilter
                        setPage={setPage}
                        setFilter={setFilter}
                        setPosts={setPosts}
                        filter={filter}
                    />
                </div>
            </div>
            <div
                ref={lastElement}
                style={{
                    height: 20,
                    display: isPostsLoading ? "none" : "block",
                }}
            ></div>
        </div>
    );
}

export default Posts;
