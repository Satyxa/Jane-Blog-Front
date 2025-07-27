import headerImageLights from "../assets/header-image-lights.webp";
import './post.css'
import "./comments.css"
import {Comment, CommentType} from "./comments/Comment";
import React, {useEffect, useState} from "react";
import {CreateComment} from "./CreateComment";
import axios from "axios";
import {useParams, useSearchParams} from "react-router-dom";
import {log} from "node:util";
import KofiWidget from "../main/KoFiWidget";

export type PostType = {
    id: string;
    title: string;
    text: string;
    imagesUrl: string[];
    imagesUrls: string[];
    comments: CommentType[];
} | null

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export function Post() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [post, setPost] = useState<PostType>(null);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [totalComments, settotalComments] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(parseInt(searchParams.get("pageNumber") || "1"));
    const [pageSize, setpageSize] = useState<number>(parseInt(searchParams.get("pageSize") || "10"));


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/posts/${id}`, {
                    params: {
                        pageSize,
                        pageNumber,
                    },
                });
                setPost(response.data.post);
                setComments(response.data.post.comments);
                settotalComments(response.data.commentsTotalCount);
            } catch (error) {
                console.error('Ошибка при получении поста:', error);
            }
        };

        fetchPost();
    }, [id, pageNumber, pageSize]);
    if (!post) {
        return <div className="loading">Post Loading...</div>;
    }

    const totalPages = Math.ceil(totalComments / pageSize);
    return (
        <div>
            <div className="container">
                <div className="post-container">
                    <div className="post-text-box">
                        <h1 className="post-title">{post!.title!}</h1>
                        <p className="post-text">
                            {post?.text}
                        </p>
                    </div>
                    <div className="comments-container">
                        <h1 className="comments-title">COMMENTS AND DISCUSSION</h1>
                        <p className="comments-text">first drafts or additional writing free on ko-fi</p>
                        <CreateComment postId={post.id} setComments={setComments}/>
                        <div className="comments-list">
                            {comments.map((comment) => (
                                <Comment key={comment.id} data={comment} postId={post.id} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="images-container">
                    <a href="/"><img src={headerImageLights} alt="" className="lights"/>
                    </a>
                    <div className="post-images-container">
                        {post!.imagesUrls!.map((url) => {
                            console.log(url)
                            return (
                            <img src={url} alt="" className="post-image"/>
                            )})}
                </div>
                </div>

            </div>
            <KofiWidget/>
        </div>
    )
    }