[X] - FavIcon
[X] - Test sign up tomorrow
[X] - POST token exchange - Basic Auth fix?
[X] - Fix query string in URL
[X] - Fix logout string after logout and redirect
[X] - user support (using email?)
[ ] - Filter by url/short
[X] - QR Code Support
[ ] - UI Overhaul
[X] - Fix CSS/Scroll DIV
[ ] - RUN on ECS/Fargate
[ ] - ADD support for IaC / CICD
[X] - Troubleshoot 500 Internal Server error (JWT expired related? check logs)

# ECS URL Shortener - Powered by AWS ECS/Fargate

A simple Express application, using EJS as the template engine, to create short URLs for long links. The application uses MongoDB to store the following information:

- long url
- short url (generated or vanity)
- user email
- date
- clicks

### Run locally

### Run locally using Docker Compose

### Run on ECS using Docker Compose (with ECS as context)

# URL Shortener - Powered by AWS ECS/Fargate, AWS Cognito, and MongoDB,

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)  
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

A simple Express web app that shortens long urls. This app uses EJS as the template engine to render 3 views:

- Index (This is where you create your short urls and desired QR codes)
- Dashboard (This is where you view the created URLs, clicks, and download the desired QR codes)
- Welcome (This is where you login using AWS Cognito)

## Pre-reqs

- AWS Cognito
- MongoDB
- Node (tested with version 18.11.0)
- NPM (tested with version 8.19.2)

## Installation

1. `npm install`
2. Enter the necessary information in the `config.json` and `.env` files located in the root of this project.

## Usage

Run development server using: `npm run devStart`

## Testing

To be added...

### Getting Started

1. Create a fork and then clone your fork of the repo
2. Follow steps for [Installation](#installation)
3. Ensure project runs: [Usage](#usage)
4. Ensure tests pass: [Testing](#testing)
5. Implement your changes along with tests for your change
6. Push changes to your fork and submit a pull request

### Docker

1. Clone repository
2. Make sure you have execute permission on run.sh and Docker is installed (Linux, 'chmod +x run.sh' in the repo)
3. Run run.sh like ' ./run.sh '
4. Visit localhost:8000 and watch it run
