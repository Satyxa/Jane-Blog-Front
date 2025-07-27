import React from 'react';
import './App.css';
import {Main} from "./main/Main";
import {PersonNotAnAd} from "./personNotAnAd/personNotAnAd";
import {WhyFreeFall} from "./WhyFreeFall/WhyFreeFall";
import {PostsList} from "./post/postsList/postsList";
import {CreateContent} from "./AdminPages/CreateContent";
import {Post} from "./post/post";
import {

    Routes,
    Route,
    BrowserRouter
} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import {ManagePost } from "./AdminPages/ManagePost";
import {ManageSlider} from "./AdminPages/ManageSlider";
function App() {
  return (
      <AuthProvider>
    <BrowserRouter>
        <div className="App">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/not-ad" element={<PersonNotAnAd />} />
                <Route path="/why-freefall" element={<WhyFreeFall />} />
                <Route path="/posts" element={<PostsList />} />
                <Route path="/admin-page" element={<CreateContent />} />
                <Route path="/admin-page/manage-post" element={<ManagePost />} />
                <Route path="/admin-page/manage-slider" element={<ManageSlider />} />
                <Route path="/posts/:id" element={<Post />} />
            </Routes>
        </div>
    </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
