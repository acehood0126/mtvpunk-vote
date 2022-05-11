import React, { useState, useEffect } from "react"
import imgPropIcon01 from "../assets/image/proposal-icon-01.svg"
import imgPropIcon02 from "../assets/image/proposal-icon-02.svg"
import imgPropIcon03 from "../assets/image/proposal-icon-03.svg"
import useContracts from "../shared/hooks/useContracts";
import { datetime2str, remainingTime } from "../utils";
import ProposalStatus from "./proposal-status";

const STATUS_ACCEPTED = 1
const STATUS_REJECTED = 2
const STATUS_NOT_APPLIED = 3

const ProposalItem = ({
    title, createdAt, leading, status
}) => {
    const { PROPOSAL_LIFETIME } = useContracts()
    const [timeRemaining, setTimeRemaining] = useState()

    useEffect(() => {
        const startedTime = new Date(createdAt)
        const endTime = new Date(startedTime.getTime() + PROPOSAL_LIFETIME)
        const now = new Date()
        if( createdAt ) {
            const remaining = endTime - now.getTime()
            if(remaining > 0) {
                setTimeRemaining(remainingTime(endTime - now.getTime()))
            } else {
                setTimeRemaining()
            }
        }
    }, [createdAt])
    

    return (
	    <div className="co-card proposal-card d-flex mb-3">
            <div className="co-card proposal-card-image-wrapper">
                {status === STATUS_ACCEPTED ? 
                    <img src={imgPropIcon01} /> :
                    status === STATUS_REJECTED ? 
                    <img src={imgPropIcon02} /> :
                    <img src={imgPropIcon03} />
                }
            </div>
            <div className="card-tag ms-3">
                <div className="proposal-card-title">
                    {title}
                </div>
                <div className="proposal-card-status">
                    Leading: {leading ? 'Yes' : 'No'}
                </div>

                <div className="d-flex align-items-center mt-lg-3 mt-1">
                    <ProposalStatus status={status} />
                    <div className="d-flex align-items-center ms-lg-3 ms-2">
                        <div className="proposal-timer">
                            <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 0C5.83143 0 0 5.83143 0 13C0 20.1686 5.83143 26 13 26C20.1686 26 26 20.1686 26 13C26 5.83143 20.1686 0 13 0ZM13.6191 24.7308V22.902C13.6191 22.5602 13.3418 22.2829 13 22.2829C12.6582 22.2829 12.3809 22.5602 12.3809 22.902V24.7308C6.38974 24.4163 1.58345 19.6099 1.2688 13.6187H3.09756C3.43934 13.6187 3.71667 13.3414 3.71667 12.9996C3.71667 12.6578 3.43934 12.3805 3.09756 12.3805L1.26901 12.3807C1.58344 6.38952 6.38963 1.58324 12.3806 1.26911V3.09787C12.3806 3.43966 12.6579 3.71699 12.9997 3.71699C13.3415 3.71699 13.6188 3.43966 13.6188 3.09787V1.26911C19.6099 1.58354 24.4162 6.38995 24.7309 12.3812H22.9021C22.5603 12.3812 22.283 12.6585 22.283 13.0003C22.283 13.3421 22.5603 13.6194 22.9021 13.6194H24.7309C24.4162 19.6106 19.61 24.4163 13.6188 24.731L13.6191 24.7308Z" fill="white"/>
                                <path d="M18.1815 12.3807H13.6193V5.47849C13.6193 5.1367 13.342 4.85938 13.0002 4.85938C12.6584 4.85938 12.3811 5.1367 12.3811 5.47849V12.9999C12.3811 13.3417 12.6584 13.619 13.0002 13.619H18.1815C18.5233 13.619 18.8007 13.3417 18.8007 12.9999C18.8007 12.6581 18.5233 12.3808 18.1815 12.3808V12.3807Z" fill="white"/>
                            </svg>
                        </div>

                        <span className="ms-lg-2 ms-1">
                            {timeRemaining ? `Ends in ${timeRemaining}` : 'Ended'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
  
export default ProposalItem;
  