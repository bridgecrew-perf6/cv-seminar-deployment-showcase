import React  from "react";
import styled from "styled-components";
import ImageClassifier from "./components/image-classifier";

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const App = () => {
  return (
    <AppWrap>
        <ImageClassifier />
    </AppWrap>
  );
};

export default App;
