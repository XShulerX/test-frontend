import React from "react";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
import MyButton from "./UI/button/MyButton";

const PostFilter = ({ fetchPosts, filter, setFilter, setPosts }) => {
    const searchForm= document.querySelector("#search");
    return (
        <div>
            <form id="search" >
                <MyInput
                    name="query"
                    placeholder="Поиск"
                />
                <MyButton
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        const data = new FormData(searchForm);
                        setFilter({ ...filter, query: data.get('query')});
                        setPosts([]);
                        fetchPosts(10, 1, data.get('query'));
                    }}
                >
                    🔍
                </MyButton>
            </form>

            <MySelect
                value={filter.ordering}
                onChange={(selectedSort) =>
                    setFilter({ ...filter, ordering: selectedSort })
                }
                defaultValue="Сортировка"
                options={[
                    { value: "rating", name: "По рейтингу" },
                    { value: "released", name: "По дате релиза" },
                ]}
            />
            <MySelect
                value={filter.orderByAscending}
                onChange={(selectedOrder) =>
                    setFilter({ ...filter, orderByAscending: selectedOrder })
                }
                defaultValue="Порядок"
                options={[
                    { value: '', name: "По возростанию" },
                    { value: '-', name: "По убыванию" },
                ]}
            />
        </div>
    );
};

export default PostFilter;
