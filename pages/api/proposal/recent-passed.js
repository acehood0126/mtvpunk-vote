import proposalService from "../../../services/proposalService"

export default async function handler(req, res) {

    if (req.method === "GET") {
        const proposals = await proposalService.getRecentPassed()
        return res.status(200).send({data: proposals})
    }
    
    return res.status(405).send({ message: 'Wrong request' })
}
  