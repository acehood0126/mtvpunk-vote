import proposalService from "../../../services/proposalService"
import { runMiddleware } from "../../../middleware"
import { useAuth } from "../../../middleware/auth"

export default async function handler(req, res) {

    if (req.method === "GET") {
        await runMiddleware(req, res, useAuth)

        const time = await proposalService.getRemainTimeToSubmit(req.userId)

        return res.status(200).send({data: time})
    }
    
    return res.status(405).send({ message: 'Wrong request' })
}
  