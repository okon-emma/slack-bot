const SLACK_VERIFICATION_TOKEN = require("../config").SLACK_VERIFICATION_TOKEN;
const SLACK_APP_ID = require("../config").SLACK_APP_ID;

function authenticateToken(req, res, next) {
    const token = req.body.token;
    const api_app_id = req.body.api_app_id;

    if (token !== SLACK_VERIFICATION_TOKEN || api_app_id !== SLACK_APP_ID) {
        return res.send({
            success: false,
            status: 401,
            response_type: "ephemeral",
            text: "Access denied. Conact system administrator!",
            error: "Unauthorized"
        });
    }

    next();
}

module.exports = authenticateToken;
