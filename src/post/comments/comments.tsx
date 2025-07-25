import arrowTop from "../assets/arrow-top.svg";
import "./comments.css"
export const Comments = () => {
    return (
        <div className="comments-container">
            <h1 className="comments-title">COMMENTS AND DISCUSSION</h1>
            <p className="comments-text">first drafts or additional writing free on ko-fi</p>
            <div className="comments-list">
                <div className="comments-list-box">
                    <div className="comments-list__item">
                        <div className="comments-list__item-title-box">
                            <h2 className="comments-list__item-username">rina</h2>
                            <p className="comments-list__item-date">7 months ago</p>
                        </div>
                        <div className="comments-list__item-text-box">
                            <p className="comments-list__item-text">
                                The perspective and wording is quite beautiful. As a big fan of this movie it gives me a fresh point of view. I think that the impact of 'beautiful things don't ask for attention' doesn't need the true context to it. Isn't art more about what people take from it? :)) Even with your deeper understanding and relatability it's your own impression of it and your own meaning. That is the best of this strange and beautiful perspective. ♡
                            </p>
                        </div>
                        <div className="comments-list__item-buttons-box">
                            <button className="show-reply"><img src={arrowTop} width="30" height="30" className="arrowTop-svg"/>  1 Reply</button>
                            <button className="make-reply">Reply</button>
                        </div>
                    </div>
                    <div className="comments-item__reply-box">
                        <div className="comments-item__reply">
                            <div className="comments-list__item-title-box">
                                <h2 className="comments-list__item-username">rina</h2>
                                <p className="comments-list__item-date">7 months ago</p>
                            </div>
                            <div className="comments-list__item-text-box">
                                <p className="comments-list__item-text">
                                    The perspective and wording is quite beautiful. As a big fan of this movie it gives me a fresh point of view. I think that the impact of 'beautiful things don't ask for attention' doesn't need the true context to it. Isn't art more about what people take from it? :)) Even with your deeper understanding and relatability it's your own impression of it and your own meaning. That is the best of this strange and beautiful perspective. ♡
                                </p>
                            </div>
                            <div className="comments-list__item-buttons-box">
                                <button className="show-reply"><img src={arrowTop} width="30" height="30" className="arrowTop-svg"/>  1 Reply</button>
                                <button className="make-reply">Reply</button>
                            </div>
                        </div>
                        <div className="comments-item__reply">
                            <div className="comments-list__item-title-box">
                                <h2 className="comments-list__item-username">rina</h2>
                                <p className="comments-list__item-date">7 months ago</p>
                            </div>
                            <div className="comments-list__item-text-box">
                                <p className="comments-list__item-text">
                                    The perspective and wording is quite beautiful. As a big fan of this movie it gives me a fresh point of view. I think that the impact of 'beautiful things don't ask for attention' doesn't need the true context to it. Isn't art more about what people take from it? :)) Even with your deeper understanding and relatability it's your own impression of it and your own meaning. That is the best of this strange and beautiful perspective. ♡
                                </p>
                            </div>
                            <div className="comments-list__item-buttons-box">
                                <button className="show-reply"><img src={arrowTop} width="30" height="30" className="arrowTop-svg"/>  1 Reply</button>
                                <button className="make-reply">Reply</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="comments-list__item">
                    <div className="comments-list__item-title-box">
                        <h2 className="comments-list__item-username">rina</h2>
                        <p className="comments-list__item-date">7 months ago</p>
                    </div>
                    <div className="comments-list__item-text-box">
                        <p className="comments-list__item-text">
                            The perspective and wording is quite beautiful. As a big fan of this movie it gives me a fresh point of view. I think that the impact of 'beautiful things don't ask for attention' doesn't need the true context to it. Isn't art more about what people take from it? :)) Even with your deeper understanding and relatability it's your own impression of it and your own meaning. That is the best of this strange and beautiful perspective. ♡
                        </p>
                    </div>
                    <div className="comments-list__item-buttons-box">
                        <button className="show-reply"><img src={arrowTop} width="30" height="30" className="arrowTop-svg"/>  1 Reply</button>
                        <button className="make-reply">Reply</button>
                    </div>
                </div>
            </div>
        </div>
    )
}