
import BaseApi from './BaseApi';

class ProposalApi extends BaseApi {

  listProposal() {
    return this.instance.get(
      "/api/proposal"
    );
  }
  
  getProposal(id) {
    return this.instance.get(
      `/api/proposal/${id}`
    );
  }

  createProposal(address, title, description) {
    return this.instance.post(
      `/api/proposal`, {
        address, title, description
      }
    );
  }

  vote(id, address, vote) {
    return this.instance.post(
      `/api/proposal/${id}/vote`, {
        address, vote
      }
    );
  }

  getRecentPassed() {
    return this.instance.get(
      `/api/proposal/recent-passed`
    );
  }

  getRemainingTimeForNext() {
    return this.instance.get(
      `/api/proposal/remain-time`
    );
  }
}
  
export default new ProposalApi();