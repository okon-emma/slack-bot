# Running Slack Bot API

This guide will walk you through the process of running the Slack Bot API using Docker. It covers installing the necessary dependencies, configuring environment variables and setting up ngrok for exposing the app to the internet.

## Prerequisites

- Docker installed on your machine. You can download and install Docker from [https://www.docker.com/get-started](https://www.docker.com/get-started).
- ngrok installed on your machine. You can install ngrok using Chocolatey on Windows or Homebrew on macOS.

### Installing ngrok

For Windows:
```
choco install ngrok
```
For macOS:
```
brew install ngrok/ngrok/ngrok
```
### Configuring ngrok

After installing ngrok, add your authentication token by running the following command:
```
ngrok authtoken YOUR_AUTH_TOKEN` 
```
Replace `YOUR_AUTH_TOKEN` with your ngrok authentication token, which you can obtain from the ngrok website.

## Setting up Environment Variables

Before running the Slack bot API, you need to set up environment variables. Start by renaming the `sample.env` file to `.env` after cloning the repository. The `.env` file contains sensitive environment variables, including API keys and secrets.
```
mv sample.env .env
```
Edit the `.env` file and replace the demo values with your actual credentials.
```
nano .env
```
### Supported Environment Variables

-   **OPENWM_API_KEY**: This API key is used for accessing the OpenWeatherMap API. OpenWeatherMap provides weather data, including current weather, forecasts, and historical data, for any location on Earth. You can sign up for an API key on the OpenWeatherMap website.
    
-   **SLACK_VERIFICATION_TOKEN**: This token is required for verifying requests from Slack. When the Slack bot receives requests, it uses this token to ensure that the requests are coming from Slack and are intended for the bot. It helps prevent unauthorized access to the bot's functionality. However, it is now deprecated in favor of using the Slack signing secret (`SLACK_SIGNING_SECRET`).
    
-   **SLACK_SIGNING_SECRET**: This secret is used for signing requests from Slack. Slack uses this secret to generate signatures for requests, which the bot can then verify to ensure the authenticity and integrity of incoming messages and events. It helps prevent tampering with or spoofing of messages sent to the bot.

### On Linux

In Linux, you can set environment variables using the `export` command in the terminal. For example:
```
export OPENWM_API_KEY=YOUR_OPENWM_API_KEY
export SLACK_VERIFICATION_TOKEN=YOUR_SLACK_VERIFICATION_TOKEN
export SLACK_SIGNING_SECRET=YOUR_SLACK_SIGNING_SECRET
```
This sets the environment variables `OPENWM_API_KEY`, `SLACK_VERIFICATION_TOKEN`, and `SLACK_SIGNING_SECRET` to the specified values. These variables will be available to the current terminal session and any processes spawned from it.

### On Windows

In Windows, you can set environment variables using the `set` command in the Command Prompt. For example:
```
set OPENWM_API_KEY=YOUR_OPENWM_API_KEY
set SLACK_VERIFICATION_TOKEN=YOUR_SLACK_VERIFICATION_TOKEN
set SLACK_SIGNING_SECRET=YOUR_SLACK_SIGNING_SECRET
```
Setting environment variables directly on the terminal is particularly useful when testing the code locally using `node app.js`. It allows you to provide configuration and sensitive information to your Node.js API during runtime.

## Running the API with Docker

### Using Dockerfile

To run the API using Dockerfile, navigate to the project root directory and build the Docker image:
```
docker build -t slack-bot .
```
Then run the Docker container with the following command, replacing the environment variables with your actual values:
```
docker run -d \
  -e OPENWM_API_KEY=YOUR_OPENWM_API_KEY \
  -e SLACK_VERIFICATION_TOKEN=YOUR_SLACK_VERIFICATION_TOKEN \
  -e SLACK_SIGNING_SECRET=YOUR_SLACK_SIGNING_SECRET \
  --name slack-bot \
  slack-bot
  ```
  
### Using Docker Compose

The repository contains a `docker-compose.yml` file that fetches its environment variables from the `.env` file. To run the API using Docker Compose, execute the following command in the project root directory:
```
docker-compose up -d --build
```
This command will build the Docker image and start the container defined in the `docker-compose.yml` file.