import { useState } from "react";

const ShowMore = ({ text, limit }) => {
    const [isShowMore, setIsShowMore] = useState(true);
    const toggleShowMore = () => {
        setIsShowMore(!isShowMore);
    };
    return (
        <p>
            {isShowMore ? text?.slice(0, limit) : text}
            {text?.length > limit && (
                <span className="showMore" onClick={toggleShowMore}>
                    {isShowMore ? "...read more" : "...show less"}
                </span>
            )}
        </p>
    );
};

export default ShowMore;
