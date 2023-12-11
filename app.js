const express = require('express')
const app = express()
const cors = require('cors')

const OpenAI = require('openai')

const openai = new OpenAI({
    apiKey: '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'
})

app.use(cors())

app.use(async (req, res, next) => {
    let messages = req.query.ques;

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: 'user', content: messages }
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

    res.status(200).json(response)
    console.log(response)
})

module.exports = app