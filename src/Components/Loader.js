import React from 'react'
import circles from '../img/circles.gif';
export default function Loader() {
    return (
        <div style={{display:"flex",justifyContent:"center"}}>
           <img src={circles} alt="" />
        </div>
    )
}
