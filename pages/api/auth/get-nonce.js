import joi from "joi"
import userService from "../../../services/userService"

export default async function handler(req, res) {
    if (req.method === 'POST') {
        
        const schema = joi.object({
            address: joi.string().trim(true).required()
        });
        
        const { error } = schema.validate(req.body);
        if (error) {
        // TODO return better error messages
            return res.status(400).json({ errorMessage: 'error with input' });
        }

        const user = await userService.createUser(req.body.address.trim()); 
        return res.status(200).json({nonce: user.nonce});
    }
    
    return res.status(405).send({ message: 'Wrong request' })
}
  