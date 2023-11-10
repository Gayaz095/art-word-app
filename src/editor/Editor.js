import React, { useState, useEffect, useRef } from "react";
import "./Editor.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowDown,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

const Editor = ({ selectedImage }) => {
  const [editedImage, setEditedImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [text, setText] = useState("");
  const canvasRef = useRef(null);
  const [textColor, setTextColor] = useState("#000000");
  const [textSize, setTextSize] = useState(70);
  const [textX, setTextX] = useState(250);
  const [textY, setTextY] = useState(250);
  const imageRef = useRef(null);
  const fontOptions = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "sans-serif",
    "Courier New",
    "Cursive",
    "Fantasy",
  ];
  const [selectedFont, setSelectedFont] = useState("Arial");

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTextColorChange = (e) => {
    const color = e.target.value;
    setTextColor(color);
  };

  const handleFontChange = (e) => {
    const selectedFont = e.target.value;
    setSelectedFont(selectedFont);
  };

  const handleTextSizeIncrease = () => {
    setTextSize(textSize + 5);
  };

  const handleTextSizeDecrease = () => {
    setTextSize(textSize - 5);
  };

  const handleMoveTextHorizontally = (direction) => {
    if (direction === "left") {
      setTextX(textX - 10);
    } else if (direction === "right") {
      setTextX(textX + 10);
    }
  };

  const handleMoveTextVertically = (direction) => {
    if (direction === "up") {
      setTextY(textY - 10);
    } else if (direction === "down") {
      setTextY(textY + 10);
    }
  };

  useEffect(() => {
    if (selectedImage) {
      setIsImageUploaded(true);
    } else {
      setIsImageUploaded(false);
    }
  }, [selectedImage]);

  useEffect(() => {
    if (selectedImage) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = selectedImage;
      img.onload = () => {
        canvas.width = 500;
        canvas.height = 500;
        const offsetX = Math.max((500 - img.width) / 2, 0);
        const offsetY = Math.max((500 - img.height) / 2, 0);
        ctx.drawImage(
          img,
          offsetX,
          offsetY,
          img.width,
          img.height,
          0,
          0,
          500,
          500
        );
        ctx.save();
        ctx.font = `${textSize}px ${selectedFont}`;
        ctx.textAlign = "center";
        ctx.fillStyle = textColor;
        ctx.fillText(text, textX, textY);
        setEditedImage(canvas.toDataURL("image/jpeg"));
      };
    }
  }, [selectedImage, text, textSize, textColor, textX, textY, , selectedFont]);

  const handleSaveImage = () => {
    if (window.confirm("Are you sure you want to save the image?")) {
      const adjustedTextX = textX - 250;
      const adjustedTextY = 250 - textY;
      // Save image to localStorage
      const imageDetails = {
        imageName: "edited_image",
        imageWidth: 500,
        imageHeight: 500,
        textCoordinates: { x: adjustedTextX, y: adjustedTextY },
        createdAt: new Date().toLocaleString(),
        fontSize: textSize,
        fontFamily: selectedFont,
        imageType: "jpeg",
      };
      localStorage.setItem("editedImageDetails", JSON.stringify(imageDetails));
      localStorage.setItem("editedImage", editedImage);
      // Save image to local device
      const link = document.createElement("a");
      link.download = "edited_image.jpeg";
      link.href = editedImage;
      link.click();
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the data? This action cannot be undone."
      )
    ) {
      setText("");
      setTextSize(70);
      setTextColor("#000000");
      setTextX(250);
      setTextY(250);
    }
  };

  return (
    <div className="container">
      <h2 className="heading-large">Edit Your Text To Whatever You Like!</h2>
      <a href="/" className="btn btn-primary mb-3">
        Back to Home
      </a>
      <div className="editor-section row">
        <div className="image-container col-md-6" ref={imageRef}>
          {!isImageUploaded && (
            <input
              type="file"
              className="form-control mt-3"
              onChange={handleImageChange}
            />
          )}
          {editedImage && (
            <img
              src={editedImage}
              alt="Edited"
              className="img-fluid edited-image mt-3"
            />
          )}
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
        {isImageUploaded && (
          <div className="edit-controls col-md-6">
            <div className="text-input mb-3">
              <label>Text:</label>
              <input
                type="text"
                value={text}
                onChange={handleTextChange}
                className="form-control mb-3"
              />
            </div>
            <div className="text-color">
              <label>Text Color:</label>
              <input
                type="color"
                value={textColor}
                onChange={handleTextColorChange}
                className="form-control mb-3"
              />
              <div>Color: {textColor}</div>
            </div>
            <div className="font-dropdown mb-3">
              <label>Font Family:</label>
              <select
                value={selectedFont}
                onChange={handleFontChange}
                className="form-select">
                {fontOptions.map((font, index) => (
                  <option key={index} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-size-buttons mb-3">
              <span>Change Text Size:</span>
              <button
                onClick={handleTextSizeIncrease}
                className="btn btn-primary me-2">
                <i className="bi bi-zoom-in"></i>
              </button>
              <button
                onClick={handleTextSizeDecrease}
                className="btn btn-primary">
                <i className="bi bi-zoom-out"></i>
              </button>
            </div>
            <div className="text-placement">
              <div className="text-move-buttons mb-3">
                <div>Position of text:</div>
              </div>
              <div className="text-move-arrows mb-3">
                <button
                  onClick={() => handleMoveTextHorizontally("left")}
                  className="btn btn-secondary me-2">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button
                  onClick={() => handleMoveTextHorizontally("right")}
                  className="btn btn-secondary me-2">
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <button
                  onClick={() => handleMoveTextVertically("up")}
                  className="btn btn-secondary me-2">
                  <FontAwesomeIcon icon={faArrowUp} />
                </button>
                <button
                  onClick={() => handleMoveTextVertically("down")}
                  className="btn btn-secondary">
                  <FontAwesomeIcon icon={faArrowDown} />
                </button>
              </div>
            </div>

            <div className="save-button">
              <div>Save Image</div>
              <button onClick={handleSaveImage} className="btn btn-success">
                <FontAwesomeIcon icon={faSave} />
                Save
              </button>
            </div>

            <div className="reset-button mb-3">
              <div>Clear editing, to start from beginning</div>
              <button onClick={handleReset} className="btn btn-danger">
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
