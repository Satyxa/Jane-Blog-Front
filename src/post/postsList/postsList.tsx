import headerImageLights from "../assets/header-image-lights.webp";
import carouselOne from "../assets/carousel-one.webp";
import carouselTwo from "../assets/carousel-two.webp";
import eye from "../assets/eye.png";
import "./postsList.css"
export function PostsList() {

    return (
        <div>
            <div className="lights"><a href=""><img src={headerImageLights} alt=""/></a></div>
            <div className="content-container">
                <div className="disclaimer">
                    <h1 className="disclaimer-title">DISCLAIMER</h1>
                    <p className="disclaimer-text">You will most likely not understand the blog posts' entire content if you don't watch/read the stories written about first.</p>
                </div>
                <div className="postList">
                    <div className="post">
                        <a href="">
                            <img src={carouselOne}/>
                            <h2 className="post-title">so called glorious</h2>
                        </a>
                    </div>
                    <div className="post">
                        <a href="">
                            <img src={carouselTwo}/>
                            <h2 className="post-title">so called glorious</h2>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}