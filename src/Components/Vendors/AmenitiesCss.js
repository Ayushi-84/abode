import { makeStyles } from '@mui/styles';

 const useStyles=makeStyles({

   container: {
      display: "flex",
      height: "100vh",
      overflow: "hidden",
    },
  
    gradient: {
      width: "50vw",
      height: "100vh",
      background: "rgb(238,79,122)",
      background:
        "linear-gradient(180deg, rgba(238,79,122,1) 0%, rgba(67,24,200,1) 100%, rgba(20,14,5,1) 100%)",
      display: "flex",
      justifyContent: "center",
      fontSize: "48px",
      fontWeight: "600",
      alignItems: "center",
      color: "whitesmoke",
    },
    content:{
  
     width:'50vw',
      display:'flex',
      
     flexDirection:'column',
      overflowY:'auto',
      height:'90%',
      
      
      
      
      
      },
   
    imgText:{
        display:'flex',
        fontSize:60,
        marginTop:350,
        marginLeft:30,
        fontWeight:'bold',
        justifyContent:'center',
        flexDirection:'column',
        width:650,
         
       
     },
     img:{
        backgroundImage: 'url(https://www.color-meanings.com/wp-content/uploads/Red_and_blue_mix-1536x864.jpeg)'
     },
  

     displayContent:{
      width:130,
      height:110,
      borderRadius:15,
      marginRight:15,
      marginBottom:15,
      boxShadow:'rgba(6, 24, 44, 0.4) 0px 0px 0px 0.5px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 0.5px 0px inset',
      display:'flex',
      justifyContent:'center',
      flexDirection:'column',
      
      alignItems:'center',
      cursor:'pointer',
     
      
     },

     displaySelectedContent:{
      width:130,
      height:110,
      borderRadius:15,
      marginRight:15,
      marginBottom:15,
    
      boxShadow:'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 0.5px 0px inset',
      display:'flex',
      justifyContent:'center',
      flexDirection:'column',
      
      alignItems:'center',
      cursor:'pointer',
     
      
     },





     display:{
      padding: '33px',
      display:'grid',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
     
     grid:' 150px / auto auto auto',
    padding:30,
    
    gridGap: '15px'
      
     },
     spanStyle:{
       
        margin:5
     },
     spanOne:{
      
      fontWeight:400,
      fontSize:14
      
   },
   logoStyle:{
      flexGrow:1,
      fontSize:25,
      letterSpacing:2,
      fontWeight:'bold',
     color:'#C4E538',
     textShadow:'2px 2px 1px red, 4px 4px 3px white',
     fontFamily:'arial',
     margin:20
     
  },
  button:{
     display:'flex',
   marginTop:70,
   justifyContent:'space-between'
  },


  


})
export {useStyles}