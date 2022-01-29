import React from 'react'
import "./StartUp.css"
import Wallpapers from '../img/Wallpapers.jpg'
import Wonderland from '../img/Wonderland.jpg'
import Nature from '../img/Nature.jpg'
import  Food from '../img/Food.jpg'
import Universe from '../img/Universe.jpg'
import Animals from '../img/Animals.jpg'
import Cars from '../img/Cars.jpg'

import Navbar from './Navbar'
import { Link } from 'react-router-dom'
export default function Discover() {
    
    return (
        <>
        <Navbar/>
     <h2 className='container' style={{marginTop:"5vh",fontSize:"2.5rem"}} id='Pop'>Popular Collections</h2>
     <p style={{textAlign:"center", fontWeight:"bold"}}> A Designate Collection Of Photos</p>

     <h3 className='my-3 mx-3'>
         Photography Topics
     </h3>

<div  id="collection">
    <div className="collect">
    <Link to="/discover/nature"> <img   className='dcover my-2' src={Nature} alt="Nature" /></Link>
    <div className="textover">
             <div className="title"> Nature Photography</div>
           
        </div>   
    </div>
   
    
    <div className="collect ">
    <Link to="/discover/universe"> <img   className='dcover my-2' src={Universe} alt="Universe" /></Link>

        <div className="textover">
             <div className="title">Universe Photography</div>
            
        </div>
        
    </div>

    <div className="collect">
    <Link to="/discover/food"> <img   className='dcover my-2' src={Food} alt="Food" /></Link>

        <div className="textover">
             <div className="title">Food Photography</div>
          
        </div>
        
    </div>

    <div className="collect">
    <Link to="/discover/wonderland"> <img   className='dcover my-2' src={Wonderland} alt="Wonderland" /></Link>

        <div className="textover">
             <div className="title">Wonderland Photography</div>
           
        </div>
        
    </div>






<div className="collect">
<Link to="/discover/wildlife"> <img   className='dcover my-2' src={Animals} alt="Wildlife" /></Link>


        <div className="textover">
             <div className="title">Wildlife Photography</div>
             
        </div>
        
    
    

  
        
    
</div>



<div className="collect">
<Link to="/discover/painting"> <img   className='dcover my-2' src={Wallpapers} alt="Paintings" /></Link>


        <div className="textover">
             <div className="title">Paintings Park</div>
            
        </div>
        
    </div>
    
<div className="collect">
<Link to="/discover/car"> <img   className='dcover my-2' src={Cars} alt="Car" /></Link>


        <div className="textover">
             <div className="title">Cars Collection</div>
            
        </div>
        
    </div>
    </div>
        </>
    )
}
