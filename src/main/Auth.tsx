import authorization from "../assets/authorization.svg";
import menu from "../assets/menu.svg";
import React, {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";
import axios from "axios";
import './Auth.css'
export const Auth = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const { setAuthenticated } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [recoveryCodeSent, setRecoveryCodeSent] = useState(false);
    const [recoveryCode, setRecoveryCode] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    // useEffect(() => {
    //     const checkAuth = async () => {
    //         try {
    //             const res = await axios.get(`${SERVER_URL}/auth/me`, {
    //                 withCredentials: true,
    //             });
    //             setAuthenticated(true);
    //         } catch (e) {
    //             setAuthenticated(false);
    //         }
    //     };
    //
    //     checkAuth();
    // }, []);

    const handleLogout = async () => {
        try {
            await axios.post(`${SERVER_URL}/auth/logout`, {}, {
                withCredentials: true,
            });
            setAuthenticated(false); // сброс авторизации
            setIsMenuVisible(false); // закрыть меню
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const handleSend = async () => {
        try {
            if (isReset && !recoveryCodeSent) {
                await axios.post(`${SERVER_URL}/auth/recovery-code`, { email });
                setRecoveryCodeSent(true);
                return;
            }

            if (isReset && recoveryCodeSent) {
                await axios.post(`${SERVER_URL}/auth/new-password`, {
                    email,
                    newPassword,
                    recoveryCode,
                });
                alert("Password updated!");
                setIsReset(false);
                setRecoveryCodeSent(false);
                setNewPassword("");
                setRecoveryCode("");
                return;
            }

            const loginResponse = await axios.post(`${SERVER_URL}/auth/login`, {
                email,
                password,
            }, { withCredentials: true });

            if(loginResponse.status === 200) {
                setAuthenticated(true);
                setIsPopupVisible(false);
                setEmail("");
                setPassword("");
                setIsRegister(false);
                setIsReset(false);
            }
        } catch (err) {
            alert("Cannot send auth request");
        }
    };

    const { isAuthenticated, logout } = useAuth();

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
        setIsRegister(false); // сброс при открытии
        setIsReset(false);
    };

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
        setIsOpen(prev => !prev);
    };

    const toggleReset = () => {
        setIsReset(true);
    };

    const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLDivElement).classList.contains("authorization-popup-wrapper")) {
            setIsPopupVisible(false);
            setIsRegister(false);
            setIsReset(false);
        }
    };
    return (
        <div>
            <div className="authorization-box">
                {!isAuthenticated && (
                    <button className="authorization-button" onClick={togglePopup}>
                        <img src={authorization} alt="" width="40px" height="48px" />
                    </button>
                )}

                {isAuthenticated && (
                    <>
                        <button className="menu-button" onClick={toggleMenu}>
                            <img
                                src={menu}
                                alt="Menu"
                                width="40px"
                                height="48px"
                                className={`menu-icon ${isOpen ? "rotated" : ""}`}
                            />
                        </button>
                    </>
                )}
            </div>

            {isMenuVisible && (
                <div className="menu-wrapper">
                    <div className="menu-box">
                        <div className="menu-items-box"><a className="menu-items-box__item" href="/admin-page">Create new content</a></div>
                        <div className="menu-items-box"><a className="menu-items-box__item" href="/admin-page/manage-post">Update/Delete Post</a></div>
                        <div className="menu-items-box"><a className="menu-items-box__item" href="/admin-page/manage-slider">Add / Delete Slider Image</a></div>
                        <div className="menu-items-box" onClick={handleLogout}>Logout</div>
                    </div>
                </div>
            )}

            {isPopupVisible && (
                <div className="authorization-popup-wrapper" onClick={handleWrapperClick}>
                    <div className="authorization-popup-container">
                        <div className="authorization-popup-warning-box">
                            <p className="authorization-popup-warning-text">
                                Only admin can create an account!
                            </p>
                        </div>

                        <div className="authorization-popup">
                            <form className="authorization-popup-form" onSubmit={(e) => e.preventDefault()}>
                                <label className="authorization-popup-label">Email</label>
                                <input
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="authorization-popup-input"
                                    type="text"
                                />

                                {!isReset && (
                                    <>
                                        <label className="authorization-popup-label">Password</label>
                                        <input
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            className="authorization-popup-input"
                                            type="password"
                                        />
                                    </>
                                )}

                                {isReset && recoveryCodeSent && (
                                    <>
                                        <label className="authorization-popup-label">Code</label>
                                        <input
                                            value={recoveryCode}
                                            onChange={e => setRecoveryCode(e.target.value)}
                                            className="authorization-popup-input"
                                            type="text"
                                        />

                                        <label className="authorization-popup-label">New password</label>
                                        <input
                                            value={newPassword}
                                            onChange={e => setNewPassword(e.target.value)}
                                            className="authorization-popup-input"
                                            type="password"
                                        />
                                    </>
                                )}
                            </form>
                        </div>

                        <div className="authorization-popup-send-button-box">
                            <button className="authorization-popup-send" onClick={handleSend}>Send</button>
                        </div>

                        <div className="authorization-popup-buttons-box">
                            <button
                                className="authorization-popup-recovery-password"
                                onClick={toggleReset}
                            >
                                Reset password
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}