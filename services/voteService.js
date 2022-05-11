const db = require('../db');

const voteProposal = async (user_id, proposal_id, vote) => {
  const proposal = await db.one('INSERT INTO votes (user_id, proposal_id, vote) VALUES ($1, $2, $3) RETURNING *', [user_id, proposal_id, vote]);
  return proposal;
};

const getVotesOfProposal = async (proposal_id) => {
  const votes = await db.manyOrNone("SELECT votes.id, votes.vote, votes.created_at AT TIME ZONE 'UTC' as created_at, users.address FROM votes LEFT JOIN users ON users.id = votes.user_id WHERE proposal_id=$1 ORDER BY created_at", [proposal_id]);
  return votes;
};

module.exports = {
  voteProposal,
  getVotesOfProposal
};
