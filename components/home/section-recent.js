import React, {useState, useEffect} from "react"
import Image from "next/image"
import { Button, Row, Col } from "react-bootstrap";
import RecentProposal from "../recent-proposal";
import ProposalApi from "../../api/ProposalApi";

const SectionRecent = () => {
    
    const [proposals, setProposals] = useState([])
    
    useEffect(() => {
        ProposalApi.getRecentPassed()
          .then((resp) => {
            const _proposals = resp.data?.data
            if( _proposals ) {
              setProposals(_proposals)
            }
          })
      }, [])
  
    return (
	    <section className="section-recent">
            <h1 className="text-center">Recent Passed Proposal</h1>
            <Row className="gy-3 gx-4">
                {proposals?.map((item) => (
                <Col lg={4} key={`recent-${item.id}`}>
                    <RecentProposal proposal={item} />
                </Col>
                ))}
            </Row>
		</section>
    );
  };
  
  export default SectionRecent;
  