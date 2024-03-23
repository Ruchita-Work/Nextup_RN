import * as Yup from 'yup';

const editCoachValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Please enter first name')
    .matches(/^[a-zA-Z ]+$/, 'First Name must contain only alphabets')
    .min(3, 'First Name must be more than 3 characters')
    .max(50, 'First Name must be less than 50 characters'),
  lastName: Yup.string()
    .required('Please enter last name')
    .matches(/^[a-zA-Z ]+$/, 'Last Name must contain only alphabets')
    .min(3, 'Last Name must be more than 3 characters')
    .max(50, 'Last Name must be less than 50 characters'),
  email: Yup.string()
    .required('Please enter email')
    .email('Please enter a valid email'),
  phoneNumber: Yup.string()
    .required('Please enter phone number')
    .length(10, 'Phone number should be 10 characters long'),
});

const editPlayerValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Please enter first name')
    .matches(/^[a-zA-Z ]+$/, 'First Name must contain only alphabets')
    .min(3, 'First Name must be more than 3 characters')
    .max(50, 'First Name must be less than 50 characters'),
  lastName: Yup.string()
    .required('Please enter last name')
    .matches(/^[a-zA-Z ]+$/, 'Last Name must contain only alphabets')
    .min(3, 'Last Name must be more than 3 characters')
    .max(50, 'Last Name must be less than 50 characters'),
  email: Yup.string()
    .required('Please enter email')
    .email('Please enter a valid email'),
  dob: Yup.string().required('Please select date of birth'),
  heightFeet: Yup.string().required('Please enter height'),
  heightInches: Yup.string().required('Please enter height'),
  weight: Yup.string().required('Please enter weight'),
});

export { editCoachValidationSchema, editPlayerValidationSchema };
