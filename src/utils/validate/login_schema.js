import * as Yup from 'yup';

export const LoginSchema = (type) => {
    return Yup.object().shape({
        username: Yup.string().max(50, 'Please no more than 50 characters').required('Please enter Username'),
        password: Yup.string().max(25, 'Please no more than 25 characters').required('Please enter Password')
    });
};
