import { useState } from "react";
import { Upload } from "./upload";
import ImageViewer from "./image-viewer";

const useImgs = (initialState = [], maxFiles = 3) => {
  const [state, setstate] = useState(initialState);
  const addImgs = (newDrops) => {
    const newImgs = newDrops
      .map((file) => {
        if (file.type.includes("image")) {
          file.preview = URL.createObjectURL(file);
          return file;
        }
        return null;
      })
      .filter((elem) => elem !== null);

    setstate([...newImgs, ...state].slice(0, maxFiles));
  };
  return [state, addImgs];
};

const ImageClassifier = () => {
  const [imgs, addImgs] = useImgs([]);
  const onFileDrop = (files) => {
    console.log(files);
    if (files.length > 0) {
      addImgs([...files]);
    }
  };
  return (
    <div>
      <h2>Thin Client</h2>
      <Upload onDrop={onFileDrop} />
      <ImageViewer files={imgs} />
    </div>
  );
};

export default ImageClassifier;
