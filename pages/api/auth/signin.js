// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import joi from "joi"
import jwt from "jsonwebtoken"
import config from "config"
import userService from "../../../services/userService"

export default async function handler(req, res) {
  if (req.method === 'POST') {

    const schema = joi.object({
      address: joi.string().trim(true).required(),
      signature: joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      // TODO return better error messages
      return res.status(400).send();
    }

    const user = await userService.verifySignature(req.body.address.trim(), req.body.signature.trim());
    if (user === null) {
      return res.status(401).send();
    }

    // TODO set expire time to be 24 hours
    const token = jwt.sign({ id: user.id, address: req.body.address }, config.get('JWT_SECRET'));

    return res.status(200).json({ success: true, jwt: token });
  }
  
  return res.status(405).send({ message: 'Wrong request' })
}
