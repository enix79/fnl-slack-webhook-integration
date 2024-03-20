const axios = require('axios');
const { getPersonalData, personalDataToBlockKit } = require('./utils');
require('dotenv').config();

exports.handler = async function (event) {
    console.log(event);
    const WEBHOOK_URL = process.env.WEBHOOK_URL;
    const data = JSON.parse(event.body).fields.filter(
        (field) => field.value !== null
    );
    const personalData = getPersonalData(data);
    console.log(personalData);
    const personalDataBlockKit = personalDataToBlockKit(personalData);
    console.log(personalDataBlockKit);
    const result = {
        text: 'Danny Torrence left a 1 star review for your property.',
        blocks: [...personalDataBlockKit],
    };
    await axios.post(WEBHOOK_URL, result);
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
        },
        body: event,
    };
};
