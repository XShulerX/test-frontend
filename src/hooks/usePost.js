import { useMemo } from "react";

export const useSortedPosts = (posts, sort, orderByAscending) => {
    const sortedPosts = useMemo(() => {
        if (sort) {
            if(orderByAscending){
                if(typeof(posts[0][sort]) === 'number')
                    return [...posts].sort((a, b) => a[sort]-b[sort]);
                if(typeof(posts[0][sort]) === 'string')
                    return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
            }else{
                if(typeof(posts[0][sort]) === 'number')
                    return [...posts].sort((a, b) => b[sort]-a[sort]);
                if(typeof(posts[0][sort]) === 'string')
                    return [...posts].sort((a, b) => b[sort].localeCompare(a[sort]));
            }
        }
        return posts;
    }, [sort, posts]);

    return sortedPosts;
};

export const usePosts = (posts, sort, query, orderByAscending) => {
    const sortedPosts = useSortedPosts(posts, sort, orderByAscending);
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter((post) =>
            post.name.toLowerCase().includes(query)
        );
    }, [query, sortedPosts]);

    return sortedAndSearchedPosts;
};
