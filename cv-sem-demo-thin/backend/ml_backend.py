import uvicorn
from fastapi import FastAPI, File, UploadFile
from serve_model import predict, read_imagefile


app = FastAPI()
@app.post("/predict/image")
async def predict_api(file: UploadFile = File(...)):
    print(file.filename)
    image = read_imagefile(await file.read())
    prediction = predict(image)
    return prediction


if __name__ == "__main__":
    uvicorn.run(app, debug=True)