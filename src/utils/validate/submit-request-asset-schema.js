import * as Yup from 'yup';

export const SubmitRequestAssetSchema = (type) => {
    return Yup.object().shape({
        title: Yup.string().min(0).max(255).required('Please enter Title'),
        description: Yup.string().min(0).max(1000).required('Please enter Description'),
        issuedDate: Yup.string().nullable('Please select Issued Date.').required('Please select Issued Date.'),
        returnedDate: Yup.string().nullable('Please select Returned Date.').required('Please select Returned Date.')
    });
};
