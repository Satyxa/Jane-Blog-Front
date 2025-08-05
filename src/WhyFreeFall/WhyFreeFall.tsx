import headerImageLights from "../assets/header-image-lights.webp";
import theFool from "../assets/theFool.webp";
import eye from "../assets/eye.png";
import "./WhyFreeFall.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import {PostType} from "../post/post";
import KofiWidget from "../main/KoFiWidget";
import {Helmet} from "react-helmet";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export function WhyFreeFall() {
    const [content, setContent] = useState<{
        id: string,
        title: string,
        text: string,
        imagesUrls: string[],
    } | null>(null);
    useEffect(() => {
        const fetchWFF = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/admin-pages/wff-pnaa-pages?pageType=wff`, {
                });
                setContent(response.data);
            } catch (error) {
                console.error('Cannot get WFF page from server:', error);
            }
        };

        fetchWFF();
    }, []);
    if(!content) return <div> <p> ...Loading</p></div>
    return (
        <div>
            <Helmet>
                <title>{content.title} - Freefall</title>
            </Helmet>
            <div className="wff-container">
                <div className="wff-info-container">
                    <div className="wff-info-box">
                        <div className="wff-title-box">
                            <div className="wff-eye">
                                <a href=""><img src={eye} alt=""/></a>
                            </div>
                            <div className="test"><h1 className="wff-info-title">{content?.title}</h1></div>
                        </div>
                        <div className="wff-info-text-box">
                            <p className="wff-info-text" style={{ whiteSpace: "pre-line" }}>
                                {content?.text}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="wff-images-container">
                    <div className="wff-lights"><a href="/"><img src={headerImageLights} alt=""/></a></div>
                    {content?.imagesUrls?.length > 0 && content.imagesUrls?.map((url) =>
                        (
                            <div className="wff-theFool"><img src={url}  alt=""/></div>
                        )
                    )}
                </div>
            </div>
            <KofiWidget/>
        </div>
    )
}