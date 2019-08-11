import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log('passwords Do not Match Set an Alert');
    } else {
      console.log('success');

      //ENDED UP DOING THIS REQUEST IN REDUX
      //create user object to send to back end, should match model almos or whatever request on backend needs
      // const newUser = {
      //   name,
      //   email,
      //   password
      // };
      // try {
      //   //this header get's send to back end -its like the header in postman
      //   const config = {
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   };
      //   // create the body and pass it thru stringify
      //   const body = JSON.stringify(newUser);

      //   //the res is a promise return by the post request from axios - on your back end
      //   //such as api/users which will send name emial and pass and reutrn a token to us
      //   // pass axios the route, the body object you made and stringifed and your config object
      //   const res = await axios.post('/api/users', body, config);
      //   console.log(res.data);
      // } catch (err) {
      //   console.error(err.response.data);
      // }
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-uer'> </i> Create Your Account
      </p>
      <form onSubmit={e => onSubmit(e)} className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className=' btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
