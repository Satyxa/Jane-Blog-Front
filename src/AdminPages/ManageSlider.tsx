import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './ManagePost.css'
import headerImageLights from "../assets/header-image-lights.webp";

export const ManagePost = () => {
    const [action, setAction] = useState<"update" | "delete" | "">("");
    const [postId, setPostId] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [poster, setPoster] = useState<File | null>(null);
    const [images, setImages] = useState<File[]>([]);

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selected = Array.from(e.target.files);
            const combined = [...images, ...selected].slice(0, 10);
            setImages(combined);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!postId) {
            alert("Post ID is required");
            return;
        }

        const url = `http://localhost:3000/posts/${postId}`;

        try {
            if (action === "delete") {
                const response = await fetch(url, { method: "DELETE", credentials: "include" });

                if (!response.ok) throw new Error("Failed to delete post");
            }

            if (action === "update") {
                const formData = new FormData();
                formData.append("title", title);
                formData.append("text", text);

                if (poster) formData.append("file", poster);
                if (images) {
                    Array.from(images).forEach((img) => {
                        formData.append("images", img);
                    });
                }

                const response = await fetch(url, {
                    method: "PUT",
                    body: formData,
                    credentials: "include",
                });

                if (!response.ok) throw new Error("Failed to update post");
            }
        } catch (err: any) {
            alert("Error: " + err.message);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="admin-pages-images-container">
                <div className="admin-pages-lights"><a href="/"><img src={headerImageLights} alt=""/></a></div>
            </div>
            <div className="page-wrapper-box">
                <div className="form-container">
                    <h2>Manage Post</h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="form-group">
                            <label className="form-item" htmlFor="action">Action</label>
                            <select className="form-item"
                                    id="action"
                                    value={action}
                                    onChange={(e) => setAction(e.target.value as "update" | "delete" | "")}
                            >
                                {/*<option className="form-item" value="">Select Action</option>*/}
                                <option className="form-item" value="delete">Delete</option>
                                <option className="form-item" value="update">Update</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-item" htmlFor="postId">Post ID</label>
                            <input className="form-item"
                                   id="postId"
                                   type="text"
                                   value={postId}
                                   onChange={(e) => setPostId(e.target.value)}
                                   required
                            />
                        </div>

                        {action === "update" && (
                            <>
                                <div className="form-group">
                                    <label className="form-item" htmlFor="title">Title</label>
                                    <input className="form-item"
                                           id="title"
                                           type="text"
                                           value={title}
                                           onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-item" htmlFor="text">Text</label>
                                    <textarea className="form-item"
                                              id="text"
                                              value={text}
                                              onChange={(e) => setText(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-item" htmlFor="poster">Poster (1 image)</label>
                                    <input className="form-item"
                                           id="poster"
                                           type="file"
                                           accept="image/*"
                                           onChange={(e) => setPoster(e.target.files?.[0] || null)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="create-content-form-item" htmlFor="images">Upload Images (up to 10)</label>
                                    <input
                                        id="images"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImagesChange}
                                        className="form-input"
                                    />
                                    {images.length > 0 && (
                                        <div className="image-preview-list">
                                            <p>Image Previews:</p>
                                            {images.map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={URL.createObjectURL(img)}
                                                    alt={`img-${idx}`}
                                                    className="image-preview-item"
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        <div className="form-group-button">
                            <button type="submit">
                                {action === "delete" ? "Delete Post" : "Update Post"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};