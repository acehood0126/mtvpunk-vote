import React from "react"
import Image from "next/image"
import { Button, Row, Col } from "react-bootstrap";

const SectionHowTo = () => {
    return (
	    <section className="section-how-to">
            <h1 className="text-center">How to vote?</h1>
            <div className="co-card home-vote-card-decorator decorator1 d-lg-block d-none"></div>
            <div className="co-card home-vote-card-decorator decorator2 d-lg-block d-none"></div>
            <Row className="gy-3 gx-4">
                <Col lg={6}>
                    <div className="co-card home-vote-card d-flex align-items-center">
                        <div className="co-card home-vote-card-header d-flex justify-content-center align-items-center">
                            <svg width="109" height="109" viewBox="0 0 109 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M47.6638 40.8492C58.9277 40.8492 68.0884 31.6884 68.0884 20.4246C68.0884 9.16072 58.9277 0 47.6638 0C36.4 0 27.2393 9.16072 27.2393 20.4246C27.2401 31.6893 36.4033 40.8492 47.6638 40.8492ZM47.6638 6.8075C55.1736 6.8075 61.2803 12.9142 61.2803 20.424C61.2803 27.9337 55.1736 34.0404 47.6638 34.0404C40.154 34.0404 34.0474 27.9337 34.0474 20.424C34.0482 12.915 40.1549 6.8075 47.6638 6.8075Z" fill="white"/>
                                <path d="M81.6993 54.4651C80.2768 54.4651 78.8906 54.608 77.5263 54.8195C69.084 48.0178 58.5582 44.2532 47.6575 44.2532C21.3786 44.2532 0 65.6297 0 91.9107V92.387C0.0855764 101.507 7.72039 108.932 17.0208 108.932H78.2941C78.8011 108.932 79.2783 108.881 79.7578 108.833C80.4013 108.88 81.0447 108.932 81.6986 108.932C96.7141 108.932 108.932 96.7144 108.932 81.6979C108.932 66.6814 96.7182 54.4642 81.6986 54.4642L81.6993 54.4651ZM17.0221 102.123C11.4426 102.123 6.86103 97.7243 6.81019 92.353L6.80938 91.9098C6.80938 69.3862 25.1333 51.0602 47.659 51.0602C55.4304 51.0602 62.9805 53.3037 69.4695 57.4019C60.5849 61.8923 54.4677 71.0836 54.4677 81.6967C54.4677 89.8321 58.0723 97.1271 63.747 102.121L17.0221 102.123ZM81.6993 102.123C70.4355 102.123 61.2748 92.9619 61.2748 81.698C61.2748 70.4341 70.4355 61.2734 81.6993 61.2734C92.9632 61.2734 102.124 70.4341 102.124 81.698C102.124 92.9619 92.9632 102.123 81.6993 102.123Z" fill="white"/>
                                <path d="M91.9112 78.2927H85.1031V71.4846C85.1031 69.6019 83.5813 68.0808 81.6994 68.0808C79.8167 68.0808 78.2956 69.6026 78.2956 71.4846V78.2927H71.4875C69.6048 78.2927 68.0837 79.8145 68.0837 81.6964C68.0837 83.5791 69.6056 85.1002 71.4875 85.1002H78.2956V91.9083C78.2956 93.791 79.8174 95.3121 81.6994 95.3121C83.5821 95.3121 85.1031 93.7902 85.1031 91.9083V85.1002H91.9112C93.7939 85.1002 95.315 83.5784 95.315 81.6964C95.3158 79.8145 93.794 78.2927 91.9112 78.2927Z" fill="white"/>
                            </svg>
                        </div>
                        <div className="px-4">
                            Sign up with metamask wallet 
                        </div>
                    </div>
                </Col>
                <Col lg={6}>
                    <div className="co-card home-vote-card d-flex align-items-center">
                        <div className="co-card home-vote-card-header d-flex justify-content-center align-items-center">
                            123
                        </div>
                        <div className="px-4">
                            Vote for your preferred proposal
                        </div>
                    </div>
                </Col>
            </Row>
		</section>
    );
  };
  
  export default SectionHowTo;
  