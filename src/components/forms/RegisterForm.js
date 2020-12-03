import React from 'react';
import * as Yup from 'yup';
import { Formik, ErrorMessage } from 'formik';
import { Button } from '@material-ui/core';
import TextBox from '../layout/TextBox';

import '../../styles/design/registerForm.css';
import '../../styles/design/utils.css';

const RegisterForm = (props) => {
   const initialValues = {
      name: '',
      email: '',
      screen_name: '',
      password: '',
      password2: '',
   };

   const validationSchema = Yup.object({
      name: Yup.string().required("What's your name?"),
      email: Yup.string()
         .email('Invalid email address')
         .required("What's your email?"),
      screen_name: Yup.string()
         .matches(/^((?!@).)*$/, {
            message: 'Please remove @ from your username',
            excludeEmptyString: true,
         })
         .required('Username is required')
         .min(3, 'Must be between 3 and 15 characters')
         .max(15, 'Must be between 3 and 15 characters'),
      password: Yup.string()
         .max(50, 'Must be 50 characters or less')
         .min(6, 'Password must be at least 6 characters')
         .required('Password is required'),
      password2: Yup.string().oneOf(
         [Yup.ref('password')],
         'Passwords do not match'
      ),
   });
   return (
      <React.Fragment>
         <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
               alert(JSON.stringify(values, null, 2));
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
                     value={values.name}
                     onChange={handleChange}
                     inputType="text"
                     inputName="name"
                     label="Name"
                  />
                  <ErrorMessage
                     name="name"
                     render={(msg) => (
                        <div style={{ color: '#ff5311' }}>{msg}</div>
                     )}
                  />
                  <TextBox
                     value={values.email}
                     onChange={handleChange}
                     inputType="email"
                     inputName="email"
                     label="Email"
                     autoComplete="off"
                  />
                  <ErrorMessage
                     name="email"
                     render={(msg) => (
                        <div style={{ color: '#ff5311' }}>{msg}</div>
                     )}
                  />
                  <TextBox
                     value={values.screen_name}
                     onChange={handleChange}
                     inputType="text"
                     inputName="screen_name"
                     label="Username"
                     autoComplete="off"
                  />
                  <ErrorMessage
                     name="screen_name"
                     render={(msg) => (
                        <div style={{ color: '#ff5311' }}>{msg}</div>
                     )}
                  />
                  <TextBox
                     value={values.password}
                     onChange={handleChange}
                     inputType="password"
                     inputName="password"
                     label="Password"
                     autoComplete="off"
                  />
                  <ErrorMessage
                     name="password"
                     render={(msg) => (
                        <div style={{ color: '#ff5311' }}>{msg}</div>
                     )}
                  />
                  <TextBox
                     value={values.password2}
                     onChange={handleChange}
                     inputType="password"
                     inputName="password2"
                     label="Confirm Password"
                     autoComplete="off"
                  />
                  <ErrorMessage
                     name="password2"
                     render={(msg) => (
                        <div style={{ color: '#ff5311' }}>{msg}</div>
                     )}
                  />
                  <div className="flex flex-row-reverse mr-15 my-5">
                     <Button type="submit" className="tweet-button">
                        Submit
                     </Button>
                  </div>
               </form>
            )}
         </Formik>
      </React.Fragment>
   );
};

export default RegisterForm;
