import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router";
import { Button, Row, Col } from "react-bootstrap";
import Proposal from "../proposal";
import Pagination from "../pagination";
import ProposalApi from "../../api/ProposalApi"
import { notificationWarning } from "../../utils/notification";

const MAX_PROPOSAL_PER_PAGE = 3;

const SectionProposal = () => {
    const router = useRouter();

    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [proposals, setProposals] = useState([])
    const [pagedProposals, setPagedProposals] = useState([])

    useEffect(() => {
      ProposalApi.listProposal()
        .then((resp) => {
          const _proposals = resp.data?.data
          if( _proposals ) {
            setProposals(_proposals)
            setPage(1)
          }
        })
    }, [])

    useEffect(() => {
      setPages(Math.floor((proposals.length - 1) / MAX_PROPOSAL_PER_PAGE + 1))
      setPagedProposals(proposals.slice((page - 1) * MAX_PROPOSAL_PER_PAGE, page * MAX_PROPOSAL_PER_PAGE))
    }, [page, proposals])

    const gotoSubmit = () => {
      router.push(`submit`)      
    }

    return (
	    <section id="section-vote" className="section-proposal">
            <Button variant="secondary" className="float-end" onClick={gotoSubmit}>Submit</Button>
            <h1 className="text-center">Proposal</h1>
            {pagedProposals.map((item) => (
            <Link href={`/proposal/${item.id}`} key={`proposal-${item.id}`}>
              <a>
                <Proposal title={item.name} createdAt={item.created_at} leading={true} status={item.status}/>
              </a>
            </Link>
            ))}
            {pages > 1 &&
            <div className="d-flex justify-content-center">
                <Pagination page={page} pages={pages} onChange={setPage} />
            </div>
            }
		</section>
    );
  };
  
  export default SectionProposal;
  