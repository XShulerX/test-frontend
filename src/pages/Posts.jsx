import React, { useEffect, useState } from "react";
import APIService from "../API/APIService";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import PostSearch from "../components/PostSearch";
import MyButton from "../components/UI/button/MyButton";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({
        query: "",
        ordering: "",
        platforms: "",
        orderByAscending: "",
    });
    const [totalPages, setTotalPages] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [filterBar, setFilterBar] = useState(false);

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

    useEffect(() => {
        fetchPosts(
            limit,
            page,
            filter.query,
            filter.orderByAscending + filter.ordering,
            filter.platforms
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, filter]);

    return (
        <div className="pagePosts">
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
                        className="btnFilters mobile"
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
            <div className="mainContent">
                <PostList
                    posts={posts}
                    title="Каталог игр"
                    isPostsLoading={isPostsLoading}
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                />
                <div className="sidebarMenu">
                    <h1>Фильтры</h1>
                    <div className="sidebarContent">
                        <PostFilter
                            setPage={setPage}
                            setFilter={setFilter}
                            setPosts={setPosts}
                            filter={filter}
                        />
                    </div>
                </div>
            </div>

            <div
                onClick={(e) => {
                    if (e.target !== e.currentTarget) return;
                    setFilterBar(false);
                }}
                className={(filterBar ? "active" : "") + " sidebarMenu mobile"}
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
        </div>
    );
}

export default Posts;
