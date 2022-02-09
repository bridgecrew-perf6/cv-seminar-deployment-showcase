import axios from "axios"

const request = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
});

const getPrediction = async (image) => {
  let blob = await fetch(image.preview).then(r => r.blob());
  const formData = new FormData();
  formData.append('file', blob);
  return request.post('/predict/image', formData,
    {headers: { "Content-Type": "multipart/form-data" }})
}

export {getPrediction}