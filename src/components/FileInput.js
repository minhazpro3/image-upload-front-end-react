import React, { useRef } from "react";
import "../style/style.css";

const FileInput = ({ onImageSelected }) => {
  const inputRef = useRef();

  const handleOnChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function (e) {
        onImageSelected(reader.result);
      };
    }
  };

  const onChooseImg = () => {
    inputRef.current.click();
  };
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleOnChange}
        style={{ display: "none" }}
      />
      <h3>Image Crop and Upload!</h3>
      <button className="choose_btn" onClick={onChooseImg}>
        Choose from device
      </button>
    </div>
  );
};

export default FileInput;
