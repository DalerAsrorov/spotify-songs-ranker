import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = any

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { q } = req.query
  res.status(200).json({ message: `Hello from Next.js!` })
}
