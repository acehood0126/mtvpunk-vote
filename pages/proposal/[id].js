import React, {useState, useEffect} from "react"
import { useRouter } from 'next/router'
import { Button, Row, Col, Spinner } from "react-bootstrap"
import ProposalStatus from "../../components/proposal-status"
import Account from "../../components/account"
import { formatMoney, datetime2str } from "../../utils"
import Progress from "../../components/progress"
import { server } from "../../config"
import useContracts from '../../shared/hooks/useContracts'
import useWeb3 from '../../shared/hooks/useWeb3'
import ProposalApi from "../../api/ProposalApi"
import { notificationWarning, notificationSuccess, notificationDanger } from "../../utils/notification"
import imgAvatar from "../../assets/image/avatar.png"
import imgStatus from "../../assets/image/status.svg"

const STATUS_NOT_APPLIED = 0
const STATUS_ACCEPTED = 1
const STATUS_REJECTED = 2
const PROPOSAL_LIFETIME = 3600 * 24 * 7 * 1000;  // 7 days

export async function getServerSideProps(context) {
    const res = await fetch(`${server}/api/proposal/${context.params.id}`)
    const data = await res.json()
    
    if( res.status !== 200 ) {
        return {
            notFound: true,
        };
    }

    const resVote = await fetch(`${server}/api/proposal/${context.params.id}/vote`)
    const votes = await resVote.json()
    
    if( res.status !== 200 ) {
        return {
            notFound: true,
        };
    }
    
    return {
        props: { proposal: data, votes: votes }, // will be passed to the page component as props
    }
}

export default function ProposalDetails({ proposal, votes }) {
    const router = useRouter()
    const { id } = router.query
    const { connected, walletAddress, handleConnect, waitForTransaction } = useWeb3()
    const { getTotalSupply, getVoting, getVoteOf, voteProposal, executeVoting } = useContracts()

    const [pending, setPending] = useState(false)
    const [pendingNo, setPendingNo] = useState(false)
    const [totalSupply, setTotalSupply] = useState()
    const [voteStatus, setVoteStatus] = useState()
    const [myVoteStatus, setMyVoteStatus] = useState()
    
    useEffect(async () => {
        const supply = await getTotalSupply()
        setTotalSupply(supply)
    }, [getTotalSupply])
    
    useEffect(async () => {
        const result = await getVoting(id)        
        if(result)
            setVoteStatus(result)
    }, [getVoting])

    useEffect(async () => {
        const result = await getVoteOf(id)
        setMyVoteStatus(result)
    }, [getVoteOf])
    
    // const exeVoting = () => {
    //     executeVoting(id)
    // }

    const voteAgree = () => {
        voteProp(STATUS_ACCEPTED)
    }

    const voteDisagree = () => {
        voteProp(STATUS_REJECTED)
    }

    const voteProp = (vote) => {
        if(!connected || !walletAddress) {
            return handleConnect()
        }
        if(vote === STATUS_ACCEPTED)
            setPending(true)
        else
            setPendingNo(true)
        
        voteProposal(id, vote).then((result) => {
            if(result?.hash){
                waitForTransaction(result.hash, 1000)
                .then(() => {
                    ProposalApi.vote(id, walletAddress, vote)
                    .then((resp) => {
                        setPending(false)
                        setPendingNo(false)
                        if(resp.data?.success) {
                            notificationSuccess("Success to vote proposal")
                            router.reload()
                        } else {
                            notificationDanger("Failed to save database")    
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        setPending(false)
                        setPendingNo(false)
                        notificationDanger("Failed to save database")
                    })
                })
                .catch((error) => { 
                    setPending(false)
                    setPendingNo(false)
                    notificationDanger("Failed transaction");
                })
            } else {
                setPending(false)
                setPendingNo(false)
                notificationDanger("Failed to vote proposal")    
            }
        })
        .catch((e) => {
            setPending(false)
            notificationDanger("Canceled to vote proposal")    
        })
    }

    return (
        <div className="detail-page my-lg-5 my-3">
            <Row className="gy-4">
                <Col xl={8}>
                    <div className="co-card p-4 pt-2 mb-2">
                        <div className="proposal-detail-title">
                            {proposal.name}
                        </div>
                        <Row className="gy-2 gx-lg-4">
                            <Col sm='auto'>
                                <ProposalStatus status={proposal.status} />
                            </Col>
                            <Col>
                                <Account prefix="Created by " address={proposal.address} />
                            </Col>
                        </Row>
                        <div className="proposal-detail-desc my-lg-3 my-2">
                            {proposal.description}
                        </div>
                        {myVoteStatus === STATUS_NOT_APPLIED && 
                        <div className="d-flex">
                            <Button variant="secondary" className="btn-vote me-3" onClick={voteAgree} disabled={pending || pendingNo}>
                                <span>Yes</span>
                                {pending && 
                                <Spinner animation="border" role="status" size="sm" className="ms-1" />
                                }
                            </Button>
                            <Button variant="secondary" className="btn-vote" onClick={voteDisagree} disabled={pending || pendingNo}>
                                <span>No</span>
                                {pendingNo && 
                                <Spinner animation="border" role="status" size="sm" className="ms-1" />
                                }
                            </Button>
                        </div>
                        }
                    </div>

                    <div className="co-card mb-2">
                        <div className="py-lg-3 py-2 px-lg-4 px-2 d-flex align-items-center">
                            <h3 className="me-2 mb-0">Votes</h3>
                            <div className="vote-badge">{votes?.length}</div>
                        </div>
                        <table className="vote-table">
                            <tbody>
                                {votes?.map((vote) => (
                                <tr key={`vote-${vote.id}`}>
                                    <td>
                                        <Account address={vote.address} />
                                    </td>
                                    <td className="text-end">
                                        {vote.vote === STATUS_ACCEPTED ? 'Agree' : 'Disagree'}
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Col>
                <Col xl={4}>
                    <div className="co-card-secondary mb-2">
                        <div className="co-card-title">Information</div>
                        <div className="co-card-body">
                            <div className="d-flex justify-content-between mb-2">
                                <div className="label-vote-status">Strategie(S)</div>
                                <div className="d-flex">
                                    <img src={imgAvatar} className="ms-2 round" width="40px" height="40px" />
                                    <img src={imgAvatar} className="ms-2 round" width="40px" height="40px"/>
                                    <img src={imgAvatar} className="ms-2 round" width="40px" height="40px"/>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <div className="label-vote-status">Voting System</div>
                                <div>Weighted voting</div>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <div className="label-vote-status">Start date</div>
                                <div>{datetime2str(proposal.created_at)}</div>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <div className="label-vote-status">End date</div>
                                <div>{datetime2str((new Date(proposal.created_at)).getTime() + PROPOSAL_LIFETIME)}</div>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <div className="label-vote-status">Minted NFTs</div>
                                <div>{formatMoney(totalSupply)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="co-card-secondary mb-2">
                        <div className="co-card-title">Vote</div>
                        <div className="co-card-body">
                            {voteStatus && 
                            <>
                                <Progress label="Agree" value={voteStatus.total === 0 ? 0 : voteStatus.accepted * 100 / voteStatus.total} />
                                <div className="mt-lg-3 mt-2">
                                    <Progress label="Disagree" value={voteStatus.total === 0 ? 0 : voteStatus.rejected * 100 / voteStatus.total}/>
                                </div>
                                </>
                            }
                        </div>
                    </div>

                    <div className="co-card-secondary mb-2">
                        <div className="co-card-title">Your Vote Status</div>
                        <div className="co-card-body text-center">
                            <img src={imgStatus} className="my-2" />
                            <div className="label-vote-status">
                                {
                                    myVoteStatus === STATUS_ACCEPTED ? 
                                    'You voted for this proposal' : 
                                    myVoteStatus === STATUS_REJECTED ? 
                                    'You rejected for this proposal' : 
                                    "You haven't applied yet"
                                }
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
