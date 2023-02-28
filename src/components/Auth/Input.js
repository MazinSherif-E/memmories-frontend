import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core'
import React from 'react'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const Input = (props) => {
  return (
    <Grid item xs={6} md={props.half ? 6 : 12}>
        <TextField 
            name={props.name} 
            label={props.label} 
            onChange={props.handleChange} 
            fullWidth
            type={props.type}
            variant="outlined"
            required
            InputProps={props.name === 'password' && {
                endAdornment:(
                    <InputAdornment position="end">
                        <IconButton onClick={props.handleShowPassword}>
                            {props.type === 'password' ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    </Grid>
  )
}

export default Input