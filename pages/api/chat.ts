// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  console.log(req.body.chat)
  // console.log(req.body.firstName)
  res.status(200).send({ message: "done" })
  // const response = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: "Say this is a test",
  //   max_tokens: 7,
  //   temperature: 0,
  // });
  // console.log(response.data)
  // res.status(200).json({ name: 'John Doe' })
}
