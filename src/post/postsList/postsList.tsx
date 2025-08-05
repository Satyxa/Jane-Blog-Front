import headerImageLights from "../../assets/header-image-lights.webp";
import "./postsList.css"
import {OnePost} from "./onePost";
import axios from 'axios';
import React, {useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import KofiWidget from "../../main/KoFiWidget";
import {Helmet} from "react-helmet";

export type postType = {
    id: string;
    title: string;
    imageUrl: string;
    createdAt: string;
}
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export function PostsList() {
    const [searchParams] = useSearchParams();
    const [pageNumber, setPageNumber] = useState<number>(parseInt(searchParams.get("pageNumber") || "1"));
    const [pageSize, setpageSize] = useState<number>(parseInt(searchParams.get("pageSize") || "5"));
    const [posts, setPosts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/posts`, {
                    params: {
                        pageSize,
                        pageNumber,
                    },
                });
                setTotalCount(response.data.totalCount);
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Cannot get posts from server:', error);
            }
        };
        fetchPosts();
    }, [pageNumber, pageSize]);

    const totalPages = Math.ceil(totalCount / pageSize);
    return (
        <div>
            <Helmet>
                <title>{"Posts"} - Freefall</title>
            </Helmet>
            <div className="pl-lights"><a href="/"><img src={headerImageLights} alt=""/></a></div>
            <div className="pl-posts-content-container">
                <div className="pl-disclaimer">
                    <h1 className="pl-disclaimer-title">DISCLAIMER</h1>
                    <p className="pl-disclaimer-text">You will most likely not understand the blog posts' entire content if you don't watch/read the stories written about first.</p>
                </div>
                <div className="pl-post-list">
                    {posts.map((post: postType) => (
                        <OnePost {...post}/>
                    ))}
                </div>
            </div>
            <div className="posts-pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        className={`posts-page-button ${page === pageNumber ? "active" : ""}`}
                        onClick={() => setPageNumber(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <KofiWidget/>
        </div>
    )
}