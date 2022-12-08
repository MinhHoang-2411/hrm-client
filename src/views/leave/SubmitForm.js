// material-ui
import { Box, Button, Container, FormControl, Grid, MenuItem, TextField } from '@mui/material';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import MainCard from 'ui-component/cards/MainCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useTheme } from '@mui/material/styles';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets

// date
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dateFormat from 'dateformat';

// utils
import { gridSpacing } from 'store/constant';
import { getDatesInRange } from 'utils/date-time';

// api leave
import { getGeneralInfor } from 'api/leave';
import { useEffect, useState } from 'react';

// redux
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { leaveActions } from 'store/leave/leaveSlice';

// toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubmitForm = ({ ...others }) => {
    const dispatch = useAppDispatch();
    const alert = useAppSelector((state) => state.leave.alert);
    const theme = useTheme();
    const [dateAndLeaveTimes, setDateAndLeaveTimes] = useState([]);
    const [infor, setInfor] = useState({});
    const [inforLeaveUnUse, setInforLeaveUnUse] = useState('');

    const handleGetArrayDate = (leaveFrom, leaveTo) => {
        if (leaveFrom && leaveTo) {
            const dates = getDatesInRange(leaveFrom, leaveTo);
            let arrDate = [];
            if (dates?.length > 0) {
                dates?.forEach((date) =>
                    arrDate.push({
                        leaveDate: date,
                        dateType: 'ALL_DAY'
                    })
                );
            }
            arrDate = weekendFilter(arrDate);
            setDateAndLeaveTimes(arrDate);
        }
    };

    const weekendFilter = (inDates) => {
        return inDates.filter((item) => checkWeekend(item));
    };

    const checkWeekend = (date) => {
        if (date.leaveDate.toDate().getDay() == 6 || date.leaveDate.toDate().getDay() == 0) return false;
        else return true;
    };

    const handleSelectLeaveTime = (time, index) => {
        const tmpDate = [...dateAndLeaveTimes];
        tmpDate[index].dateType = time;
        setDateAndLeaveTimes(tmpDate);
    };

    const handleSubmit = (value) => {
        dispatch(
            leaveActions.submit({
                ...value,
                leaveDetailsDTOS: dateAndLeaveTimes
            })
        );
    };

    const showToastMessage = (param) => {
        if (param === 'success') {
            toast.success('Submit Leave successfully', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if (param === 'failed') {
            toast.error('Submit Leave fail', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    useEffect(() => {
        const information = getGeneralInfor();
        information.then(function (result) {
            setInfor(result);
            setInforLeaveUnUse(result.leaveUnUse + ' days of Annual Leave');
        });
        showToastMessage(alert);
    }, [alert]);

    return (
        <MainCard title="Leave Request">
            <Formik
                initialValues={{
                    title: '',
                    type: '',
                    reason: '',
                    startDate: null,
                    endDate: null,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().min(0).max(255).required('Title is required'),
                    reason: Yup.string().min(0).max(1000).required('Reason is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                        handleSubmit(values);
                        resetForm();
                        setDateAndLeaveTimes([]);
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleChange, handleSubmit, isSubmitting, touched, values, resetForm, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item lg={8} md={8} sm={8} xs={8}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item lg={8} md={8} sm={12} xs={12}>
                                                <center>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.email && errors.email)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <span
                                                            style={{
                                                                marginBottom: '5px',
                                                                fontWeight: 'bold',
                                                                marginRight: 'auto',
                                                                marginTop: '5px'
                                                            }}
                                                        >
                                                            Title
                                                        </span>
                                                        <TextField
                                                            id="outlined-adornment-title"
                                                            type="text"
                                                            name="title"
                                                            placeholder="Title"
                                                            value={values.title}
                                                            onChange={handleChange}
                                                            inputProps={{ style: { fontSize: '16px' } }}
                                                        />
                                                    </FormControl>
                                                </center>
                                            </Grid>
                                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(touched.password && errors.password)}
                                                    sx={{ ...theme.typography.customInput }}
                                                >
                                                    <span
                                                        style={{
                                                            marginBottom: '5px',
                                                            fontWeight: 'bold',
                                                            marginRight: 'auto',
                                                            marginTop: '5px'
                                                        }}
                                                    >
                                                        Leave Type
                                                    </span>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        name="type"
                                                        value={values.type}
                                                        onChange={handleChange}
                                                    >
                                                        <MenuItem value={'OFF'}>OFF</MenuItem>
                                                        <MenuItem value={'REMOTE'}>REMOTE</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                                <center>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.password && errors.password)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <span
                                                            style={{
                                                                marginBottom: '5px',
                                                                fontWeight: 'bold',
                                                                marginRight: 'auto',
                                                                marginTop: '5px'
                                                            }}
                                                        >
                                                            From
                                                        </span>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DatePicker
                                                                value={values.startDate}
                                                                name="startDate"
                                                                onChange={(value) => {
                                                                    setFieldValue('startDate', value);
                                                                    handleGetArrayDate(value, values.endDate);
                                                                }}
                                                                renderInput={(params) => <TextField {...params} />}
                                                                disablePast={true}
                                                                inputFormat="DD/MM/YYYY"
                                                            />
                                                        </LocalizationProvider>
                                                    </FormControl>
                                                </center>
                                            </Grid>
                                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                                <center>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.password && errors.password)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <span
                                                            style={{
                                                                marginBottom: '5px',
                                                                fontWeight: 'bold',
                                                                marginRight: 'auto',
                                                                marginTop: '5px'
                                                            }}
                                                        >
                                                            To
                                                        </span>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DatePicker
                                                                id="outlined-adornment-leave-to"
                                                                type="date"
                                                                name="endDate"
                                                                value={values.endDate}
                                                                onChange={(value) => {
                                                                    setFieldValue('endDate', value);
                                                                    handleGetArrayDate(values.startDate, value);
                                                                }}
                                                                renderInput={(params) => <TextField {...params} />}
                                                                disablePast={true}
                                                                inputFormat="DD/MM/YYYY"
                                                            />
                                                        </LocalizationProvider>
                                                    </FormControl>
                                                </center>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <center>
                                            <FormControl
                                                fullWidth
                                                error={Boolean(touched.password && errors.password)}
                                                sx={{ ...theme.typography.customInput }}
                                            >
                                                <span
                                                    style={{
                                                        marginBottom: '5px',
                                                        fontWeight: 'bold',
                                                        marginRight: 'auto',
                                                        marginTop: '5px'
                                                    }}
                                                >
                                                    Reason
                                                </span>
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    multiline
                                                    name="reason"
                                                    type="text"
                                                    rows={6}
                                                    placeholder="Reason"
                                                    value={values.reason}
                                                    onChange={handleChange}
                                                    inputProps={{ style: { fontSize: '16px' } }}
                                                />
                                            </FormControl>
                                        </center>
                                    </Grid>

                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                                <Box display="flex" justifyContent="flex-end">
                                                    <AnimateButton>
                                                        <Button
                                                            disableElevation
                                                            style={{ width: '25%' }}
                                                            size="large"
                                                            type="reset"
                                                            variant="outlined"
                                                            onClick={(e) => {
                                                                resetForm();
                                                                setDateAndLeaveTimes([]);
                                                            }}
                                                            color="secondary"
                                                        >
                                                            Reset
                                                        </Button>
                                                    </AnimateButton>
                                                </Box>
                                            </Grid>
                                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                                <Box display="flex" justifyContent="flex-begin">
                                                    <AnimateButton>
                                                        <Button
                                                            disableElevation
                                                            disabled={isSubmitting}
                                                            style={{ width: '25%' }}
                                                            size="large"
                                                            type="submit"
                                                            variant="contained"
                                                            color="secondary"
                                                        >
                                                            Submit
                                                        </Button>
                                                    </AnimateButton>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Card
                                    sx={{
                                        height: '85%'
                                    }}
                                    variant="outlined"
                                >
                                    <CardHeader title="Leave Detail" subheader={inforLeaveUnUse} />
                                    <CardContent>
                                        <ul style={{ paddingLeft: 0 }}>
                                            {dateAndLeaveTimes.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <li style={{ color: 'black', listStyleType: 'none' }}>
                                                            <CalendarMonthIcon
                                                                sx={{
                                                                    width: 15,
                                                                    height: 15,
                                                                    verticalAlign: 'center',
                                                                    textAlign: 'center'
                                                                }}
                                                                fontSize="medium"
                                                            />
                                                            <span style={{ marrginLeft: '10px' }}>
                                                                {dateFormat(item?.leaveDate, 'dd-mm-yyyy')}
                                                            </span>
                                                            <Select
                                                                sx={{ m: 1, width: '45%', marginLeft: '15px' }}
                                                                size="small"
                                                                labelId="demo-simple-select-label"
                                                                value={item.dateType}
                                                                onChange={(e) => handleSelectLeaveTime(e.target.value, index)}
                                                                defaultValue="ALL_DAY"
                                                            >
                                                                <MenuItem value={'ALL_DAY'}>ALL DAY</MenuItem>
                                                                <MenuItem value={'MORNING'}>MORNING</MenuItem>
                                                                <MenuItem value={'AFTERNOON'}>AFTERNOON</MenuItem>
                                                            </Select>
                                                        </li>
                                                    </div>
                                                );
                                            })}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </MainCard>
    );
};

export default SubmitForm;
