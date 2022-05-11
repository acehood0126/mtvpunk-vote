import React, { useState, useEffect } from "react"
import useContracts from "../shared/hooks/useContracts"

const RecentProposal = ({ proposal }) => {
    
    const [ acceptedPercent, setAcceptedPercent] = useState(0)
    const { getVoting } = useContracts()
    
    useEffect(() => {
        async function fetchData() {
            const result = await getVoting(proposal.id)
            if(result)
                setAcceptedPercent(result.total === 0 ? 0 : result.accepted * 100 / result.total)
        }
        fetchData()
    }, [getVoting, proposal])
    
    return (
	    <div className="recent-proposal-card">
            <div className="card-content d-flex">
                <div className="">
                    <div className="recent-proposal-title">{proposal.name}</div>
                    <div className="recent-proposal-remaining">{proposal.finished_at}</div>
                </div>
            </div>
            <div className="card-tag">
                {acceptedPercent}%
            </div>
        </div>
    );
};
  
export default RecentProposal;