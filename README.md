# URL Shortener - Powered by AWS ECS/Fargate, AWS Cognito, and MongoDB,

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)  
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

A simple Express web app that shortens long urls and provides custom QR codes for the newly created short url. This app uses EJS as the template engine to render 3 views:

- Index (This is where you create your short urls and desired QR codes)
- Dashboard (This is where you view the created URLs, clicks, and download the desired QR codes)
- Welcome (This is where you login using AWS Cognito)

The application currently uses MongoDB to store the following information:

- long url
- short url (generated or vanity)
- user email
- date
- clicks

## Pre-reqs

- AWS Cognito
- MongoDB
- Node (tested with version 18.11.0)
- NPM (tested with version 8.19.2)

## Installation

1. `npm install`
2. Run the command `cp .env_sample .env`
3. If you do not have a mongodb instance easily accessible, it's recommended you run it in a docker container by using the following command: `docker run -it -d -p 27017:27017 --name mongodb mongo`
   - If you choose this method, the value for `MONGODB` will be `mongodb://localhost:27017/urlShortener`
4. Enter the necessary information in the `config.json` and `.env` files located in the root of this project.

## Usage

- Ensure mongodb is running and you have the appropriate environment variable defined (I.E `MONGODB=mongodb://localhost:27017/urlShortener`)
- Run development server using: `npm run devStart`

## Testing

To be added...

### Docker Local

- Ensure the `config.json` and `.env` files are up to date with the correct variables.
- `docker-compose build --no-cache && docker-compose up`

### Docker with ECS as context

1. Create ECS context `docker context create ecs ecs`
2. Specify which Docker context to use `docker context use ecs`
3. Manually build the container image and push to repo of your choice I.E `docker build . -f Dockerfile -t jldeen/shorturl:v5 && docker push jldeen/shorturl:v5` (Note: If using macOS M1, remember to add the `--platform linux/amd64` flag to the build command)
4. Update `image` in `docker-compose-ecs.yml` with the image you just built and pushed to your repo
5. To deploy to ECS using Docker, run `docker compose -f docker-compose-ecs.yml up`

### Things to be done

- Support for filter / searching by by url/short
- Add Support for IaC / CICD - ideally we will use CDK or TF to stand up all necessary infra and deploy new changes easily to ECS
- General Code cleanup
- CSS could probably use cleaning up as well, as it stands right now, the site is not designed for mobile use
