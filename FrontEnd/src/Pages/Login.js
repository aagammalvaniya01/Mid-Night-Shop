import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../Components/Message/errorMessage';
import { TextField, Button, CircularProgress, makeStyles } from '@material-ui/core/';
import * as routes from '../constants/routes';
import * as userAction from '../actions/userAction';
import * as userConstants from '../constants/userConstants';
import "./login.css";

const useStyles = makeStyles((theme) => ({
  prgressColor: {
    color: '#fff',
  },
}));

const Login = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  const userAuthData = useSelector((state) => state.userLogin);

  const { userInfo, error, loading } = userAuthData;

  const redirect = location.search ? location.search.split('=')[1] : routes.HOME;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [dispatch, userInfo, redirect, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userAction.auth(email, password));
  };

  const redirectUserToRegisterRoute = redirect ? routes.REGISTER + `?redirect=${redirect}` : routes.REGISTER;

  return (
    <>
      {error && <ErrorMessage header="Auth Error" message={error} reset={userConstants.RESET} />}
      {/* <FormContainer> */}

      <Form onSubmit={submitHandler} className="w-100 d-flex flex-column align-items-center">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid" alt="Sample_image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Sign in </p>
                </div>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>

                <TextField
                  variant="outlined"
                  type="email"
                  margin="normal"
                  placeholder="ex:- JohnDoe@gmail.com"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  type="password"
                  placeholder="***********"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="d-flex justify-content-between align-items-center">
                  {/* Checkbox */}
                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label className="form-check-label" for="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <Link to={routes.FORGOT_PASSWORD} className="text-body">Forgot password?</Link>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} className="mt-4">
                    {loading ? <CircularProgress color="inherit" className={classes.prgressColor} /> : <>Sign In</>}
                  </Button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?
                    <Link to={redirectUserToRegisterRoute} className="font-weight-bold">Register</Link>
                  </p>
                </div>

              </form>
            </div>
          </div>
        </div>
        {/* <div className='w-100 d-flex flex-column align-items-center mb-5 login-title'>
            <h1 className='pb-0'>Sign In</h1>
            <span>Please enter your email and password. </span>
          </div>
          <TextField
            variant="outlined"
            type="email"
            margin="normal"
            placeholder="ex:- JohnDoe@gmail.com"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            type="password"
            placeholder="***********"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} className="mt-4">
            {loading ? <CircularProgress color="inherit" className={classes.prgressColor} /> : <>Sign In</>}
          </Button>

          <div className='w-100 text-right mb-5 mt-2'>
            <Link to={routes.FORGOT_PASSWORD}>Forgot Password?</Link>
          </div>

          <div className='pb-3'>
            <span>New Customer? </span>
            <Link to={redirectUserToRegisterRoute} className="font-weight-bold">Register</Link>
          </div> */}
      </Form>

      {/* </FormContainer> */}
    </>
  );
};

export default Login;
