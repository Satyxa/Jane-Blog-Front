import React, {MouseEventHandler, useEffect, useRef, useState} from "react";
import headerImageLights from "../assets/header-image-lights.webp";
import headerImageLetters from "../assets/header-image-letters.webp";
import personNotAnAd from "../assets/person-not-ad.webp";
import carouselOne from "../assets/carousel-one.webp";
import carouselTwo from "../assets/carousel-two.webp";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./MainDesktopStyles.css"
import "./MainMobileStyles.css";
import KofiWidget from "./KoFiWidget";
import {Auth} from "./Auth";
import axios from "axios";
import { Helmet } from 'react-helmet';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export function Main() {
    const [quote, setQuote] = useState<{
        author: string,
        text: string,
    } | null>(null);

    const [ sliderImages, setSliderImages ] = useState([]);

    const quoteRef = useRef<HTMLDivElement | null>(null);
    const projectRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const updatePadding = () => {
            if (window.innerWidth <= 768 && quoteRef.current && projectRef.current) {
                const quoteHeight = quoteRef.current.offsetHeight;
                projectRef.current.style.paddingTop = `${quoteHeight - 50}px`;
            } else if (projectRef.current) {
                projectRef.current.style.paddingTop = "0px";
            }
        };

        updatePadding();

        window.addEventListener("resize", updatePadding);
        return () => window.removeEventListener("resize", updatePadding);
    }, [quote]);


    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/admin-pages/quote`, {
                });
                setQuote(response.data);
            } catch (error) {
                console.error('Cannot get quote from server:', error);
            }
        };

        fetchQuote();
    }, []);

    useEffect(() => {
        const fetchSliderImages = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/admin-pages/slider`, {
                });
                setSliderImages(response.data);
            } catch (error) {
                console.error('Cannot get slider images from server:', error);
            }
        };

        fetchSliderImages();
    }, []);
    if(!sliderImages) return <div> Loading... </div>;
    return (
        <div className="Main">
            <Helmet>
                <title>Main - Freefall</title>
            </Helmet>
            <Auth/>
            <div className='header-box'>
                <div className="header-image-box">
                    <img
                        src={headerImageLights}
                        className="header-image-lights" width="400" height="430"/>
                    <p className="header-title">writing in safe space</p>
                </div>
            </div>
            <div className="content-container">
                <div className="blog-container">
                    <div className="letters"><a href="/why-freefall"><img src={headerImageLetters} color="black"/></a>
                    </div>
                    <div className="mySwiper">
                        {sliderImages.length > 0 && (
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={0}
                                centeredSlides={false}
                                loop={true}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                modules={[Pagination, Autoplay]}
                                className="slider"
                            >
                                {sliderImages.map((img: {id: string, url: string}, index) => (
                                    <SwiperSlide key={img.id || index}>
                                        <div className="slide-content">
                                            <img src={img.url} width="100%" height="100%" alt="" />
                                            <a href="/posts" className="slide-link">Go to BLOG</a>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                    <div className="projectIdea" ref={projectRef}><a href="/not-ad"><img src={personNotAnAd} width="100%" height="100%"/></a>
                    </div>
                </div>


                <div className="test">
                    <div className="blog-quote-box" ref={quoteRef}>
                        <p className="blog-quote-text" style={{ whiteSpace: "pre-line" }}>{quote?.text}</p>
                        <br/>
                        <p className="blog-quote-author" style={{ whiteSpace: "pre-line" }}>{quote?.author}</p>
                    </div>
                </div>
            </div>
            <KofiWidget/>

        </div>


    )
}
