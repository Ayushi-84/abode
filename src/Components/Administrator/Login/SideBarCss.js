import { makeStyles } from '@mui/styles';

 const  useStyles = makeStyles({

  rootDiv:{
      marginTop:10
  }, 
  divStyle:{
     display:'flex',
     flexDirection:'row',
     padding:2,
     justifyContent:'left'
     
  },   
  dashboardTextStyle:{
    fontSize:16,
    letterSpacing:2,
    fontWeight:'bold',
    color:'#000'
      },
   iconStyle:{
  
      color:"#3742fa",
    paddingRight:5

    

   },
   link:

      {textDecoration:'none',color:'inherit'}
   

  });
  

 export {useStyles}