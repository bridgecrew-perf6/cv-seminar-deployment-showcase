import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Spinner } from "@blueprintjs/core";
import { image } from "@tensorflow/tfjs";

const ImageViewerWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ImageWrap = styled.div`
  margin-left: 5px;
  margin-right: 5px;
`;

const ImageViewer = ({ files, model }) => (
  <ImageViewerWrap>
    {files.map((file, i) => (
      <ImagePreview file={file} model={model} key={file.preview} />
    ))}
  </ImageViewerWrap>
);

const ImagePreview = ({ file, model }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const img = useRef(null);

  console.log(file);
  return (
    <ImageWrap>
      <img
        height={200}
        width={200}
        style={{ objectFit: "cover" }}
        key={file.name + "file"}
        src={file.preview}
        ref={img}
        alt="your file"
        onLoad={() => setImgLoaded(true)}
      />
      {imgLoaded && img.current && (
        <PredictionDisplay model={model} img={img.current} />
      )}
    </ImageWrap>
  );
};

const PredictionList = styled.div``;
const PredictionDisplay = ({ model, img }) => {
  const [predictions, setPrediction] = useState(null);
  useEffect(() => {
    const fetchClassification = async () => {
      const pred = await model.classify(img);
      setPrediction(pred);
    };
    setPrediction(null);
    fetchClassification();
  }, [img]);

  return (
    <PredictionList>
      {predictions ? (
        predictions.map((prediction) => (
          <div key={prediction.className}>
            <b>{prediction.className}</b>
            <p>{Math.round(prediction.probability * 100) / 100}</p>
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </PredictionList>
  );
};

export default ImageViewer;
