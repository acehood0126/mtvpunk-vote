import React from "react"
import imgAvatar from "../assets/image/avatar.png"
import { shortWalletAddr } from "../utils";

const Account = ({
    prefix,
    address
}) => {
    return (
	    <div className="co-account d-flex align-items-center">
            <img src={imgAvatar} />
            <span>
                {prefix}
                {shortWalletAddr(address)}
            </span>
        </div>
    );
};
  
export default Account;
  