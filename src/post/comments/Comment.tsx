import arrowTop from "../../assets/arrow-top.svg";
import trash from "../../assets/trash.svg";
import {Reply} from "./reply";
import React, {useState} from "react";
import {CreateComment} from "../CreateComment";
import {useAuth} from "../../context/AuthContext";
import axios from "axios";

export type CommentType = {
    id: string;
    username: string;
    createdAt: string;
    text: string;
    replies?: {
        id: string;
        username: string;
        createdAt: string;
        text: string;
    }[];
}
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const Comment = ({ data, postId }: { data: CommentType; postId: string }) => {
    const { isAuthenticated } = useAuth();
    const [isRepliesOpen, setIsRepliesOpen] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [replyPage, setReplyPage] = useState(1);
    const [replies, setReplies] = useState(data.replies || []);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const repliesPerPage = 5;

    const toggleReplies = () => {
        setIsRepliesOpen((prev) => !prev);
        if (!isRepliesOpen) {
            setReplyPage(1);
        }
    };

    const loadMoreReplies = () => {
        setReplyPage((prev) => prev + 1);
    };

    const visibleReplies = replies.slice(0, replyPage * repliesPerPage);

    const handleNewReply = (newReply: any) => {
        setReplies((prev) => [...prev, newReply]);
        setIsReplying(false);
        setIsRepliesOpen(true);
        setReplyPage(1);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${SERVER_URL}/comments/${data.id}`,
                { withCredentials: true });
            setIsDeleted(true);
        } catch (error) {
            console.error("Error deleting comment:", error);
            alert("Failed to delete comment");
        }
    };

    if (isDeleted) return null;

    return (
        <div className="comments-list-box">
            <div className="comments-list__item">
                <div className="comment-content-box">
                    <div className="comments-list__item-title-box">
                        <div className="comments-list__item-title-date-box">
                            <h2 className="comments-list__item-username">{data.username}</h2>
                            <p className="comments-list__item-date">{data.createdAt}</p>
                        </div>

                        {isAuthenticated && (
                            <div className="trash-icon-box">
                                <img
                                    src={trash}
                                    alt="Delete"
                                    width="25px"
                                    height="25px"
                                    className="trash-icon"
                                    onClick={() => setIsDeleteConfirmOpen(true)}
                                />
                            </div>
                        )}
                    </div>

                    <div className="comments-list__item-text-box">
                        <p className="comments-list__item-text" style={{ whiteSpace: "pre-wrap" }}>{data.text}</p>
                    </div>

                    <div className="comments-list__item-buttons-box">
                        {replies.length > 0 ? (
                            <button className="show-reply" onClick={toggleReplies}>
                                <img
                                    src={arrowTop}
                                    width="30"
                                    height="30"
                                    className={`arrowTop-svg ${isRepliesOpen ? "rotated" : ""}`}
                                    alt=""
                                />
                                {replies.length} Reply
                            </button>
                        ) : (
                            <button className="no-replies" disabled>
                                No replies
                            </button>
                        )}
                        <button className="make-reply" onClick={() => setIsReplying(true)}>
                            Reply
                        </button>
                    </div>
                </div>
            </div>

            {isReplying && (
                <CreateComment
                    postId={postId}
                    commentId={data.id}
                    onCancel={() => setIsReplying(false)}
                    onCommentCreated={handleNewReply}
                />
            )}

            {isRepliesOpen && (
                <div className="comments-item__reply-box active">
                    {visibleReplies.map((reply) => (
                        <Reply key={reply.id} data={reply} commentId={data.id} />
                    ))}
                    {visibleReplies.length < replies.length && (
                        <button className="load-more-replies" onClick={loadMoreReplies}>
                            Load more replies
                        </button>
                    )}
                </div>
            )}

            {isDeleteConfirmOpen && (
                <div className="delete-popup-overlay">
                    <div className="delete-popup">
                        <p>Delete comment?</p>
                        <div className="popup-buttons">
                            <button className="yes-button" onClick={handleDelete}>Yes</button>
                            <button className="no-button" onClick={() => setIsDeleteConfirmOpen(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};