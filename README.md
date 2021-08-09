# Udagram Image Filtering Application

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

The project contains only the API for udagram
Backend RESTful API - Node-Express application

## Monolith to Microservices 
* Udagram is being extended to contain a comments service
- User can add a feed to comment 
- User can get comments related to feed 
- A comment can be added to a feed

### Routes to access comments service
- To fetch a comment - GET `http://localhost:8080/api/v0/comment/:feed_id`
- To create a comment - POST `http://localhost:8080/api/v0/comment/:feed_id`

## Steps to run
### Run without docker
* To run a particular service locally
* cd into the service directory e.g `cd feeds`
* npm install
* npm run dev

### Run with docker
* To run a particular service locally
* cd into the service directory e.g `cd feeds`
* docker run -p 8080:8080 feeds

* Please make use the postman collection to test the routes 
