import React from 'react';
import "./Card.css";

const Card = ({ message }) => {
    // if(message.title){
        return (
            <div className='card'>
                <a href={message.url}>{message.title}</a>
                <p>{message.description}</p>
            </div>
        )
    // }else {
    //     return (
    //         <div className='card'>
    //             {/* <a href={message.url}>{message.title}</a> */}
    //             <p>{message}</p>
    //         </div>
    //     )
    // }
    
}

export default Card