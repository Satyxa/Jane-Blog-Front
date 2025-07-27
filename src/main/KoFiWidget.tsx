import { useState } from 'react';
import './KoFiWidget.css';

export default function KofiWidget() {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="kofi-widget-container">
            <div className="kofi-button" onClick={togglePopup}>
                <img
                    src="https://storage.ko-fi.com/cdn/cup-border.png"
                    className="kofi-img"
                    alt="ko-fi"
                />
                <span className="kofi-text">Support me</span>
            </div>

            {isOpen && (
                <div className="kofi-popup">
                    <div className="kofi-popup-header">
                        <a
                            href="https://ko-fi.com/hotleafjuice"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="kofi-link"
                        >
                            ko-fi.com/hotleafjuice
                        </a>
                        <button className="kofi-close" onClick={togglePopup}>
                            <svg width="15" height="15">
                                <line x1="2" y1="2" x2="13" y2="13" stroke="#000" strokeWidth="3" />
                                <line x1="13" y1="2" x2="2" y2="13" stroke="#000" strokeWidth="3" />
                            </svg>
                        </button>
                    </div>
                    <div className="kofi-popup-iframe-container">
                        <iframe
                            src="https://ko-fi.com/hotleafjuice/?hidefeed=true&widget=true&embed=true"
                            style={{ width: "100%", height: "100%", border: "none" }}
                            title="Ko-fi"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}