import { useState, useRef } from "react";
import "../App.css";

const Upload = ({ onDrop }) => {
  const [over, setover] = useState(false);
  const $input = useRef(null);

  const onDropEvent = (e) => {
    e.preventDefault();
    e.persist();
    setover(false);
    onDrop(e.dataTransfer.files);
  };
  return (
    <div
      onClick={() => {
        $input.current.click();
      }}
      onDrop={onDropEvent}
      onDragOver={(e) => {
        e.preventDefault();
        setover(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setover(false);
      }}
      className={over ? "upload-container over" : "upload-container"}
    >
      <h2>Upload files here!</h2>
    </div>
  );
};

export { Upload };
