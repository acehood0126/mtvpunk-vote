const jwt = require('jsonwebtoken');
const config = require('config');

export const useAuth = (req, res, next) => {
  if(req?.headers === undefined) 
    return res.status(401).send();

  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send();
  }

  const token = authorization.split(' ')[1];

  jwt.verify(token, config.get('JWT_SECRET'), async (error, payload) => {
    if (error) {
      return res.status(403).send();
    }

    const { id, address } = payload;
    req.userId = id;
    req.address = address;

    return next();
  });

  return res.status(401);
};
