import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Container, createMuiTheme, Grid, Paper, ThemeProvider, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './style';
import Input from './Input';
import Icon from './Icon';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = (props) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(true)
  const [formData, setFormData] = useState(initialState)
  const [errMessage, setErrMessage] = useState(null)
  const history = useHistory()
  const classes = useStyles()
  
  const theme = createMuiTheme({
    palette: {
      text:{
        primary: "red"
      }
    }
  });

  useEffect(()=>{
    setErrMessage(props.errMsg)
  },[props.errMsg])

  const handleSubmit = (e) =>{
    e.preventDefault()

    props.onAuth(formData, isSignup, history)
  }
  
  const handleChange = (e) =>{
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value})
    
  }
  
  const handleShowPassword = () =>setShowPassword((prevState)=> !prevState)
  
  const switchMode = () => { 
    setIsSignup((prevState)=> !prevState)
    setShowPassword(false)  
    setErrMessage(null)
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography variant="h5">{isSignup ? 'Sign In': 'Sign Up' }</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              { 
                !isSignup && (
                  <React.Fragment>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                  </React.Fragment>
                )}
                <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                {!isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>}
            </Grid>
            { errMessage && 
              <ThemeProvider theme={theme}>
                <Box m={1}> 
                  <Typography variant="h7" color="textPrimary">{errMessage.keyValue ? 'Email does exist' :errMessage}</Typography>
                </Box>
              </ThemeProvider>
            }
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              {!isSignup ? 'Sign Up' : 'Sign In'}
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                  <Button onClick={switchMode}>
                    {!isSignup ? 'Already have an account? Sing In' : 'Don\'t have an account? Sign Up'}
                  </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  )
}

const mapStateToProps = state =>{
  return{
    errMsg: state.auth.errMessage
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onAuth:(data, isSignup, history)=> dispatch(actions.auth(data, isSignup, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);