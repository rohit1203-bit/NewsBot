import React from 'react';
import "./Query.css";

const Query = ({text}) => {
    return (
        <div className='query' style={{ marginLeft: "auto" }}>
            {
                text
            }
        </div>
    )
}

export default Query