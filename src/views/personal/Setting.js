import { useState } from 'react';
// material-ui
import UpdateIcon from '@mui/icons-material/Update';
import LoadingButton from '@mui/lab/LoadingButton';
import {
    Alert,
    AlertTitle,
    Button,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    Grid,
    Stack,
    TextField,
    InputAdornment,
    IconButton
} from '@mui/material';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import MainCard from 'ui-component/cards/MainCard';

// third party
import { Formik } from 'formik';

//redux
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions } from 'store/auth/authSlice';

// scss
import '../../assets/scss/setting.scss';

// validation
import { ChangePasswordSchema } from 'utils/validate/change-password-schema';

//// i18n
import { useTranslation } from 'react-i18next';

const Setting = () => {
    const [pwds, setPwds] = useState([]);

    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const isPasswordChanging = useAppSelector((state) => state.auth.isPasswordChanging);

    const handleChangePassword = (values) => {
        dispatch(
            authActions.changePassword({
                ...values,
                translation: t
            })
        );
    };
    const toggleShowPwds = (field) => {
        if (pwds.includes(field)) {
            setPwds((prev) => prev.filter((item) => item != field));
        } else {
            setPwds([...pwds, field]);
        }
    };

    return (
        <MainCard title={t('Setting')}>
            <Grid container>
                <Grid item xs={12}>
                    <Alert variant="outlined" severity="warning" className="alert-password">
                        <AlertTitle>{t('Alert!')}</AlertTitle>
                        {t('Please enter password between 8 and 60 characters.')}
                        <strong> {t('Do not share your password')}</strong>
                    </Alert>
                </Grid>
                <Grid item xs={12} sx={{ marginTop: '20px' }}>
                    <Card variant="outlined" className="card-password">
                        <CardHeader title={t('Change Password')} />
                        <CardContent>
                            <Formik
                                initialValues={{
                                    currentPassword: '',
                                    newPassword: '',
                                    confirmPassword: ''
                                }}
                                validationSchema={ChangePasswordSchema(t)}
                                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                                    try {
                                        setStatus({ success: false });
                                        setSubmitting(false);
                                        handleChangePassword(values);
                                        resetForm();
                                    } catch (err) {
                                        setStatus({ success: false });
                                        setErrors({ submit: err.message });
                                        setSubmitting(false);
                                    }
                                }}
                            >
                                {({ errors, handleChange, handleSubmit, isSubmitting, touched, values, resetForm, setFieldValue }) => (
                                    <form noValidate onSubmit={handleSubmit}>
                                        <Grid container>
                                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item lg={6} md={6} sm={6} xs={6}>
                                                        <FormControl fullWidth error={Boolean(touched.title && errors.title)}>
                                                            <TextField
                                                                type={pwds.includes('currentPwd') ? 'text' : 'password'}
                                                                id="outlined-adornment-title"
                                                                label={t('Current Password')}
                                                                name="currentPassword"
                                                                value={values.currentPassword}
                                                                onChange={handleChange}
                                                                error={touched.currentPassword && Boolean(errors.currentPassword)}
                                                                helperText={touched.currentPassword && t(errors.currentPassword)}
                                                                color="secondary"
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <IconButton
                                                                                onClick={() => {
                                                                                    toggleShowPwds('currentPwd');
                                                                                }}
                                                                            >
                                                                                {!pwds.includes('currentPwd') ? (
                                                                                    <EyeInvisibleOutlined />
                                                                                ) : (
                                                                                    <EyeOutlined />
                                                                                )}
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                    )
                                                                }}
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ marginTop: '15px' }}>
                                                <Grid container spacing={2}>
                                                    <Grid item lg={6} md={6} sm={6} xs={6}>
                                                        <FormControl fullWidth error={Boolean(touched.title && errors.title)}>
                                                            <TextField
                                                                type={pwds.includes('newPwd') ? 'text' : 'password'}
                                                                id="outlined-adornment-title"
                                                                label={t('New Password')}
                                                                name="newPassword"
                                                                value={values.newPassword}
                                                                onChange={handleChange}
                                                                error={touched.newPassword && Boolean(errors.newPassword)}
                                                                helperText={touched.newPassword && t(errors.newPassword)}
                                                                color="secondary"
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <IconButton
                                                                                onClick={() => {
                                                                                    toggleShowPwds('newPwd');
                                                                                }}
                                                                            >
                                                                                {!pwds.includes('newPwd') ? (
                                                                                    <EyeInvisibleOutlined />
                                                                                ) : (
                                                                                    <EyeOutlined />
                                                                                )}
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                    )
                                                                }}
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item lg={6} md={6} sm={6} xs={6}>
                                                        <FormControl fullWidth error={Boolean(touched.title && errors.title)}>
                                                            <TextField
                                                                type={pwds.includes('confirmNewPwd') ? 'text' : 'password'}
                                                                id="outlined-adornment-title"
                                                                label={t('Confirm Password')}
                                                                name="confirmPassword"
                                                                value={values.confirmPassword}
                                                                onChange={handleChange}
                                                                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                                                helperText={touched.confirmPassword && t(errors.confirmPassword)}
                                                                color="secondary"
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <IconButton
                                                                                onClick={() => {
                                                                                    toggleShowPwds('confirmNewPwd');
                                                                                }}
                                                                            >
                                                                                {!pwds.includes('confirmNewPwd') ? (
                                                                                    <EyeInvisibleOutlined />
                                                                                ) : (
                                                                                    <EyeOutlined />
                                                                                )}
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                    )
                                                                }}
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ marginTop: '15px' }}>
                                                <Stack direction="row" spacing={2} style={{ justifyContent: 'flex-end' }}>
                                                    <Button
                                                        disableElevation
                                                        size="large"
                                                        type="reset"
                                                        variant="outlined"
                                                        onClick={(e) => {
                                                            resetForm();
                                                        }}
                                                        color="secondary"
                                                    >
                                                        {t('Clear')}
                                                    </Button>
                                                    <LoadingButton
                                                        startIcon={<UpdateIcon />}
                                                        loading={isPasswordChanging}
                                                        loadingPosition="start"
                                                        variant="contained"
                                                        type="submit"
                                                        color="secondary"
                                                    >
                                                        <span>{t('Change Password')}</span>
                                                    </LoadingButton>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </form>
                                )}
                            </Formik>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Setting;
