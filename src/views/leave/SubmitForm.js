// material-ui
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import { Button, FormControl, Grid, MenuItem, TextField, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import MainCard from 'ui-component/cards/MainCard';
import Autocomplete from '@mui/material/Autocomplete';

import { useTheme } from '@mui/material/styles';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

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
import { useEffect, useState } from 'react';

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

import * as React from 'react';

const managers = [
    { id: 1, name: 'Huynh Van Ngoc Duy' },
    { id: 2, name: 'Hoang Trong Thang' },
    { id: 3, name: 'Nguyen Don Kim Trung' },
    { id: 4, name: 'Truong Van Huy' },
    { id: 5, name: 'Pham Tan Hung' },
    { id: 6, name: 'Le Van Sang' },
    { id: 7, name: 'Pham Van Duc' }
];

const SubmitForm = ({ ...others }) => {
    const dispatch = useAppDispatch();
    const alert = useAppSelector((state) => state.leave.alert);
    const theme = useTheme();
    const [dateAndLeaveTimes, setDateAndLeaveTimes] = useState([]);
    const [infor, setInfor] = useState({});
    const [inforLeaveUnUse, setInforLeaveUnUse] = useState('');
    const [currentIndex, setCurrentIndex] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const initialValues = {
        managers_id: { name: '', id: null }
    };

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
                    assignTo: undefined,
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
                        const assignTo = values.assignTo.id;
                        values['assignTo'] = assignTo;
                        // handleSubmit(values);
                        // resetForm();
                        // setDateAndLeaveTimes([]);
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
                                                        />
                                                    </FormControl>
                                                </center>
                                            </Grid>
                                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(touched.password && errors.password)}
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
                                                    >
                                                        <MenuItem value={'CASUAL'}>Casual</MenuItem>
                                                        <MenuItem value={'MATERNITY'}>Maternity</MenuItem>
                                                        <MenuItem value={'REMOTE'}>Remote</MenuItem>
                                                        <MenuItem value={'ANNUAL'}>Annual</MenuItem>
                                                    </Select>
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
                                                        error={Boolean(touched.password && errors.password)}
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
                                                                }}
                                                                renderInput={(params) => <TextField {...params} />}
                                                                disablePast={true}
                                                                inputFormat="DD/MM/YYYY"
                                                            />
                                                        </LocalizationProvider>
                                                    </FormControl>
                                                </center>
                                            </Grid>
                                            <Grid item lg={4} md={4} sm={4} xs={12}>
                                                <center>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.password && errors.password)}
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
                                                                }}
                                                                renderInput={(params) => <TextField {...params} />}
                                                                disablePast={true}
                                                                inputFormat="DD/MM/YYYY"
                                                            />
                                                        </LocalizationProvider>
                                                    </FormControl>
                                                </center>
                                            </Grid>
                                            <Grid item lg={4} md={4} sm={4} xs={12}>
                                                <center>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.password && errors.password)}
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
                                                            renderInput={(params) => <TextField fullWidth name="assignTo" {...params} />}
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
                                        height: '85%'
                                    }}
                                    variant="outlined"
                                >
                                    <CardHeader sx={{ padding: '24px 24px 10px 24px' }} title="Leave Detail" subheader={inforLeaveUnUse} />
                                    <CardContent sx={{ padding: '0px 24px' }}>
                                        <ul style={{ paddingLeft: 0 }}>
                                            {dateAndLeaveTimes?.length > 0 &&
                                                dateAndLeaveTimes?.map((item, index) => {
                                                    return (
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
                                                                <Select
                                                                    sx={{ m: 1, width: '40%', marginLeft: '15px' }}
                                                                    size="small"
                                                                    labelId="demo-simple-select-label"
                                                                    value={item.dateType}
                                                                    onChange={(e) => handleSelectLeaveTime(e.target.value, index)}
                                                                    defaultValue="ALL_DAY"
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
