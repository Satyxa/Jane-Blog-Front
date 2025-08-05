import avatar from "../assets/avatar.svg";
import React, {useRef, useState} from "react";
import axios from "axios";
import {CommentType} from "./comments/Comment";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const CreateComment = (
    {
        onCancel,
        postId,
        commentId,
        setComments,
        onCommentCreated
    }:
                              {
                                  onCancel?: () => void,
                                  setComments?: React.Dispatch<React.SetStateAction<CommentType[]>>
                                  postId: string,
                                  commentId?: string,
                                  onCommentCreated?: (data: any) => void,
                              }) => {
    const usernameInput = useRef<HTMLInputElement>(null);
    const commentTextarea = useRef<HTMLTextAreaElement>(null);
    const actions = useRef<HTMLDivElement>(null);

    const [username, setUsername] = useState("");
    const [comment, setComment] = useState("");

    const activateForm = () => {
        if (
            usernameInput.current &&
            commentTextarea.current &&
            actions.current
        ) {
            usernameInput.current.placeholder = "Username";
            commentTextarea.current.classList.add("visible");
            actions.current.classList.add("visible");
        }
    };

    const resetForm = () => {
        setUsername("");
        setComment("");

        if (
            usernameInput.current &&
            commentTextarea.current &&
            actions.current
        ) {
            usernameInput.current.placeholder = "Write a comment";
            commentTextarea.current.classList.remove("visible");
            actions.current.classList.remove("visible");
            usernameInput.current.value = "";
            commentTextarea.current.value = "";
        }
    };

    const autoGrow = () => {
        if (commentTextarea.current) {
            commentTextarea.current.style.height = "auto";
            commentTextarea.current.style.height = `${commentTextarea.current.scrollHeight}px`;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim() || !comment.trim()) return;

        try {
            const res = await axios.post(`${SERVER_URL}/comments/${postId}`, {
                username,
                text: comment,
                replyToId: commentId ?? null
            });
            if (res.data) {
                onCommentCreated?.(res.data);
            }
            const newComment = res.data;
            if(setComments) {
                setComments(prev => [ newComment, ...prev]);
            }
            setUsername("");
            setComment("");
        } catch (err) {
            console.error("Cannot send comment to the server", err);
        }
    };



    return (
        <div className="comments-create-box">
            <img src={avatar} alt="avatar" />
            <form className="content" onSubmit={handleSubmit}>
                <div className="comment-compose-body">
                    <input
                        type="text"
                        ref={usernameInput}
                        className="comment-input"
                        placeholder="Write a comment"
                        onFocus={activateForm}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <textarea
                        ref={commentTextarea}
                        className="comment-textarea"
                        placeholder="Write your comment"
                        onInput={autoGrow}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <div className="actions" ref={actions}>
                        <button
                            type="button"
                            className="cancel"
                            onClick={() => {
                                resetForm();
                                onCancel?.();
                            }}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="comment" onClick={handleSubmit}>
                            Comment
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};