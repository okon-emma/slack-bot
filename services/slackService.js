const axios = require('axios');

class SlackService {
    constructor(token) {
        this.token = token;
        this.apiUrl = 'https://slack.com/api/';
    }

    async sendMessage(channel, message) {
        try {
            const response = await axios.post(
                `${this.apiUrl}chat.postMessage`,
                {
                    channel,
                    text: message
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.data.ok) {
                console.log('Message sent successfully');
                return true;
            } else {
                console.error('Failed to send message:', response.data.error);
                return false;
            }
        } catch (error) {
            console.error('Error sending message:', error);
            return false;
        }
    }
}

module.exports = SlackService;

// const SlackService = require('./slackService');
// const slack = new SlackService('token');
// slack.sendMessage('#general', 'This is a test message!');