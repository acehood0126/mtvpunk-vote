import React from "react"

const STATUS_ACCEPTED = 1
const STATUS_REJECTED = 2
const STATUS_NOT_APPLIED = 3

const ProposalStatus = ({
    status
}) => {

    const getStatus = () => {
        if(status === STATUS_NOT_APPLIED) return 'Not Applied'
        if(status === STATUS_ACCEPTED) return 'Passed'
        if(status === STATUS_REJECTED) return 'Rejected'
        
        return 'Active'
    }
    return (
	    <div className="proposal-status-tag text-center">
            {getStatus()}        
        </div>
    );
};
  
export default ProposalStatus;
  