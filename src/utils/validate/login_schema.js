import * as Yup from 'yup';

export const LoginSchema = (type) => {
    return Yup.object().shape({
        username: Yup.string().max(25).required('Please enter Username'),
        password: Yup.string().max(25).required('Please enter Password')
    });
};
