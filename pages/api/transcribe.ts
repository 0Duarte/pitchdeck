import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'
import { Configuration, OpenAIApi } from 'openai'

export const config = {
  api: {
    bodyParser: false,
  },
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing form data' })
      }

      const file = files.file as formidable.File
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' })
      }

      const filePath = file.filepath
      const fileBuffer = fs.readFileSync(filePath)

      const transcription = await openai.createTranscription(
        fileBuffer as any,
        'whisper-1'
      )

      fs.unlinkSync(filePath) // Remove the temporary file

      res.status(200).json({ transcript: transcription.data.text })
    })
  } catch (error) {
    console.error('Error in transcribe API:', error)
    res.status(500).json({ error: 'An error occurred during transcription' })
  }
}
