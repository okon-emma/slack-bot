const crypto = require('crypto');

function verifySlackSignature(req, res, next) {
    const SLACK_SIGNING_SECRET = require("../config").SLACK_SIGNING_SECRET;
    const slackSignature = req.headers['x-slack-signature'];
    const slackTimestamp = req.headers['x-slack-request-timestamp'];
    const requestBody = JSON.stringify(req.body);

    const combinedString = `v0:${slackTimestamp}:${requestBody}`;
    const signature = `v0=${crypto.createHmac('sha256', SLACK_SIGNING_SECRET).update(combinedString, 'utf8').digest('hex')}`;

    try {
        if (crypto.timingSafeEqual(Buffer.from(signature, 'utf8'), Buffer.from(slackSignature, 'utf8'))) {
            next();
        } else {
            return res.send({
                success: false,
                status: 403,
                response_type: "ephemeral",
                text: "Invalid request signature!",
                error: "Forbidden"
            });
        }
    } catch (error) {
        console.error('Error verifying signature:', error);
        return res.send({
            success: false,
            status: 500,
            response_type: "ephemeral",
            text: "Error verifying signature!",
            error: "Internal server error"
        });
    }
}

module.exports = verifySlackSignature;
