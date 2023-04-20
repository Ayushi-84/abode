import { Grid, Button, TextField } from '@mui/material'
import useStyle from './AmenitiesOptionsCss'
import { useState, useEffect } from 'react'
import LocationCityIcon from '@mui/icons-material/LocationCity';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getData, postData } from '../../Api/ServerServices';
import ListIcon from '@mui/icons-material/List';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import amenityPicture from '../../assets/images/amenitiesoptions.jpg'
import Avatar from '@mui/material/Avatar';
import Swal from 'sweetalert2';
import ChaletIcon from '@mui/icons-material/Chalet'


export default function AmenitiesOptions() {
  const handleChangeImage=(event)=>{
    setAmenitiesPicture({bytes:event.target.files[0],files:URL.createObjectURL (event.target.files[0])})



  }
  const handleClick = async () => {

      var formData=new FormData()
      formData.append('amenitiesid',amenitiesId)
      formData.append('optionname',optionName)
      formData.append('icon',amenitiesPicture.bytes)
    
    var response = await postData('amenities/addamenitiesoptions', formData, true)
    if (response.status == true) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Amenities Options has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Fail to Save The Record',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }




  const Input = styled('input')({
    display: 'none',
  });

  const [optionName, setOptionName] = useState('')
  const [amenities, setAmenities] = useState([])
  const [amenitiesId, setAmenitiesId] = useState('')
  const [amenitiesPicture, setAmenitiesPicture] = useState({ bytes: '', files: amenityPicture })
  var classes = useStyle()

  const handleChange = (event) => {
    setAmenitiesId(event.target.value);
  };
  const fillAmenities = () => {
    return (
      amenities.map((item) => {
        return (
          <MenuItem value={item.amenitiesid}>{item.amenities}</MenuItem>
        )
      })
    )
  }
  const fetchAllAmenities = async () => {
    var response = await getData('amenities/displayamenities')
    setAmenities(response.data)



  }
  useEffect(function () {
    fetchAllAmenities()

  }, [])




  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.heading}>
              Amenitis Options Register
            </div>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            < ChaletIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <FormControl fullWidth variant='standard'>
              <InputLabel id="demo-simple-select-label">Amenities</InputLabel>
              <Select fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={amenitiesId}
                label="Amenities"
                onChange={handleChange}
              >
                {fillAmenities()}
              </Select>
            </FormControl>

          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            < ListIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField onChange={(event) => setOptionName(event.target.value)} label="Enter Amenities Options" fullWidth variant="standard" />
          </Grid>
          <Grid item xs={6} className={classes.centerStyle}>
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" onChange={handleChangeImage} type="file" />
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </Grid>
          <Grid item xs={6} className={classes.centerStyle}>
            <Avatar
              alt="Remy Sharp"
              src={amenitiesPicture.files}
              sx={{ width: 70, height: 70 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleClick} variant="contained" fullWidth >Add Amenities Options</Button>
          </Grid>
        </Grid>

      </div>
    </div>
  )
}


