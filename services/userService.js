const uuid = require('uuid');
const db = require('../db');
const crypto = require('crypto');
const config = require('config');
const { recoverPersonalSignature } = require('eth-sig-util')
const { bufferToHex } = require('ethereumjs-util');

const createUser = async (address) => {
  const existingUser = await db.oneOrNone('SELECT * FROM users WHERE lower(address) = lower($1)', [address]);
  if (existingUser != null) {
    return existingUser;
  } else {
    const nonce = crypto.createHmac('sha256', config.get('NONCE_SECRET'))
      .update(address + uuid.v4())
      .digest('hex');

    const user = await db.one('INSERT INTO users (address, nonce) VALUES ($1, $2) RETURNING *', [address, nonce]);
    return user;
  }

};

const verifySignature = async (address, signature) => {
  const user = await db.oneOrNone('SELECT * FROM users WHERE lower(address) = lower($1)', [address]);
  if (user != null) {
    const msg = user.nonce;
    const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
    const sigAddress = recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature,
    });

    // The signature verification is successful if the address found with
    // sigUtil.recoverPersonalSignature matches the initial publicAddress
    if (address.toLowerCase() !== sigAddress.toLowerCase()) {
      return null;
    }
    
    const nonce = crypto.createHmac('sha256', config.get('NONCE_SECRET'))
      .update(address + uuid.v4())
      .digest('hex');
    await db.none('UPDATE users SET nonce = ($1) WHERE id = ($2)', [nonce, user.id]);
    return user;
  }

  return null;
};

module.exports = {
  createUser,
  verifySignature,
};
