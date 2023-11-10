import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const View = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <h2 className="heading-large">Edited Image</h2>
      <div className="image-container">
        <img
          src={location.state.editedImage}
          alt="Edited"
          className="img-fluid edited-image mt-3"
        />
      </div>
      <button onClick={handleGoBack} className="btn btn-primary mt-3">
        Back to Editor
      </button>
    </div>
  );
};

export default View;
