import "./CreateContent.css"
import { useState } from "react";
import headerImageLights from "../assets/header-image-lights.webp";

type ContentType = "Post" | "wff" | "pnaa" | "Quote";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export function CreateContent() {
    const [contentType, setContentType] = useState<ContentType>("Post");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [poster, setPoster] = useState<File | null>(null);
    const [images, setImages] = useState<File[]>([]);
    const [author, setAuthor] = useState("");

    const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setPoster(e.target.files[0]);
    };

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selected = Array.from(e.target.files);
            const combined = [...images, ...selected].slice(0, 10);
            setImages(combined);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        if (contentType === "Post") {
            formData.append("title", title);
            formData.append("text", text);
            if (poster) formData.append("file", poster);
            images.forEach(img => formData.append("images", img));
        }

        if (contentType === "wff" || contentType === "pnaa") {
            formData.append("title", title);
            formData.append("text", text);
            formData.append("pageType", contentType);
            images.forEach(img => formData.append("images", img));
        }

        if (contentType === "Quote") {
            await fetch(`${SERVER_URL}/admin-pages/quote`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ author, text })
            });
        }

        const endpoint =
            contentType === "Post" ? "/posts" : "/admin-pages/wff-pnaa-pages";

        const method = contentType === "Post" ? "POST" : "PUT";

        if(contentType !== 'Quote') await fetch(`${SERVER_URL}${endpoint}`, {
            method,
            body: formData,
            credentials: "include",
        });

        setTitle("");
        setText("");
        setPoster(null);
        setImages([]);
        setAuthor("");
    };

    return (
        <div className="create-post-container">
            <div className="admin-pages-images-container">
                <div className="admin-pages-lights"><a href="/"><img src={headerImageLights} alt=""/></a></div>
            </div>
            <h2 className="create-post-title">Create New Content</h2>
            <div className="create-content-form-box">
                <form onSubmit={handleSubmit} className="create-post-form" encType="multipart/form-data">
                    <div className="create-content-form-group">
                        <label className="create-content-form-item" htmlFor="type">Select Content Type</label>
                        <select
                            id="type"
                            value={contentType}
                            onChange={e => setContentType(e.target.value as ContentType)}
                            className="form-input"
                        >
                            <option className="create-content-form-item" value="Post">Post</option>
                            <option className="create-content-form-item" value="wff">WFF Page</option>
                            <option className="create-content-form-item" value="pnaa">PNAA Page</option>
                            <option className="create-content-form-item" value="Quote">Quote</option>
                        </select>
                    </div>

                    {(contentType === "Post" || contentType === "wff" || contentType === "pnaa") && (
                        <>
                            <div className="create-content-form-group">
                                <label className="create-content-form-item" htmlFor="title">Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    required
                                    className="form-input"
                                    placeholder="Enter title"
                                />
                            </div>
                            <div className="form-group">
                                <label className="create-content-form-item" htmlFor="text">Text</label>
                                <textarea
                                    id="text"
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                    required
                                    rows={6}
                                    className="form-textarea"
                                    placeholder="Enter content"
                                />
                            </div>
                        </>
                    )}

                    {contentType === "Quote" && (
                        <>
                            <div className="create-content-form-group">
                                <label className="create-content-form-item" htmlFor="author">Author</label>
                                <input
                                    id="author"
                                    type="text"
                                    value={author}
                                    onChange={e => setAuthor(e.target.value)}
                                    required
                                    className="form-input"
                                    placeholder="Enter author"
                                />
                            </div>
                            <div className="create-content-form-group">
                                <label className="create-content-form-item" htmlFor="text">Quote Text</label>
                                <textarea
                                    id="text"
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                    required
                                    rows={4}
                                    className="form-textarea"
                                    placeholder="Enter quote"
                                />
                            </div>
                        </>
                    )}

                    {contentType === "Post" && (
                        <div className="create-content-form-group">
                            <label className="create-content-form-item" htmlFor="poster">Upload Poster</label>
                            <input
                                id="poster"
                                type="file"
                                accept="image/*"
                                onChange={handlePosterChange}
                                className="form-input"
                            />
                            {poster && <span className="file-name">{poster.name}</span>}
                        </div>
                    )}

                    {(contentType === "Post" || contentType === "wff" || contentType === "pnaa") && (
                        <div className="create-content-form-group">
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
                    )}

                    <div className="form-submit-button">
                        <button type="submit" className="submit-button">
                            Publish {contentType}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}