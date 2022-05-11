
import BaseApi from './BaseApi';

class AuthApi extends BaseApi {

  signin(address, signature) {
    return this.instance.post(
      "/api/auth/signin", { address, signature }
    );
  }
  
  checkJwt(address, jwt) {
    return this.instance.post(
      "/api/auth/check-jwt", { address },
      {
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
      }
    );
  }
  
  getNonce(address) {
    return this.instance.post(
      "/api/auth/get-nonce", { address }
    );
  }
  
}
  
export default new AuthApi();