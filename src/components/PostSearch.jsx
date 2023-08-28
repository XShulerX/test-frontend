import { useRef } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const PostSearch = ({setPosts, setFilter, setPage, filter}) => {
    const seacrhForm = useRef();
    return (
        <div className="search">
            <form id="search" ref={seacrhForm}>
                <MyInput name="query" placeholder="Поиск" />
                <MyButton
                    type="submit"
                    className="searchBtn"
                    onClick={(e) => {
                        e.preventDefault();
                        setPosts([]);
                        const data = new FormData(seacrhForm.current);
                        setFilter({
                            ...filter,
                            query: data.get("query"),
                            ordering: "",
                            platforms: "",
                            orderByAscending: "",
                        });
                        setPage(1);
                    }}
                >
                    <img className="icon" src="iconSearch.png" alt="search" />
                </MyButton>
            </form>
        </div>
    );
};
export default PostSearch;
