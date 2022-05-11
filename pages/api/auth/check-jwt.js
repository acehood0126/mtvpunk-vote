import { runMiddleware } from "../../../middleware"
import { useAuth } from "../../../middleware/auth"
import joi from "joi"

export default async function handler(req, res) {
    if (req.method === 'POST') {
        
        await runMiddleware(req, res, useAuth)

        const schema = joi.object({
            address: joi.string().trim(true).required()
        });
        
        const { error } = schema.validate(req.body);
        if (error) {
        // TODO return better error messages
        return res.status(400).json({ errorMessage: 'error with input' });
        }

        const { address } = req.body;

        if(req.address !== address)
            return res.status(401).json({ errorMessage: 'error with jwt' });

        return res.status(200).json({ success: true });
    }
    
    return res.status(405).send({ message: 'Wrong request' })
}
  