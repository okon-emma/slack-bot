const express = require("express");
const router = express.Router();
const axios = require('axios');

const authenticateToken = require('../middlewares/authMiddleware');
const validateCity = require('../utils/validateCity');
const rateLimiter = require('../middlewares/rateLimiter');


router.post("/", rateLimiter, authenticateToken, async (req, res) => {
    const city = req.body.text;
    console.log("Content of request body =>>", req.body);

    if (!validateCity(city)) {
        return res.send({
            success: false,
            status: 400,
            response_type: "ephemeral",
            text: "Invalid city parameter",
            error: "Validation failed"
        });
    }

    const OPENWM_API_KEY = require("../config").OPENWM_API_KEY;
    const OPENWM_API_URL = require("../config").OPENWM_API_URL;

    const requestURL = `${OPENWM_API_URL}/data/2.5/weather?q=${city}&APPID=${OPENWM_API_KEY}`;

    try {
        const response = await axios.get(requestURL);

        const name = response.data.name;
        const temp = response.data.main.temp;
        const description = response.data.weather[0].description;
        const wind = response.data.wind.speed;
        const humidity = response.data.main.humidity;

        slack.sendMessage('#test', 'This is a test message!');

        // console.log(response);
        res.send({
            success: true,
            status: 200,
            response_type: "ephemeral",
            blocks: [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Weather Report for " + name,
                        "emoji": true
                    }
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": "*Description:* " + description
                        },
                        {
                            "type": "mrkdwn",
                            "text": "*Temperature:* " + temp
                        },
                        {
                            "type": "mrkdwn",
                            "text": "*Wind Speed:* " + wind + "m/s"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "*Humidity:* " + humidity + "%"
                        }
                    ]
                }
            ]
        });
    } catch (error) {
        // console.log(error);
        let status = 500
        let message = "Internal server error"

        if (error.response) {
            status = error.response.status;
            message = error.response.data.message || "An error occured";
        }

        res.send({
            success: false,
            status,
            response_type: "ephemeral",
            text: "Unable to get weather info. Try again later!",
            error: message
        });
    }
});

module.exports = router;

