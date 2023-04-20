import {useRef} from 'react'
import { IconButton } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { serverURL } from "../Api/ServerServices";
export default function ViewComponent(props){
    var data=props.data
    var pictures=JSON.parse(props.pictures)
    var images=Object.values(pictures)
    console.log(images)
    var rs=useRef()
   
    var settings = {
       dots: false,
       arrows: false,
       infinite: true,
       speed: 500,
       slidesToShow: 1,
       slidesToScroll: 1,
     };

     const showImages=()=>{
        return images.map((item)=>{
          return(<div>
           <img src={`${serverURL}/images/${item}`} style={{borderRadius:10}} width='100%' height='100%'/>
          </div>)
       
        })
       
        }
        const handleNext=()=>{
         
         rs.current.slickNext()
        }
       
       
        const handlePrev=()=>{
         
         rs.current.slickPrev()
        }
       
       return(
        <>
       
        <div style={{display:"inline-list-item",position:'relative',width:'20%',height:'20%',margin:20}}>
        <IconButton  onClick={handlePrev} variant="contained" style={{position:'absolute',top:150,left:10,zIndex:2,border:0,borderRadius:13,width:26,height:26,backgroundColor:'#FFFF',color:"#000",cursor:'pointer'}}>
        <KeyboardArrowLeftIcon  /></IconButton>
       
        
        <Slider {...settings} ref={rs}>
  
        {showImages()}
      </Slider>
      <IconButton onClick={handleNext} variant="contained" style={{position:'absolute',top:150,right:10,zIndex:2,border:0,borderRadius:13,width:26,height:26,backgroundColor:'#FFFF',color:"#000",cursor:'pointer'}}>
        <KeyboardArrowRightIcon  /></IconButton>
         <div style={{marginLeft:8, fontSize:14,fontWeight:'bolder'}}>{data.cityname},{data.statename}</div>
        </div>
        
        

       
       </>
       )

    }
   