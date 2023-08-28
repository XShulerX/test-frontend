import React from "react";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({
    setPage,
    filter,
    setFilter,
    setPosts,
}) => {

    return (
        <div className="filter">
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
