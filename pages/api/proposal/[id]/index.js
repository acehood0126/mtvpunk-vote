
import proposalService from "../../../../services/proposalService"

export default async function handler(req, res) {

    if (req.method === "GET") {
        // await runMiddleware(req, res, useAuth)
        const { id } = req.query;

        const proposal = await proposalService.getProposal(id)

        if(!proposal)
            return res.status(404).send({errorMessage: 'Not Found'})

        return res.status(200).send(proposal)
    }
    
    return res.status(405).send({ message: 'Wrong request' })
}
  