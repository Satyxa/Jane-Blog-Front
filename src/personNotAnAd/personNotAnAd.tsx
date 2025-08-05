import headerImageLights from "../assets/header-image-lights.webp";
import personNotAnAdTransparent from "../assets/person-not-ad-transparent.webp";
import personNotAnAdHand from "../assets/person-not-ad-hand.webp";
import watermelon from "../assets/watermelon.webp";
import eye from "../assets/eye.png";
import "./personNotAnAd.css"
import axios from "axios";
import React, {useEffect, useState} from "react";
import KofiWidget from "../main/KoFiWidget";
import {Helmet} from "react-helmet";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export function PersonNotAnAd() {
    const [content, setContent] = useState<{
        id: string,
        title: string,
        text: string,
        imagesUrls: string[],
    } | null>(null);
    useEffect(() => {
        const fetchPNAA = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/admin-pages/wff-pnaa-pages?pageType=pnaa`, {
                });
                setContent(response.data);
            } catch (error) {
                console.error('Cannot get PNAA page from server:', error);
            }
        };

        fetchPNAA();
    }, []);

    if(!content) return <div> <p> ...Loading</p></div>
    return (
        <div>
            <Helmet>
                <title>{content.title} - Freefall</title>
            </Helmet>
            <div className="pnaa-container">
                <div className="pnaa-info-container">
                    <div className="pnaa-info-box">
                        <h1 className="pnaa-info-title">{content?.title}</h1>
                        <div className="pnaa-info-text-box">
                            <p className="pnaa-info-text" style={{ whiteSpace: "pre-line" }}> {content?.text}</p>
                        </div>
                    </div>
                </div>
                <div className="pnaa-images-container">
                    <div className="pnaa-lights">
                        <a href="/">
                            <img src={headerImageLights} alt=""/>
                        </a>
                        <div className="pnaa-eye">
                            <a href="">
                                <img src={eye} alt=""/>
                            </a>
                        </div>
                    </div>
                    {content?.imagesUrls?.length > 0 && content.imagesUrls?.map((url) =>
                        (
                            <div className="pnaa-personNotAnAdHand">
                                <img src={url}  alt=""/>
                            </div>
                        )
                    )}
                </div>
            </div>
            <KofiWidget/>
        </div>
    )
}