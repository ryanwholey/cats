# Cats #
All 25+ things you'll ever need to know about cats!

#Local deployment#
- Clone down the repo
- `npm install`
- `webpack`
- `npm start`
- application to be served from http://localhost:8000

#Development server#
- clone and install from above
- `npm start`
- `npm run dev`
- application to be served from http://localhost:4000

#Deployment#
- clone and install as above
- `npm run deploy`
- `docker build -t <your image name here> .`
- `docker run -p 8000:8000 -it <your image name here>` 
- application to be served from http://<docker-machine ip>:8000

Make sure if you are going back to development after production that you run webpack again! The production build process changes the host address in the bundle.js.

Thanks for playing!! 