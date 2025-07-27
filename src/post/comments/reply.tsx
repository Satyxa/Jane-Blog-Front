import './replies.css'
import React, {useState} from "react";
import trash from "../../assets/trash.svg";
import {useAuth} from "../../context/AuthContext";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const Reply = ({ data, commentId }: {data: {id: string, username: string, createdAt: string, text: string}, commentId: string}) => {
    const { isAuthenticated } = useAuth();
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false);
    const handleDelete = async () => {
        try {
            await axios.delete(`${SERVER_URL}/comments/${data.id}`,
                { withCredentials: true });
            setIsDeleted(true); // скрыть комментарий
        } catch (error) {
            console.error("Error deleting comment:", error);
            alert("Failed to delete comment");
        }
    };
    if (isDeleted) return null;
    return (
            <div className="comments-item__reply">
                <div className="comments-list__item-title-box">

                    <div className="comments-list-item-titles">
                        <h2 className="comments-list__item-username">{data.username}</h2>
                        <p className="comments-list__item-date">{data.createdAt}</p>
                    </div>
                    {isAuthenticated && (
                        <div className="replies-trash-icon-box">
                            <img
                                src={trash}
                                alt="Delete"
                                width="25px"
                                height="25px"
                                className="replies-trash-icon"
                                onClick={() => setIsDeleteConfirmOpen(true)}
                            />
                        </div>
                    )}
                </div>
                <div className="comments-list__item-text-box">
                    <p className="comments-list__item-text" style={{ whiteSpace: "pre-wrap" }}>
                        {data.text}
                    </p>
                </div>

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
    )
}