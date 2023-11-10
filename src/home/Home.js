import React, { useState } from "react";
import Editor from "../editor/Editor";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target.result);
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div className="home-container">
      {!selectedImage && (
        <div className="first-section">
          <h2 className="heading-large">Put Your Thoughts on Image</h2>
          <div className="upload-section">
            <h3 className="upload-heading">Upload Image</h3>
            <div className="input-group mb-3">
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faUpload} />
                </span>
              </div>
            </div>
          </div>
          <div className="proverbs-section">
            <h3 className="proverbs-heading">"Things you can do."</h3>
            <p className="proverb">"Create Art!"</p>
            <p className="proverb">"Add Visual Text To Photo"</p>
            <p className="proverb">"Customize Your Texts."</p>
          </div>
        </div>
      )}
      {selectedImage && <Editor selectedImage={selectedImage} />}
    </div>
  );
};

export default Home;
