import React, { useRef } from "react";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
import MyButton from "./UI/button/MyButton";

const PostFilter = ({
    setPage,
    filter,
    setFilter,
    setPosts,
}) => {
    const seacrhForm = useRef();
    return (
        <div className="filter">
            <form id="search" ref={seacrhForm}>
                <MyInput name="query" placeholder="Поиск" />
                <MyButton
                    type="submit"
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
                    🔍
                </MyButton>
            </form>
            <form id="filter">
                <MySelect
                    value={filter.ordering}
                    onChange={(selectedSort) => {
                        setPosts([]);
                        setFilter({
                            ...filter,
                            query: "",
                            ordering: selectedSort,
                            platforms: "",
                        });
                    }}
                    defaultValue="Сортировка"
                    options={[
                        { value: "rating", name: "По рейтингу" },
                        { value: "released", name: "По дате релиза" },
                    ]}
                />
                <MySelect
                    value={filter.orderByAscending}
                    onChange={(selectedOrder) => {
                        setPosts([]);
                        setFilter({
                            ...filter,
                            query: "",
                            platforms: "",
                            orderByAscending: selectedOrder,
                        });
                    }}
                    defaultValue="Порядок"
                    options={[
                        { value: "", name: "По возростанию" },
                        { value: "-", name: "По убыванию" },
                    ]}
                />
            </form>
        </div>
    );
};

export default PostFilter;
