import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import FileInput from "./components/FileInput";
import ImageCrop from "./components/ImageCrop";

function App() {
  const [image, setImage] = useState("");
  const [currentPage, setCurrentPage] = useState("choose-img");
  const [imgAfterCrop, setImgAfterCrop] = useState("");
  const [shadowType, setShadowType] = useState("");
  console.log(shadowType);

  // Invoked when new image file is selected
  const onImageSelected = (selectedImg) => {
    setImage(selectedImg);
    setCurrentPage("crop-img");
  };

  const setShadow = (e) => {
    setShadowType(e);
  };

  // Generating Cropped Image When Done Button Clicked
  const onCropDone = (imgCroppedArea) => {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext("2d");

    let imageObj1 = new Image();
    imageObj1.src = image;
    imageObj1.onload = function () {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );

      const dataURL = canvasEle.toDataURL("image/jpeg");

      setImgAfterCrop(dataURL);
      setCurrentPage("img-cropped");
    };
  };

  // Handle Cancel Button Click
  const onCropCancel = () => {
    setCurrentPage("choose-img");
    setImage("");
  };

  return (
    <div className="App">
      <div className="container">
        {currentPage === "choose-img" ? (
          <FileInput setImage={setImage} onImageSelected={onImageSelected} />
        ) : currentPage === "crop-img" ? (
          <ImageCrop
            image={image}
            onCropDone={onCropDone}
            onCropCancel={onCropCancel}
            setShadow={setShadow}
          />
        ) : (
          <div>
            <div style={{ margin: "23px" }}>
              <div className="after_crop">
                <img src={imgAfterCrop} className="cropped_img" alt="" />
              </div>
            </div>

            {!imgAfterCrop && (
              <button
                onClick={() => {
                  setCurrentPage("crop-img");
                }}
                className="btn"
              >
                Crop
              </button>
            )}

            <button
              onClick={() => {
                setCurrentPage("choose-img");
                setImage("");
              }}
              className="btn"
            >
              Go Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
