import * as Yup from 'yup';

export const LoginSchema = (type) => {
    return Yup.object().shape({
        username: Yup.string().max(50, 'Please no more than 50 characters').required('Please enter Username'),
        password: Yup.string()
            .min(8, 'Please enter at least 8 characters')
            .max(60, 'Please enter no more than 60 characters')
            .required('Please enter Password')
    });
};
