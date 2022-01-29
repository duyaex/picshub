import React,{useState,useEffect,useRef} from 'react'
import "./StartUp.css"
import {FaSearch} from 'react-icons/fa'
import {createApi} from 'unsplash-js'
import { debounce } from 'lodash'


import Loader from './Loader'
import Navbar from './Navbar'



const unsplash=createApi({
    accessKey:"18FHU4CKJ8ZctoM1KvguURmGZD5zkUnrFmQibcZdIhs",

})


export default function StartUp() {
  
    const [phrase, setPhrase] = useState('Company');
   
    const phraseRef=useRef(phrase)
    const [images, setImages] = useState([]);
    const imagesRef=useRef(images)
   const [fetching, setFetching] = useState(false)
   const fetchingRef=useRef(fetching)
   const onChange=(e)=>{
       setPhrase(e.target.value)
   }
   
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
   
   return (
       
        <>
      
       {/* TAGLINE: Free for All growth */}
<div className="upper">
               <Navbar/>
      <div className='tagline'> The best moments are non-recurring, <br /> Let us capture them for you...</div>
      <div title='Search free Stock photos' className="search">
          <input type="checkbox" id='check' />
      <div className="searchBox">
  
      <label onClick={()=>setPhrase("")} className='search-icon' htmlFor="check"><FaSearch size={26}  /></label>
      
      <input type="text"name='phrase' value={phrase} onChange={onChange} title='Free to Search Stock Photos '  placeholder='Search for free photos'/>
     
      </div>
      </div>
    
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
     
  

     
   


        </>
    )

    }