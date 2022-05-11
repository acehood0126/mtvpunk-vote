import React, {useState, useEffect} from "react"
import { useRouter } from 'next/router'
import imgWall from "../assets/image/submit-wall.jpg"
import { Button, Spinner } from "react-bootstrap"
import { notificationWarning, notificationSuccess, notificationDanger } from "../utils/notification"
import ProposalApi from "../api/ProposalApi"
import useWeb3 from "../shared/hooks/useWeb3"
import useContracts from "../shared/hooks/useContracts"
import { remainingTime } from "../utils";

export default function Submit(props) {
    const router = useRouter()
    const [question, setQuestion] = useState('')
    const [description, setDescription] = useState('')

    const [pending, setPending] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [remainTime, setRemainTime] = useState(0)
    const { connected, walletAddress, handleConnect } = useWeb3()
    const { startVoting } = useContracts()

    useEffect(() => {
        ProposalApi.getRemainingTimeForNext()
        .then((resp) => {
          const _remainTime = resp.data?.data
          if(_remainTime > 0) {
            setModalVisible(true)
            setRemainingTime(_remainTime)
          }
        })
        .catch((e) => {
            setModalVisible(true)
        })
    }, [])

    const goBack = () => {
        router.back()
    }

    const handleSubmit = () => {
        if(!connected) {
            return handleConnect()
        }
        if(modalVisible) return;
        if(!walletAddress) return;

        if(question.length === 0) {
            return notificationWarning("Please input question")
        }

        if(description.length === 0) {
            return notificationWarning("Please input description")
        }
        setPending(true)
        
        startVoting(question).then((result) => {
            if(result){
                ProposalApi.createProposal(walletAddress, question, description)
                .then((resp) => {
                    setPending(false)
                    if(resp.data?.success) {
                        notificationSuccess("Success to submit proposal")
                        router.push(`proposal/${resp.data.id}`)
                    } else {
                        notificationDanger("Failed to submit proposal")    
                    }
                })
                .catch((error) => {
                    setPending(false)
                    notificationDanger("Failed to submit proposal")    
                })
            } else {
                setPending(false)
                notificationDanger("Failed to submit proposal")    
            }
        })
        .catch((e) => {
            setPending(false)
            notificationDanger("Canceled to submit proposal")    
        })
    }

    return (
        <div className="submit-page mb-5">
            {modalVisible &&
            <div className="co-modal">
                <div className="co-modal-mask" onClick={goBack}>
                </div>
                <div className="co-modal-container d-flex align-items-center flex-column">
                    <div className="submit-issue-logo">
                        <svg viewBox="0 0 119 119" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M59.5 119C92.3609 119 119 92.3609 119 59.5C119 26.6391 92.3609 0 59.5 0C26.6391 0 0 26.6391 0 59.5C0 92.3609 26.6391 119 59.5 119Z" fill="#7951EC"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M83.7523 113.752C84.6742 113.367 85.5863 112.959 86.4877 112.527C88.2553 111.628 89.9768 110.64 91.6457 109.569C93.3144 108.497 94.9285 107.342 96.4818 106.109C98.0362 104.876 99.528 103.567 100.951 102.185C102.376 100.802 103.731 99.3492 105.01 97.8313C106.286 96.3129 107.485 94.7316 108.604 93.0934C109.724 91.4568 110.763 89.7652 111.714 88.0249C112.667 86.2843 113.533 84.4972 114.307 82.6702C115.004 80.995 115.625 79.2888 116.166 77.5569L86.4877 47.8784C86.7576 47.5412 86.9266 47.1344 86.9751 46.7051C87.0235 46.2758 86.9495 45.8416 86.7616 45.4527C86.5736 45.0637 86.2794 44.7359 85.913 44.5071C85.5466 44.2782 85.1229 44.1578 84.6909 44.1597C84.1742 44.1613 83.6733 44.3378 83.2696 44.6603L50.221 70.1641L36.1505 56.0937C35.9686 55.8416 35.7372 55.6292 35.4705 55.4695C35.2038 55.3098 34.9073 55.2061 34.5992 55.1647C34.2911 55.1233 33.9778 55.1452 33.6784 55.2289C33.379 55.3126 33.0998 55.4564 32.8579 55.6516C32.6159 55.8467 32.4162 56.0891 32.271 56.364C32.1258 56.6389 32.0381 56.9405 32.0133 57.2504C31.9885 57.5602 32.027 57.8719 32.1267 58.1664C32.2263 58.4609 32.3848 58.732 32.5927 58.9632L47.8074 77.8072L83.7523 113.752Z" fill="#5F3FBA"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M84.6917 44.1592C84.1749 44.1609 83.674 44.3373 83.2703 44.6598L48.559 71.442L36.1512 56.0932C35.9693 55.8411 35.7379 55.6287 35.4712 55.469C35.2045 55.3093 34.9081 55.2056 34.6 55.1642C34.2919 55.1229 33.9785 55.1447 33.6792 55.2284C33.3798 55.3121 33.1006 55.4559 32.8586 55.6511C32.6166 55.8463 32.4169 56.0887 32.2717 56.3636C32.1265 56.6384 32.0388 56.94 32.014 57.2499C31.9892 57.5598 32.0278 57.8715 32.1274 58.1659C32.227 58.4604 32.3856 58.7315 32.5934 58.9627L47.8081 77.8068L86.0772 48.2802C86.463 47.9916 86.7477 47.5885 86.891 47.1286C87.0343 46.6686 87.0288 46.1751 86.8753 45.7185C86.7217 45.2618 86.428 44.8653 86.0359 44.5853C85.6438 44.3053 85.1734 44.1562 84.6917 44.1592Z" fill="white"/>
                        </svg>
                    </div>
                    <div className="my-3">
                        You have already posted today... <br/>
                        {remainTime ? `${remainingTime(remainTime)} until next submit` : ''}
                    </div>
                    <Button variant="secondary" onClick={goBack} style={{width: '200px'}}>
                        Ok
                    </Button>
                </div>
            </div>
            }
            <img src={imgWall} className="submit-wall-image"/>
            <div className="input-label mb-lg-4 mb-1">The question You Would like to ask the community.</div>
            <input 
                className="co-input" 
                placeholder="Enter Your question here"
                maxLength={200}  
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <div className="input-status mt-lg-4 mt-2 mb-lg-1 mb-3 ">
                ({question.length} out of 200 characters)
            </div>
            <div className="">
                <div className="input-label mb-1">Description(markdawn)</div>
                <div className="mb-lg-4 mb-3">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
                </div>
            </div>
            <textarea
                className="co-textarea"
                placeholder="A brief description of your question."
                maxLength={7000}
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div className="input-status mt-lg-4 mt-2 mb-lg-1 mb-3 ">
                ({description.length} out of 7000 characters)
            </div>

            <Button variant="secondary" onClick={handleSubmit} disabled={pending}>
                <span>Submit Proposals</span>
                {pending && 
                <Spinner animation="border" role="status" size="sm" className="ms-1">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                }
            </Button>
        </div>
    )
}
