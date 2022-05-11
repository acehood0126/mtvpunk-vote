import joi from "joi"
import proposalService from "../../../../services/proposalService"

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "POST") {
        const schema = joi.object({
            status: joi.number().required(),
        });
        
        const { error } = schema.validate(req.body);
        if (error) {
            // TODO return better error messages
            return res.status(400).json({ errorMessage: 'error with input' });
        }
        
        const { status } = req.body;

        await proposalService.setProposalFinished(id, status)

        return res.status(200).send({success: true})
    }
    
    return res.status(405).send({ message: 'Wrong request' })
}
  