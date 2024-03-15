const express = require("express");
const router = express.Router();
const axios = require('axios');

router.post("/", async (req, res) => {
    const { city } = req.body;

    const OPENWM_API_KEY = require("../config").OPENWM_API_KEY;
    const OPENWM_API_URL = require("../config").OPENWM_API_URL;

    const requestURL = `${OPENWM_API_URL}/data/2.5/weather?q=${city}&APPID=${OPENWM_API_KEY}`;

    try {
        const response = await axios.get(requestURL);
        console.log(response);
        res.send({
            success: true,
            status: 200,
            response_type: "ephemeral",
            text: "Request successful",
        });
    } catch (error) {
        console.log(error);
        const status = error.response.status || 500;
        const message = error.response.data.message || error.message || "An error occured";
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

