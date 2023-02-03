import * as Yup from 'yup';

export const ChangePasswordSchema = (type) => {
    return Yup.object().shape({
        currentPassword: Yup.string()
            .min(8, 'Please enter at least 8 characters')
            .max(60, 'Please enter no more than 60 characters')
            .required('Please enter Current Password'),
        newPassword: Yup.string()
            .notOneOf([Yup.ref('currentPassword'), null], 'New password is the same with current password  ')
            .min(8, 'Please enter at least 8 characters')
            .max(60, 'Please enter no more than 60 characters')
            .required('Please enter New Password'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .min(8, 'Please enter at least 8 characters')
            .max(60, 'Please enter no more than 60 characters')
            .required('Please enter Confirm Password')
    });
};
