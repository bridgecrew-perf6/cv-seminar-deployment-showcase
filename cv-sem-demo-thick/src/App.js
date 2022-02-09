import React, { useEffect, useState } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import { Spinner } from "@blueprintjs/core";
import styled from "styled-components";
import ImageClassifier from "./components/image-classifier";

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const SpinnerBox = styled.div`
  margin-top: 100px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const App = () => {
  const [model, setModel] = useState(null);
  useEffect(() => {
    const getModel = async () => {
      const m = await mobilenet.load();
      setModel(m);
    };
    getModel();
  }, []);

  return (
    <AppWrap>
      {model ? (
        <ImageClassifier model={model} />
      ) : (
        <SpinnerBox>
          <Spinner />
          <br />
          <p>Loading Model</p>
        </SpinnerBox>
      )}
    </AppWrap>
  );
};

export default App;
