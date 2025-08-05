import React, {useEffect, useState, useRef} from "react";
import './ManagePost.css'
import './ManageSlider.css'
import headerImageLights from "../assets/header-image-lights.webp";
import axios from "axios";
import {Helmet} from "react-helmet";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const ManageSlider = () => {
    const [action, setAction] = useState<"update" | "delete" | "">("");
    const [imageUrl, setImageUrl] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [ sliderImages, setSliderImages ] = useState([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const urlInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const fetchSliderImages = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/admin-pages/slider`, {
                });
                setSliderImages(response.data);
            } catch (error) {
                console.error('Getting slider images error:', error);
            }
        };

        fetchSliderImages();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (action === 'delete' && !imageUrl) {
            alert("slider image url is required");
            return;
        }

        const url = `${SERVER_URL}/admin-pages/slider`;

        try {
            if (action === "delete") {
                const response = await fetch(url, { method: "DELETE", body: JSON.stringify({ url: imageUrl }),
                    headers: {
                        "Content-Type": "application/json"
                    }, credentials: "include" });
                if (!response.ok) throw new Error("Failed to delete slider image");
                if (response.ok) {
                    setImageUrl("");
                    if (urlInputRef.current) {
                        urlInputRef.current.value = "";
                    }
                    alert('Slider image deleted successfully.');
                }
            }

            if (action === "update") {
                const formData = new FormData();

                if (image) formData.append("file", image);

                const response = await fetch(url, {
                    method: "POST",
                    body: formData,
                    credentials: "include",
                });

                if (response.ok) {
                    setImage(null);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                    alert('Slider image uploaded');
                }
                if (!response.ok) throw new Error("Failed to update slider image");
            }
        } catch (err: any) {
            alert("Error: " + err.message);
        }
    };

    return (
       <div>
           <Helmet>
               <title>Manage Slider - Freefall</title>
           </Helmet>
           <div className="manage-slider-page-wrapper">
               <div className="admin-pages-images-container">
                   <div className="admin-pages-lights"><a href="/" className="admin-pages-lights-link"><img src={headerImageLights} alt=""/></a></div>
               </div>
               <div className="page-wrapper-box">
                   <div className="form-container">
                       <h2>Manage Slider</h2>
                       <form onSubmit={handleSubmit} encType="multipart/form-data">
                           <div className="form-group">
                               <label className="form-item" htmlFor="action">Action</label>
                               <select className="form-item"
                                       id="action"
                                       value={action}
                                       onChange={(e) => setAction(e.target.value as "update" | "delete" | "")}
                               >
                                   <option className="form-item" value="">Select</option>
                                   <option className="form-item" value="delete">Delete</option>
                                   <option className="form-item" value="update">Add</option>
                               </select>
                           </div>

                           {action === "delete" && (
                               <div className="form-group">
                                   <label className="form-item" htmlFor="imageUrl">Image Url</label>
                                   <input className="form-item"
                                          id="imageUrl"
                                          type="text"
                                          value={imageUrl}
                                          onChange={(e) => setImageUrl(e.target.value)}
                                          required
                                          ref={urlInputRef}
                                   />
                               </div>
                           )}

                           {action === "update" && (
                               <>

                                   <div className="form-group">
                                       <label className="form-item" htmlFor="image">Slider (1 image)</label>
                                       <input className="form-item"
                                              ref={fileInputRef}
                                              id="image"
                                              type="file"
                                              accept="image/*"
                                              onChange={(e) => setImage(e.target.files?.[0] || null)}
                                       />
                                   </div>

                               </>
                           )}

                           <div className="form-group-button">
                               <button type="submit">
                                   {action === "delete" ? "Delete Image" : "Add Image"}
                               </button>
                           </div>
                       </form>
                   </div>
               </div>
           </div>
           <div className="slider-images-container">
               <div className="slider-images-box">
                   {sliderImages.length > 0 && sliderImages.map((image: {id: string, url: string}, i) => (
                       <div className="slider-images-box__item">
                           <div className="slider-images-box__item-image"><img src={image.url} alt="" width="300px" height="auto"/></div>
                           <div className="slider-images-box__item-url"><p className="slider-images-box__item-url-text">{image.url}</p></div>
                       </div>
                   ))}
               </div>
           </div>
       </div>
    );
};