// material-ui
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import { Button, FormControl, Grid, MenuItem, TextField, Box, FormHelperText, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import MainCard from 'ui-component/cards/MainCard';
import Autocomplete from '@mui/material/Autocomplete';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

// third party
import { Formik } from 'formik';

// date
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dateFormat from 'dateformat';

// utils
import { gridSpacing } from 'store/constant';
import { getDatesInRange } from 'utils/date-time';

// api leave
import { getLeaveCount } from 'api/leave';
import { useEffect, useState, useRef } from 'react';

// redux
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { leaveActions } from 'store/leave/leaveSlice';

// toast
import { toast } from 'react-toastify';

// dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// scss
import '../../assets/scss/leave.scss';

// validate
import { SubmitLeaveSchema } from 'utils/validate/submit-leave-schema';

// format
import { formatTimeStampToDate, formatDateMaterialForFilter } from 'utils/format/date';

import * as React from 'react';
const managers = [
    { id: 1, name: 'Huynh Van Ngoc Duy' },
    { id: 1, name: 'Hoang Trong Thang' },
    { id: 2, name: 'Nguyen Don Kim Trung' },
    { id: 2, name: 'Truong Van Huy' },
    { id: 1, name: 'Pham Tan Hung' },
    { id: 1, name: 'Le Van Sang' },
    { id: 2, name: 'Pham Van Duc' }
];

const steps = ['Submit a leave', 'Manager confirms the leave', 'Admin approves the leave'];

const SubmitForm = ({ ...others }) => {
    const dispatch = useAppDispatch();
    const alert = useAppSelector((state) => state.leave.alert);
    const theme = useTheme();
    const [dateAndLeaveTimes, setDateAndLeaveTimes] = useState([]);
    const [inforLeaveUnUse, setInforLeaveUnUse] = useState('');
    const [currentIndex, setCurrentIndex] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [errorMessageDetail, setErrorMessageDetail] = useState('');
    const formikRef = useRef();
    const inputRef = useRef();

    const initialValues = {
        managers_id: { name: '', id: null }
    };

    // get data
    const listHolidays = useAppSelector((state) => state.leave.listHoliday);

    const handleClickOpen = (idx) => {
        setOpen(true);
        setCurrentIndex(idx);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleGetArrayDate = (leaveFrom, leaveTo) => {
        if (leaveFrom && leaveTo) {
            const dates = getDatesInRange(leaveFrom, leaveTo);
            let arrDate = [];
            if (dates?.length > 0) {
                dates?.forEach((date) =>
                    arrDate.push({
                        leaveDate: date,
                        dateType: 'ALL_DAY',
                        note: ''
                    })
                );
            }
            setDateAndLeaveTimes(arrDate);
        }
    };

    const weekendAndHolidayFilter = (inDates) => {
        return inDates.filter((item) => isWeekend(item) === false && isHoliday(item) === false);
    };

    const isWeekend = (date) => {
        if (date.leaveDate.toDate().getDay() == 6 || date.leaveDate.toDate().getDay() == 0) return true;
        else return false;
    };

    const isHoliday = (date) => {
        if (
            listHolidays.some(
                (item) => formatTimeStampToDate(item.date) === formatTimeStampToDate(formatDateMaterialForFilter(date.leaveDate))
            )
        )
            return true;
        else return false;
    };

    const handleSelectLeaveTime = (time, index) => {
        const tmpDate = [...dateAndLeaveTimes];
        tmpDate[index].dateType = time;
        setDateAndLeaveTimes(tmpDate);
    };

    const handleSubmit = (value) => {
        if (weekendAndHolidayFilter(dateAndLeaveTimes).length === 0) {
            setErrorMessageDetail('Invalid leave date');
        } else {
            const assignTo = value.assignTo.id;
            value['assignTo'] = assignTo;
            dispatch(
                leaveActions.submit({
                    ...value,
                    leaveDetailsDTOS: weekendAndHolidayFilter(dateAndLeaveTimes)
                })
            );
            formikRef.current?.resetForm();
            const input = inputRef.current.children[0].children[0];
            input.value = '';
            setDateAndLeaveTimes([]);
        }
    };

    const handleSubmitNote = (value) => {
        const tmpDate = [...dateAndLeaveTimes];
        tmpDate[currentIndex].note = value.note;
        setDateAndLeaveTimes(tmpDate);
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

    const handleGetLeaveCount = async () => {
        return await getLeaveCount();
    };

    useEffect(() => {
        const information = handleGetLeaveCount();
        information.then(function (result) {
            setInforLeaveUnUse((result.data.leaveUnUse < 0 ? 0 : result.data.leaveUnUse) + ' days of Annual Leave');
        });
        showToastMessage(alert);
    }, [alert]);

    useEffect(() => {
        dispatch(leaveActions.getHolidays({}));
    }, []);

    return (
        <MainCard title="Leave Request">
            <Formik
                innerRef={formikRef}
                initialValues={{
                    title: '',
                    type: '',
                    reason: '',
                    startDate: null,
                    endDate: null,
                    assignTo: undefined,
                    search: '',
                    submit: null
                }}
                validationSchema={SubmitLeaveSchema()}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                        handleSubmit(values);
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
                                <Grid container spacing={gridSpacing} sx={{ mt: 1 }}>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <Box sx={{ width: '100%' }}>
                                            <Stepper alternativeLabel sx={{ width: '100%' }}>
                                                {steps.map((label) => (
                                                    <Step key={label}>
                                                        <StepLabel>{label}</StepLabel>
                                                    </Step>
                                                ))}
                                            </Stepper>
                                        </Box>
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item lg={8} md={8} sm={12} xs={12}>
                                                <center>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.title && errors.title)}
                                                        sx={{ ...theme.typography.customInput }}
                                                        className="title-form"
                                                    >
                                                        <span>Title</span>
                                                        <TextField
                                                            id="outlined-adornment-title"
                                                            type="text"
                                                            name="title"
                                                            placeholder="Title"
                                                            value={values.title}
                                                            onChange={handleChange}
                                                            inputProps={{ style: { fontSize: '16px' } }}
                                                            className="form-input"
                                                            error={touched.title && Boolean(errors.title)}
                                                            helperText={touched.title && errors.title}
                                                            color="secondary"
                                                        />
                                                    </FormControl>
                                                </center>
                                            </Grid>
                                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(touched.type && errors.type)}
                                                    sx={{ ...theme.typography.customInput }}
                                                    className="title-form"
                                                >
                                                    <span>Leave Type</span>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        name="type"
                                                        value={values.type}
                                                        onChange={handleChange}
                                                        error={touched.type && Boolean(errors.type)}
                                                        className="form-input"
                                                        color="secondary"
                                                    >
                                                        <MenuItem value={'ANNUAL'}>Annual</MenuItem>
                                                        <MenuItem value={'CASUAL'}>Casual</MenuItem>
                                                        <MenuItem value={'MATERNITY'}>Maternity</MenuItem>
                                                        <MenuItem value={'REMOTE'}>Remote</MenuItem>
                                                    </Select>
                                                    <FormHelperText sx={{ color: '#ff4d4f' }}>
                                                        {touched?.type && errors?.type}
                                                    </FormHelperText>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item lg={4} md={4} sm={4} xs={12}>
                                                <center>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.startDate && errors.startDate)}
                                                        sx={{ ...theme.typography.customInput }}
                                                        className="title-form"
                                                    >
                                                        <span>From</span>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DatePicker
                                                                value={values.startDate}
                                                                name="startDate"
                                                                onChange={(value) => {
                                                                    setFieldValue('startDate', value);
                                                                    handleGetArrayDate(value, values.endDate);
                                                                    setErrorMessageDetail('');
                                                                }}
                                                                onChangeRaw={(e) => e.preventDefault()}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        error={touched.startDate && Boolean(errors.startDate)}
                                                                        helperText={touched.startDate && errors.startDate}
                                                                        color="secondary"
                                                                    />
                                                                )}
                                                                disablePast={true}
                                                                inputFormat="DD/MM/YYYY"
                                                                className="form-input"
                                                            />
                                                        </LocalizationProvider>
                                                    </FormControl>
                                                </center>
                                            </Grid>
                                            <Grid item lg={4} md={4} sm={4} xs={12}>
                                                <center>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.endDate && errors.endDate)}
                                                        sx={{ ...theme.typography.customInput }}
                                                        className="title-form"
                                                    >
                                                        <span>To</span>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DatePicker
                                                                id="outlined-adornment-leave-to"
                                                                type="date"
                                                                name="endDate"
                                                                value={values.endDate}
                                                                onChange={(value) => {
                                                                    setFieldValue('endDate', value);
                                                                    handleGetArrayDate(values.startDate, value);
                                                                    setErrorMessageDetail('');
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        error={touched.endDate && Boolean(errors.endDate)}
                                                                        helperText={touched.endDate && errors.endDate}
                                                                        color="secondary"
                                                                    />
                                                                )}
                                                                disablePast={true}
                                                                inputFormat="DD/MM/YYYY"
                                                                className="form-input"
                                                            />
                                                        </LocalizationProvider>
                                                    </FormControl>
                                                </center>
                                            </Grid>
                                            <Grid item lg={4} md={4} sm={4} xs={12}>
                                                <center>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.assignTo && errors.assignTo)}
                                                        sx={{ ...theme.typography.customInput }}
                                                        className="title-form"
                                                    >
                                                        <span>Assign To</span>
                                                        <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            name="assignTo"
                                                            value={values.assignTo}
                                                            onChange={(e, value) =>
                                                                setFieldValue(
                                                                    'assignTo',
                                                                    value !== null ? value : initialValues.managers_id
                                                                )
                                                            }
                                                            options={managers}
                                                            getOptionLabel={(option) => option.name}
                                                            renderOption={(props, option) => (
                                                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                                    {option.name}
                                                                </Box>
                                                            )}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    fullWidth
                                                                    ref={inputRef}
                                                                    name="assignTo"
                                                                    {...params}
                                                                    error={touched.assignTo && Boolean(errors.assignTo)}
                                                                    helperText={touched.assignTo && errors.assignTo}
                                                                    color="secondary"
                                                                />
                                                            )}
                                                            className="form-input"
                                                        />
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
                                                className="title-form"
                                            >
                                                <span>Reason</span>
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
                                                    error={touched.reason && Boolean(errors.reason)}
                                                    helperText={touched.reason && errors.reason}
                                                    color="secondary"
                                                />
                                            </FormControl>
                                        </center>
                                    </Grid>

                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <Stack direction="row" spacing={2} style={{ justifyContent: 'center' }}>
                                            <Button
                                                disableElevation
                                                style={{ width: '20%' }}
                                                size="large"
                                                type="reset"
                                                variant="outlined"
                                                onClick={(e) => {
                                                    resetForm();
                                                    setDateAndLeaveTimes([]);
                                                    const input = inputRef.current.children[0].children[0];
                                                    input.value = '';
                                                }}
                                                color="secondary"
                                                startIcon={<RestartAltIcon />}
                                            >
                                                Reset
                                            </Button>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                style={{ width: '20%' }}
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<SendIcon />}
                                            >
                                                Submit
                                            </Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Card
                                    sx={{
                                        height: '88%',
                                        backgroundColor: '#FAFAFA'
                                    }}
                                    variant="outlined"
                                >
                                    <CardHeader sx={{ padding: '24px 24px 10px 24px' }} title="Leave Detail" subheader={inforLeaveUnUse} />
                                    <CardContent
                                        sx={{ padding: '0px 24px' }}
                                        style={{
                                            overflowY: 'auto',
                                            maxHeight: '450px',
                                            display: 'flex',
                                            flexGrow: 1,
                                            flexDirection: 'column'
                                        }}
                                    >
                                        {dateAndLeaveTimes?.length === 0 && (
                                            <Box style={{ marginTop: '150px' }}>
                                                <center>
                                                    <ErrorOutlineIcon
                                                        sx={{
                                                            width: 100,
                                                            height: 100,
                                                            marginBottom: '4px',
                                                            color: '#E0E0E0'
                                                        }}
                                                        fontSize="medium"
                                                    />
                                                    <Typography sx={{ color: '#9E9E9E' }}>Empty Detail</Typography>
                                                </center>
                                            </Box>
                                        )}

                                        {errorMessageDetail !== '' && <Alert severity="error">{errorMessageDetail}</Alert>}
                                        <ul style={{ paddingLeft: 0 }}>
                                            {dateAndLeaveTimes?.length > 0 &&
                                                dateAndLeaveTimes?.map((item, index) => {
                                                    return (
                                                        <>
                                                            <div key={index}>
                                                                <li
                                                                    style={{
                                                                        color: 'black',
                                                                        listStyleType: 'none',
                                                                        display: 'flex',
                                                                        alignItems: 'center'
                                                                    }}
                                                                >
                                                                    <CalendarMonthIcon
                                                                        sx={{
                                                                            width: 25,
                                                                            height: 25,
                                                                            marginBottom: '4px'
                                                                        }}
                                                                        fontSize="medium"
                                                                    />
                                                                    <span style={{ marginLeft: '10px', fontSize: '16px' }}>
                                                                        {dateFormat(item?.leaveDate, 'dd/mm/yyyy')}
                                                                    </span>
                                                                    {isHoliday(item) === false && isWeekend(item) === false && (
                                                                        <>
                                                                            <Select
                                                                                sx={{ m: 1, width: '40%', marginLeft: '15px' }}
                                                                                size="small"
                                                                                labelId="demo-simple-select-label"
                                                                                value={item.dateType}
                                                                                onChange={(e) =>
                                                                                    handleSelectLeaveTime(e.target.value, index)
                                                                                }
                                                                                defaultValue="ALL_DAY"
                                                                                color="secondary"
                                                                            >
                                                                                <MenuItem value={'ALL_DAY'}>All day</MenuItem>
                                                                                <MenuItem value={'MORNING'}>Morning</MenuItem>
                                                                                <MenuItem value={'AFTERNOON'}>Afternoon</MenuItem>
                                                                            </Select>
                                                                            <Stack direction="row" spacing={1}>
                                                                                <IconButton aria-label="delete">
                                                                                    <SpeakerNotesIcon
                                                                                        fontSize="medium"
                                                                                        color={item.note === '' ? '' : 'secondary'}
                                                                                        onClick={(e) => handleClickOpen(index)}
                                                                                    />
                                                                                </IconButton>
                                                                            </Stack>
                                                                        </>
                                                                    )}
                                                                    {(isHoliday(item) === true || isWeekend(item) === true) && (
                                                                        <Box sx={{ m: 1, width: '50%', marginLeft: '15px' }} size="small">
                                                                            <Typography className="non-working-day-title">
                                                                                Non-working day
                                                                            </Typography>
                                                                        </Box>
                                                                    )}
                                                                </li>
                                                            </div>
                                                        </>
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
            <Formik
                initialValues={{
                    note: '',
                    submit: null
                }}
                validator={() => ({})}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                        handleSubmitNote(values);
                        resetForm();
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleChange, handleSubmit, isSubmitting, touched, values, resetForm, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Dialog open={open} onClose={handleClose} fullWidth>
                            <DialogTitle sx={{ fontSize: '24px' }}>Note</DialogTitle>
                            <DialogContent>
                                <TextField
                                    id="outlined-multiline-static"
                                    fullWidth
                                    multiline
                                    type="text"
                                    name="note"
                                    value={values.note}
                                    onChange={handleChange}
                                    rows={6}
                                    placeholder="Note"
                                    inputProps={{ style: { fontSize: '16px' } }}
                                    color="secondary"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    disableElevation
                                    style={{ width: '20%' }}
                                    size="large"
                                    type="reset"
                                    variant="outlined"
                                    onClick={handleClose}
                                    color="secondary"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disableElevation
                                    style={{ width: '20%' }}
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<AddIcon />}
                                    onClick={(e) => {
                                        handleClose();
                                        handleSubmit(values);
                                    }}
                                >
                                    Add
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </form>
                )}
            </Formik>
        </MainCard>
    );
};

export default SubmitForm;
