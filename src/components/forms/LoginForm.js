import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import * as Yup from 'yup';
import TextBox from '../layout/TextBox';
import { loginUser } from '../../actions/auth';
import '../../styles/design/login.css';

const LoginForm = ({ loginUser }) => {
   const initialValues = {
      email: '',
      password: '',
   };

   const validationSchema = Yup.object({
      email: Yup.string()
         .email('Invalid email address')
         .required("What's your email?"),
      password: Yup.string().required('Please enter your password'),
   });
   return (
      <React.Fragment>
         <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
               const { email, password } = values;
               loginUser(email, password);
               setSubmitting(false);
            }}
         >
            {({
               values,
               touched,
               handleChange,
               handleBlur,
               handleSubmit,
               isSubmitting,
            }) => (
               <form onSubmit={handleSubmit}>
                  <TextBox
                     value={values.email}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     inputName="email"
                     inputType="text"
                     label="Email"
                  />
                  <ErrorMessage
                     name="email"
                     render={(msg) => (
                        <div style={{ color: '#ff5311' }}>{msg}</div>
                     )}
                  />

                  <TextBox
                     value={values.password}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     inputName="password"
                     inputType="password"
                     label="Password"
                  />
                  <ErrorMessage
                     name="password"
                     render={(msg) => (
                        <div style={{ color: '#ff5311' }}>{msg}</div>
                     )}
                  />
                  <div className="button-wrapper">
                     <div className="button-subWrapper">
                        <Button
                           className="tweet-button"
                           type="submit"
                           fullWidth
                        >
                           Log in
                        </Button>
                     </div>
                  </div>
               </form>
            )}
         </Formik>
      </React.Fragment>
   );
};

export default connect(null, { loginUser })(LoginForm);
