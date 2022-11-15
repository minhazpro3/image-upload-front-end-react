import React, { useState } from "react";
import Cropper from "react-easy-crop";
import "../style/style.css";
import love from "./images/user_image_frame_1.png";
import square from "./images/user_image_frame_2.png";
import circle from "./images/user_image_frame_3.png";
import rectangle from "./images/user_image_frame_4.png";

const ImageCrop = ({ image, onCropDone, onCropCancel, setShadow }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(null);

  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(2.5 / 3.5);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    console.log(croppedAreaPixels);
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <div className="cropper">
      <div style={{ display: "relative" }} className="cropper_img">
        <Cropper
          image={image}
          aspect={aspectRatio}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              width: "40%",
              height: "40%",
              backgroundColor: "#fff",
              marginTop: "40px",
              alignContent: "center",
              margin: "auto",
              display: "flex",
            },
          }}
        />
      </div>

      <div style={{ display: "absolute" }} className="shadow_frame">
        <div className="shadow_btn" onClick={() => setShadow("")}>
          <h3 className="original_btn">Original</h3>
        </div>
        <div className="shadow_btn" onClick={() => setShadow("love")}>
          <img width={"30px"} src={love} alt="" />
        </div>
        <div className="shadow_btn" onClick={() => setShadow("square")}>
          <img width={"30px"} src={square} alt="" />
        </div>
        <div className="shadow_btn" onClick={() => setShadow("circle")}>
          <img width={"30px"} src={circle} alt="" />
        </div>
        <div className="shadow_btn" onClick={() => setShadow("rectangle")}>
          <img width={"30px"} src={rectangle} alt="" />
        </div>
      </div>
      <div className="action-btns">
        <button className="btn btn-outline" onClick={onCropCancel}>
          Cancel
        </button>

        <button
          className="btn"
          onClick={() => {
            onCropDone(croppedArea);
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ImageCrop;
