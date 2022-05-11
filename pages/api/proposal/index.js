import { runMiddleware } from "../../../middleware"
import { useAuth } from "../../../middleware/auth"
import proposalService from "../../../services/proposalService"
import joi from "joi"

export default async function handler(req, res) {

    if (req.method === "GET") {
        const proposals = await proposalService.listProposals()
        return res.status(200).send({data: proposals})
    } else if (req.method === 'POST') {
        await runMiddleware(req, res, useAuth)

        const schema = joi.object({
            address: joi.string().trim(true).required(),
            title: joi.string().trim(true).required(),
            description: joi.string().trim(true).required()
        });
        
        const { error } = schema.validate(req.body);
        if (error) {
            // TODO return better error messages
            return res.status(400).json({ errorMessage: 'error with input' });
        }
        
        const { address, title, description } = req.body;

        if(req.address !== address)
            return res.status(401).json({ errorMessage: 'error with jwt' });

        const remainTime = await proposalService.getRemainTimeToSubmit(req.userId)
        if(remainTime > 0)
            return res.status(400).json({ errorMessage: 'need to wait to submit next proposal' });

        const id = await proposalService.createProposal(req.userId, title, description)
        return res.status(200).send({success: true, id: id})
    }
    
    return res.status(405).send({ message: 'Wrong request' })
}
  