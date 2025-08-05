import {postType} from "./postsList";
import {Link} from "react-router-dom";
import React from "react";
export const OnePost = ({ imageUrl, title, id }: postType) => {

    return (
        <div key={id} className="pl-post">
            <Link to={`/posts/${id}`}>
                <div className="pl-post-inner">

                    <img src={imageUrl} alt={title} />
                    <p className="pl-post-title">{title}</p>
                </div>
            </Link>
        </div>
    )
}