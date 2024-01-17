import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = any

const SPOTIFY_TOKEN_API = 'https://accounts.spotify.com/api/token'
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET_ID = process.env.SPOTIFY_CLIENT_SECRET_ID

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  fetch(SPOTIFY_TOKEN_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET_ID}`,
  }).then(async (response) => {
    const data = await response.json()
    res.json(data)
  })
}
