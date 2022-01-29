import React,{useState,useEffect,useRef} from 'react'
import "./Car/car.css"
import UN from './Car/Car image/UN.jpg';
import {createApi} from 'unsplash-js'
import { debounce } from 'lodash'
// import LogoCom from '';
import Loader from '../Loader'
import Navbar from '../Navbar';

const unsplash=createApi({
    accessKey:"KSqiRiaG4XHem_l8trEA9Uvk3jM0qd5CnkZId0VBdD4",

})

export default function Universe() {
    const [phrase, setPhrase] = useState("Universe");
   
    const phraseRef=useRef(phrase)
    const [images, setImages] = useState([]);
    const imagesRef=useRef(images)
   const [fetching, setFetching] = useState(false)
   const fetchingRef=useRef(fetching)
//    const onChange=(e)=>{
//        setPhrase(e.target.value)
//    }
   
    function getUnsplashImages(query,page=1){
         console.log(phrase)
        setFetching(true)
        fetchingRef.current=true
        return new Promise((resolve,reject)=>{
            unsplash.search.getPhotos({
                query,
                page,
                perPage:20,

            }).then(result=>{
                setFetching(false)
                fetchingRef.current=false
                resolve(result.response.results.map(result=>result.urls.small));
               
            })
        });
    }



    useEffect(()=>{
        phraseRef.current=phrase;
        if(phrase !==''){
            debounce(()=>{
                setImages([])
                getUnsplashImages(phrase,1)
                .then(images=>{
                    setImages(images)
                    imagesRef.current=images
                });
            },1000)();
          
        }

    },[phrase]);
    function handleScroll(e){
       const{scrollHeight,scrollTop,clientHeight}= e.target.scrollingElement;
       const isBottom=scrollHeight-scrollTop<=clientHeight;
       if(isBottom && !fetchingRef.current){
        getUnsplashImages(phraseRef.current, imagesRef.current.length/20+1)
        .then(newImages=>{
            imagesRef.current=[...imagesRef.current, ...newImages];
           setImages(imagesRef.current); 
        })

       }
    }

    useEffect(()=>{
        document.addEventListener("scroll",handleScroll,{passive:true})
        return()=>document.removeEventListener("scroll",handleScroll);
    },);
  return( <>
<Navbar/>
<div className="CarCall"><img src={UN} alt="" /></div>
<div className="CC">
  <h2>UNIVERSE PHOTOGRAPHY </h2>
  <p>Adopt the pace of universe. His secret is patience</p>
  </div>
  <div className='render-div my-3 '>
{images.length>0 && images.map(url=>(
    <img  className='rendering-img' key={url} src={url} alt=''/>
))}
   
    </div>
    <div>
          {fetching && <Loader/>
             }
      </div>
     
  
  
  
  
  
  
  
  
  </>)
}
