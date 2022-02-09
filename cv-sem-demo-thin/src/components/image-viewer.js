import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Spinner } from "@blueprintjs/core";
import {getPrediction} from '../api/api'

const ImageViewerWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ImageWrap = styled.div`
  margin-left: 5px;
  margin-right: 5px;
`;

const ImageViewer = ({ files }) => (
  <ImageViewerWrap>
    {files.map((file, i) => (
      <ImagePreview file={file} key={file.preview} />
    ))}
  </ImageViewerWrap>
);

const ImagePreview = ({ file }) => {
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
        <PredictionDisplay img={img.current} file={file} />
      )}
    </ImageWrap>
  );
};

const PredictionList = styled.div``;
const PredictionDisplay = ({ img, file }) => {
  const [predictions, setPrediction] = useState(null);
  useEffect(() => {
    const fetchClassification = async () => {
      console.log(file.preview)
      const pred = await getPrediction(file);
      setPrediction(pred.data);
    };
    setPrediction(null);
    fetchClassification();
  }, [img]);

  console.log(file, predictions);

  return (
    <PredictionList>
      {predictions ? (
        predictions.map((prediction) => (
          <div key={prediction.class}>
            <b>{prediction.class}</b>
            <p>{prediction.confidence}</p>
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </PredictionList>
  );
};

export default ImageViewer;
