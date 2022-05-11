const db = require('../db');

const createProposal = async (user_id, title, description) => {
  const proposal = await db.one('INSERT INTO proposals (user_id, name, description) VALUES ($1, $2, $3) RETURNING *', [user_id, title, description]);
  return proposal;
};

const listProposals = async () => {
  const proposals = await db.manyOrNone("SELECT proposals.id, proposals.name, proposals.status, proposals.created_at AT TIME ZONE 'UTC' as created_at, users.address FROM proposals LEFT JOIN users ON users.id = proposals.user_id ORDER BY created_at");
  return proposals;
};

const getProposal = async (id) => {
  const proposal = await db.oneOrNone("SELECT proposals.id, proposals.name, proposals.description, proposals.status, proposals.created_at AT TIME ZONE 'UTC' as created_at, users.address FROM proposals LEFT JOIN users ON users.id = proposals.user_id WHERE proposals.id=$1", [id]);
  
  return proposal;
};

const getActiveProposals = async () => {
  const proposals = await db.manyOrNone("SELECT id, created_at AT TIME ZONE 'UTC' as created_at FROM proposals WHERE finished_at is NULL");
  return proposals;
};

const getRecentPassed = async () => {
  const proposals = await db.manyOrNone("SELECT proposals.id, proposals.name, proposals.created_at AT TIME ZONE 'UTC' as created_at, proposals.finished_at AT TIME ZONE 'UTC' as finished_at, users.address FROM proposals LEFT JOIN users ON users.id = proposals.user_id WHERE status=1 ORDER BY finished_at DESC LIMIT 3");
  return proposals;
};

const setProposalFinished = async (id, status) => {
  await db.none("UPDATE proposals SET status=$1, finished_at=now() AT TIME ZONE 'UTC' WHERE id=$2", [status, id]);
};

const DAY = 3600 * 24 * 1000;

const getRemainTimeToSubmit = async (user_id) => {
  const proposal = await db.oneOrNone("SELECT created_at AT TIME ZONE 'UTC' as created_at FROM proposals WHERE user_id=$1 ORDER BY created_at DESC LIMIT 1", [user_id]);
  if(proposal) {
    const remainingTime = DAY - (new Date().getTime() - new Date(proposal.created_at).getTime()) 
    
    return remainingTime > 0 ? remainingTime : 0
  } else {
    return 0;
  }
};

module.exports = {
  createProposal,
  listProposals,
  getProposal,
  setProposalFinished,
  getActiveProposals,
  getRecentPassed,
  getRemainTimeToSubmit
};
