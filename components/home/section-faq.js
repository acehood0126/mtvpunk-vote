import React, {useState, useEffect} from "react"

const dataQA = [
    {
        title: "What is MTVPunks DAO?",
        description: `
            <div class="qa-desc-item">MTVPunks DAO is a community-led entity with no central authority.</div>
            <div class="qa-desc-item">It is fully autonomous and transparent.</div>
            <div class="qa-desc-item">MTVPunks DAO runs with the DAO members.</div>
        `
    },
    {
        title: "How can be a MTVPunks member?",
        description: "If you own MTVPunks NFT, you can be a MTPunks DAO member."
    },
    {
        title: "Who can propose suggestion?",
        description: "	The member who has more than 20 NFTs can post proposal."
    },
    {
        title: "How many proposals can be posted in a day?",
        description: "20 proposals will be posted in a day and a member can post a proposal in a day."
    },
]

const SectionFAQ = () => {
    
    const [arrVisible, setArrVisible] = useState([]);

    useEffect(() => {
        let newData = [];
        for(let i = 0; i < dataQA.length; i++){
            newData.push(false)
        }
        setArrVisible(newData);
    }, [])

    return (
        <section id="faq" className="section-faq">
            <h1 className="text-center">FAQ</h1>
            <div className="qa-section">
                {dataQA.map((item,idx) => (
                    <div key={`faq-${idx}`} className="py-lg-2 py-1">
                        <div 
                            className={`d-flex justify-content-between align-items-center questions ${arrVisible[idx] ? 'open' : ''}`}
                            onClick={() => {
                                let newData = [...arrVisible];
                                newData[idx] = !newData[idx];
                                setArrVisible(newData);
                            }}
                        >
                            <div dangerouslySetInnerHTML={{__html: item.title }}></div>
                            
                            <div className="arrow">
                                <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L9 9L1 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <div 
                            className="qa-description"
                            style={{
                                    'display': arrVisible[idx] ? 'block' : 'none',
                                    'opacity': arrVisible[idx] ? 1 : 0,
                                }}
                            dangerouslySetInnerHTML={{__html: item.description }}
                        ></div>
                    </div>
                ))}
            </div>
        </section>
    );
  };
   
  
  export default SectionFAQ;
  