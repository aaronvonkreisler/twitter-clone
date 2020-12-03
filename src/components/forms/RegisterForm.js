import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import TextBox from '../layout/TextBox';
import SelectBox from '../layout/SelectBox';
import '../../styles/design/registerForm.css';
import '../../styles/design/utils.css';

const RegisterForm = (props) => {
   const daysOfMonth = Array.from(new Array(31), (val, index) => index + 1);
   const now = new Date().getUTCFullYear();
   const years = Array(now - (now - 100))
      .fill('')
      .map((val, index) => now - index);

   const initialValues = {
      name: '',
      email: '',
      month: '',
      day: '',
      year: '',
   };
   return (
      <React.Fragment>
         <Formik
            initialValues={initialValues}
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
                  <TextBox
                     value={values.email}
                     onChange={handleChange}
                     inputType="email"
                     inputName="email"
                     label="Email"
                     autoComplete="off"
                  />
                  <div className="dateofbirth">
                     <div className="dateofbirth__title">
                        <span>Date of birth</span>
                     </div>
                     <div className="dateofbirth__subtitle">
                        <span style={{ color: 'rgb(136, 153, 166)' }}>
                           This will not be shown publicly. Confirm your own
                           age, even if this account is for a business, a pet,
                           or something else.
                        </span>
                     </div>
                     <div className="flex flex-row justify-start">
                        <div className="flex-grow2">
                           <SelectBox
                              value={values.month}
                              onChange={handleChange}
                              inputName="month"
                              label="Month"
                           >
                              <option value=""></option>
                              <option value="1">January</option>
                              <option value="2">February</option>
                              <option value="3">March</option>
                              <option value="4">April</option>
                              <option value="5">May</option>
                              <option value="6">June</option>
                              <option value="7">July</option>
                              <option value="8">August</option>
                              <option value="9">September</option>
                              <option value="10">October</option>
                              <option value="11">November</option>
                              <option value="12">December</option>
                           </SelectBox>
                        </div>
                        <SelectBox
                           value={values.day}
                           onChange={handleChange}
                           inputName="day"
                           label="Day"
                        >
                           <option value=""></option>
                           {daysOfMonth.map((day, index) => {
                              return (
                                 <option key={index} value={day.toString()}>
                                    {day}
                                 </option>
                              );
                           })}
                        </SelectBox>
                        <SelectBox
                           value={values.year}
                           onChange={handleChange}
                           inputName="year"
                           label="Year"
                        >
                           <option value=""></option>
                           {years.map((year, index) => {
                              return (
                                 <option key={index} value={year.toString()}>
                                    {year}
                                 </option>
                              );
                           })}
                        </SelectBox>
                     </div>
                  </div>
                  <button type="submit">Submit</button>
               </form>
            )}
         </Formik>
      </React.Fragment>
   );
};

RegisterForm.propTypes = {};

export default RegisterForm;
