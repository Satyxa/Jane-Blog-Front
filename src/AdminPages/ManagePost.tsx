import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './PostUpdDel.css'

export const PostUpdDel = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [poster, setPoster] = useState<File | null>(null);
    const [images, setImages] = useState<FileList | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Загрузка текущих данных поста (если нужно отобразить существующие)
        axios.get(`http://localhost:3000/posts/${id}`)
            .then(res => {
                setTitle(res.data.title || "");
                setText(res.data.text || "");
            })
            .catch(err => {
                console.error("Failed to fetch post", err);
            });
    }, [id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("text", text);
        if (poster) formData.append("poster", poster);
        if (images) {
            Array.from(images)
                .slice(0, 10)
                .forEach((img, index) => {
                    formData.append("images", img);
                });
        }

        try {
            await axios.put(`http://localhost:3000/posts/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            alert("Post updated!");
            navigate(`/posts/${id}`);
        } catch (err) {
            console.error("Update failed", err);
            alert("Failed to update post");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        try {
            await axios.delete(`http://localhost:3000/posts/${id}`, {
                withCredentials: true,
            });
            alert("Post deleted.");
            navigate("/posts");
        } catch (err) {
            console.error("Delete failed", err);
            alert("Failed to delete post");
        }
    };

    return (
        <div className="edit-post-container">
            <h2>Edit Post</h2>
            <form onSubmit={handleUpdate} encType="multipart/form-data">
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Text</label>
                    <textarea
                        value={text}
                        onChange={e => setText(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div>
                    <label>Poster (max 1)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setPoster(e.target.files?.[0] || null)}
                    />
                </div>

                <div>
                    <label>Images (max 10)</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={e => {
                            if (e.target.files && e.target.files.length > 10) {
                                alert("You can only upload up to 10 images");
                                return;
                            }
                            setImages(e.target.files);
                        }}
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Post"}
                </button>

                <button type="button" onClick={handleDelete} style={{ marginLeft: "1rem" }}>
                    Delete Post
                </button>
            </form>
        </div>
    );
};