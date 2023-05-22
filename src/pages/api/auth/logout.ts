import { NextApiRequest, NextApiResponse } from 'next'
import { destroyCookie } from 'nookies'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Delete the user's cookie
    destroyCookie(null, 'token')

    // Resend a response successfully
    res.status(200).json({ message: 'You are logged out' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred while logging out' })
  }
}

export default handler
