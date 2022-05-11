import React from "react"
import { ProgressBar } from "react-bootstrap";

const Progress = ({
    label,
    value
}) => {
    return (
	    <div className="co-progress">
            <div className="d-flex justify-content-between mb-1">
                <div className="co-progress-label">{label}</div>
                <div className="co-progress-value">{value.toFixed(2)}%</div>
            </div>
            <ProgressBar variant="primary" now={value} />
        </div>
    );
};
  
export default Progress;
  