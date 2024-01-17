import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = any

const SEARCH_API_URL = 'https://api.spotify.com/v1/search'
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { q } = req.query
  const apiPath = `${SEARCH_API_URL}?q=remaster${encodeURIComponent(
    ` artist:${q}`,
  )}`

  fetch(apiPath, {
    headers: { Authorization: `Bearer ${SPOTIFY_CLIENT_ID}` },
  })
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data)
    })
}
