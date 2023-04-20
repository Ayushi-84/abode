import React,{useEffect,useState} from "react"
import { Grid } from "@mui/material"
import { useStyles } from "./VendorPropertiesSplashScreenCss"
import { getData,PostData,serverURL } from "../Api/ServerServices"
import { Button } from "@mui/material"
import { useNavigate,useLocation } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import VendorNavigation from "../MyComponents/VendorNavigation"
import PrevNext from "../MyComponents/PrevNext"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function VendorPropertiesSplashScreen(props)
{   var theme=useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    var navigate=useNavigate()
    var dispatch=useDispatch()
    var location=useLocation()
    var vendorDBData=useSelector(state=>state.vendorDBData)
    var vendorDB=Object.values(vendorDBData)[0]
    //alert("Properties:"+JSON.stringify(vendorDB))
    var propertyid=''
    if(vendorDB.propertyid!=null)
    { propertyid=vendorDB.propertyid}

    var vendorData=useSelector(state=>state.vendor)
    var vendor=Object.values(vendorData)[0]
    var propertyData=useSelector(state=>state.properties)
    var property=Object.values(propertyData)[0]

    try{
     propertyid=property.propertyid
    }
    catch(e){}

    console.log("VENDOR DATA",vendor)
    
   // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx",location)

    const [properties,setProperties]=useState([])
    const [propertyId,setPropertyId]=useState('')
   
    const [selectedPropertyId,setSelectedPropertyId]=useState(propertyid)
const fetchAllProperties=async()=>{

    var result =await getData('typesofproperties/displayallproperties')
      setProperties(result.data)



}

const handleShadow=(item)=>{
    setSelectedPropertyId(item.propertyid)
    dispatch({type:'ADD_PROPERTIES',payload:[vendor.mobileno,item]})


}
const showProperties=()=>{
return properties.map((item)=>{

return(

<div variant="secondary" onClick={()=>handleShadow(item)}  className={item.propertyid===selectedPropertyId?classes.boxShade:classes.box} >

{item.propertytype}

<div style={{display:'flex', justifyContent:'flex-end',width:'inherit',marginRight:50 }} >

<img src={`${serverURL}/images/${item.propertyicon}`} width="57" height="60" style={{borderRadius:'6px',}} />

</div>




</div>



)


})



}


useEffect(function(){

fetchAllProperties()


},[])


    const classes=useStyles()


return(
<div className={classes.container} >
{matches?<div className={classes.gradient} >

<p>
What kind of place will<br/> 
you host?
</p>


</div>:<></>}

<div style={{display:'flex',flexDirection:'column',width:matches?"50%":
"100%"}}>
<VendorNavigation data={{propertyid:propertyid,mobileno:vendor.mobileno,opr:"ADD_VENDOR_PROPERTIES"}} vendorName={vendor.firstname+" "+vendor.lastname} myurl='/addproperties' />
<div className={classes.content}>


{showProperties()}



</div>
<PrevNext data={{propertyid:propertyid,mobileno:vendor.mobileno,opr:"ADD_VENDOR_PROPERTIES"}} nextUrl='/vendorsubproperties' />
</div>

</div>


)




}

