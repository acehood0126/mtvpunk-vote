import { runMiddleware } from "../../../../middleware"
import { useAuth } from "../../../../middleware/auth"
import voteService from "../../../../services/voteService"
import joi from "joi"

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "GET") {
        const votes = await voteService.getVotesOfProposal(id)

        if(!votes)
            return res.status(404).send({errorMessage: 'Not Found'})

        return res.status(200).send(votes)
    } else if (req.method === "POST") {
        await runMiddleware(req, res, useAuth)
        
        const schema = joi.object({
            address: joi.string().trim(true).required(),
            vote: joi.number().required(),
        });
        
        const { error } = schema.validate(req.body);
        if (error) {
            // TODO return better error messages
            return res.status(400).json({ errorMessage: 'error with input' });
        }
        
        const { address, vote } = req.body;

        if(req.address !== address)
            return res.status(401).json({ errorMessage: 'error with jwt' });

        const voteId = await voteService.voteProposal(req.userId, id, vote)

        return res.status(200).send({success: true, id: voteId})
    }
    
    return res.status(405).send({ message: 'Wrong request' })
}
  