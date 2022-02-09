# cv-seminar-deployment-showcase

Two demo applications to showcase different methods of deploying a neural net.
Both do the same:
Drag and drop an image into them and they will show a prediction.

The thick client uses a MobileNet trained on ImageNet and runs entirely in the browser.
![The thick client](https://github.com/mx-e/cv-seminar-deployment-showcase/edit/main/thick_client.png)
The thin client connects to a python server. The server runs a VGG16 net trained on ImageNet for classification.
![The thick client](https://github.com/mx-e/cv-seminar-deployment-showcase/edit/main/thin_client.png)


### Usage

Both repos were built with create-react-app so 

```
yarn install && yarn run start
```
will start them. For build instructions etc. use the create-react app documentation.

To run the server, cd into the "backend" directory of the thin client. Install the dependencies from the pyproject.toml then run 

```
python ml_backend
```
to run the server.
