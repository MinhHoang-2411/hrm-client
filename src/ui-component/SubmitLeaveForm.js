// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import { Button, FormControl, Grid, MenuItem, TextField, Box, FormHelperText, Typography } from '@mui/material';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
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
import BackdropLoading from 'ui-component/BackdropLoading';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// date
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import dateFormat from 'dateformat';

// utils
import { gridSpacing } from 'store/constant';
import { getDatesInRange, addMonths } from 'utils/date-time';

// api leave
import { getEmployeeLeaveCount, getLeaveCount } from 'api/leave';
import { useEffect, useState, useRef } from 'react';

// redux
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { leaveActions } from 'store/leave/leaveSlice';
import { employeeActions } from 'store/employee/employeeSlice';

// toast
import { toast } from 'react-toastify';

// dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// scss
import '../assets/scss/leave.scss';

// validate
import { SubmitLeaveSchema } from 'utils/validate/submit-leave-schema';

// format
import { formatTimeStampToDate, formatDateMaterialForFilter } from 'utils/format/date';
import { upperCaseFirstCharacter } from 'utils/string';

import * as React from 'react';

// constant
import { LEAVE_TYPE } from 'constants/index';

// i18n
import { useTranslation } from 'react-i18next';
import useResponsive from 'hooks/useResponsive';

const SubmitLeaveForm = ({ type, ...others }) => {
    const [openStartDate, setOpenStartDate] = useState(false);
    const [openEndDate, setOpenEndDate] = useState(false);
    const [personOnLeaveId, setPersonOnLeaveId] = useState(null);

    const dispatch = useAppDispatch();
    const alert = useAppSelector((state) => state.leave.alert);
    const loading = useAppSelector((state) => state.leave.loading);
    const theme = useTheme();
    const [dateAndLeaveTimes, setDateAndLeaveTimes] = useState([]);
    const [inforLeaveUnUse, setInforLeaveUnUse] = useState('');
    const [currentIndex, setCurrentIndex] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [openModelConfirm, setOpenModelConfirm] = useState(false);
    const [errorMessageDetail, setErrorMessageDetail] = useState('');
    const [leaveUnUser, setLeaveUnUse] = useState(null);
    const formikRef = useRef();
    const inputRef = useRef();
    const [leaveType, setLeaveType] = useState('');
    const [fromError, setFromError] = useState(null);
    const [toError, setToError] = useState(null);
    const { t, i18n } = useTranslation();
    const [openLoadingSubmit, setOpenLoadingSubmit] = React.useState(false);

    //Responsive hook
    const isMobile = useResponsive('mobile');
    const isMobileAndTablet = useResponsive('mobileAndTablet');

    const steps =
        type == 'normal'
            ? [t('Submit a leave'), t('Manager confirms the leave'), t('Admin approves the leave')]
            : [t('Submit a leave'), t('Admin approves the leave')];
    // get data
    const listHolidays = useAppSelector((state) => state.leave.listHoliday);
    const listManager = useAppSelector((state) => state.employee.listData);
    const onKeyDown = (e) => {
        e.preventDefault();
    };
    const sortListManagerByAlphabetically = (listManager) => {
        listManager = listManager.sort(function (a, b) {
            let fullNameA = a.user.firstName.toLowerCase() + ' ' + a.user.lastName.toLowerCase();
            let fullNameB = b.user.firstName.toLowerCase() + ' ' + b.user.lastName.toLowerCase();

            if (fullNameA < fullNameB) {
                return -1;
            }
            if (fullNameA > fullNameB) {
                return 1;
            }
            return 0;
        });
    };

    const listManagerSortByAlphabetically = [...listManager];
    sortListManagerByAlphabetically(listManagerSortByAlphabetically);

    const handleClickOpen = (idx) => {
        setOpen(true);
        setCurrentIndex(idx);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenModelConfirm(false);
    };

    const handleClickModelConfirm = () => {
        setOpenModelConfirm(true);
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
        if (weekendAndHolidayFilter(dateAndLeaveTimes).length === 0 && leaveType !== 'MATERNITY') {
            setErrorMessageDetail('Invalid leave date');
        } else if (weekendAndHolidayFilter(dateAndLeaveTimes).length > 5 && leaveType !== 'MATERNITY') {
            setErrorMessageDetail(t('A leave cannot exceed 5 working days.'));
        } else if (openModelConfirm === false) {
            const assignTo = type == 'normal' ? value.assignTo?.id : JSON.parse(localStorage.getItem('employee'))?.id;
            if (type == 'support') {
                value['personOnLeave'] = `${value.personOnLeave.user.firstName} ${value.personOnLeave.user.lastName}`;
            }
            if (type == 'normal') {
                value['assignTo'] = assignTo;
            }
            value['title'] = value['title'].trim();
            value['reason'] = value['reason'].trim();
            if (type == 'normal') {
                dispatch(
                    leaveActions.submit({
                        ...value,
                        leaveDetailsDTOS: weekendAndHolidayFilter(dateAndLeaveTimes)
                    })
                );
            } else if (type == 'support') {
                dispatch(
                    leaveActions.supportSubmit({
                        ...value,
                        leaveDetailsDTOS: weekendAndHolidayFilter(dateAndLeaveTimes),
                        id: personOnLeaveId
                    })
                );

                setLeaveUnUse(null);
            }
            formikRef.current?.resetForm();
            const input = inputRef.current.children[0].children[0];
            input.value = '';
            setDateAndLeaveTimes([]);
            setLeaveType('');
        }
    };

    const handleSubmitNote = (value) => {
        const tmpDate = [...dateAndLeaveTimes];
        tmpDate[currentIndex].note = value.note.trim();
        setDateAndLeaveTimes(tmpDate);
        handleClose();
    };

    const checkValidDate = (inDates) => {
        try {
            inDates?.forEach((date) => dateFormat(date.leaveDate, 'dd/mm/yyyy'));
            return true;
        } catch {
            return false;
        }
    };

    const showToastMessage = (param) => {
        if (param === 'success') {
            toast.success(t('Submit leave successfully'), {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if (param === 'The leave date has duplicated with that in the previously existing leave.') {
            toast.error(t('The leave date has duplicated with that in the previously existing leave.'), {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    const handleGetLeaveCount = async () => {
        return await getLeaveCount();
    };
    const handleGetEmployeeLeaveCount = async (id) => {
        return await getEmployeeLeaveCount(id);
    };

    const checkValidLeave = () => {
        if (
            formikRef.current?.isValid &&
            formikRef.current?.dirty &&
            !(weekendAndHolidayFilter(dateAndLeaveTimes).length === 0 && leaveType !== 'MATERNITY') &&
            !(weekendAndHolidayFilter(dateAndLeaveTimes).length > 5 && leaveType !== 'MATERNITY')
        )
            setOpenModelConfirm(true);
    };

    useEffect(() => {
        if (type == 'normal') {
            const information = handleGetLeaveCount();
            information.then(function (result) {
                let leaveUnUse = result.data.leaveUnUse < 0 ? 0 : result.data.leaveUnUse;
                setLeaveUnUse(leaveUnUse);
                if (leaveUnUse === 0 || leaveUnUse === 1) {
                    setInforLeaveUnUse(leaveUnUse + ' ');
                } else {
                    setInforLeaveUnUse(leaveUnUse + ' ');
                }
            });
        }
        showToastMessage(alert);
    }, [alert]);

    useEffect(() => {
        dispatch(leaveActions.getHolidays({}));
        type == 'normal' ? dispatch(employeeActions.fetchData({ 'position.in': 'MANAGER' })) : dispatch(employeeActions.fetchData({}));
    }, []);

    return (
        <MainCard
            contentSX={{ px: { xs: 2, md: 3 }, py: { xs: 0, md: 3 } }}
            title={t('Leave Request')}
            onClick={(e) => {
                e.stopPropagation();
                setOpenEndDate(false);
                setOpenStartDate(false);
            }}
        >
            <Formik
                innerRef={formikRef}
                initialValues={
                    type == 'normal'
                        ? {
                              title: '',
                              type: '',
                              reason: '',
                              startDate: null,
                              endDate: null,
                              assignTo: null,
                              submit: null
                          }
                        : {
                              title: '',
                              type: '',
                              reason: '',
                              startDate: null,
                              endDate: null,
                              personOnLeave: null,
                              submit: null
                          }
                }
                validationSchema={SubmitLeaveSchema(type)}
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
                        <Grid container spacing={{ md: gridSpacing, sm: 0 }}>
                            <Grid item lg={8} md={8} sm={12}>
                                <Grid container spacing={{ md: gridSpacing, sm: 0 }} sx={{ mt: 1 }}>
                                    {!isMobile && (
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <Box sx={{ width: '100%' }}>
                                                <Stepper sx={{ width: '100%' }}>
                                                    {steps.map((label) => (
                                                        <Step key={label}>
                                                            <StepLabel className="MuiStepIcon-root">{label}</StepLabel>
                                                        </Step>
                                                    ))}
                                                </Stepper>
                                            </Box>
                                        </Grid>
                                    )}
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <Grid container spacing={{ md: gridSpacing, sm: 1, xs: 0 }}>
                                            <Grid item sm={8} xs={12}>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(touched.title && errors.title)}
                                                    sx={{ ...theme.typography.customInput }}
                                                >
                                                    <Box className="title-form">
                                                        <span>{t('Title')}</span>
                                                        <span className="require">(*)</span>
                                                    </Box>

                                                    <TextField
                                                        // size="small"
                                                        id="outlined-adornment-title"
                                                        type="text"
                                                        name="title"
                                                        placeholder={t('Title')}
                                                        value={values.title}
                                                        onChange={handleChange}
                                                        inputProps={{ style: { fontSize: '16px' } }}
                                                        className="form-input"
                                                        error={touched.title && Boolean(errors.title)}
                                                        helperText={t(touched.title) && t(errors.title)}
                                                        color="secondary"
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item sm={4} xs={12}>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(touched.type && errors.type)}
                                                    sx={{ ...theme.typography.customInput }}
                                                >
                                                    <Box className="title-form">
                                                        <span>{t('Leave Type')}</span>
                                                        <span className="require">(*)</span>
                                                    </Box>
                                                    <Select
                                                        // sx={{ height: isMobile ? '43px' : '54px' }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        name="type"
                                                        value={values.type}
                                                        onChange={(event) => {
                                                            setFieldValue('type', event.target.value);
                                                            setLeaveType(event.target.value);
                                                        }}
                                                        error={touched.type && Boolean(errors.type)}
                                                        className="form-input"
                                                        color="secondary"
                                                    >
                                                        {LEAVE_TYPE?.map((item, index) => (
                                                            <MenuItem key={index} value={item}>
                                                                {t(upperCaseFirstCharacter(item))}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    <FormHelperText sx={{ color: '#ff4d4f', position: 'absolute', bottom: '-22px' }}>
                                                        {touched?.type && t(errors?.type)}
                                                    </FormHelperText>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <Grid container spacing={{ md: gridSpacing, sm: 1 }}>
                                            <Grid item lg={4} md={4} sm={4} xs={12}>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(touched.startDate && errors.startDate)}
                                                    sx={{ ...theme.typography.customInput }}
                                                >
                                                    <Box className="title-form">
                                                        <span>{t('From')}</span>
                                                        <span className="require">(*)</span>
                                                    </Box>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        {!isMobile ? (
                                                            <DatePicker
                                                                value={values.startDate}
                                                                name="startDate"
                                                                closeOnSelect={true}
                                                                onChange={(value) => {
                                                                    setFieldValue('startDate', value);
                                                                    handleGetArrayDate(value, values.endDate);
                                                                    setErrorMessageDetail('');
                                                                    setOpenStartDate(false);
                                                                }}
                                                                PopperProps={{
                                                                    onClick: (e) => e.stopPropagation()
                                                                }}
                                                                open={openStartDate}
                                                                onError={(newError) => setFromError(newError)}
                                                                onChangeRaw={(e) => e.preventDefault()}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        // onKeyDown={onKeyDown}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setOpenStartDate(true);
                                                                            setOpenEndDate(false);
                                                                        }}
                                                                        inputProps={{
                                                                            ...params.inputProps,
                                                                            readOnly: true,
                                                                            sx: { cursor: 'pointer' }
                                                                        }}
                                                                        error={touched.startDate && Boolean(errors.startDate)}
                                                                        helperText={
                                                                            fromError === 'invalidDate'
                                                                                ? touched.startDate &&
                                                                                  t('Please follow the format dd/mm/yyyy')
                                                                                : touched.startDate && t(errors.startDate)
                                                                        }
                                                                        color="secondary"
                                                                    />
                                                                )}
                                                                disablePast={true}
                                                                inputFormat="DD/MM/YYYY"
                                                                className="form-input"
                                                            />
                                                        ) : (
                                                            <MobileDatePicker
                                                                value={values.startDate}
                                                                name="startDate"
                                                                closeOnSelect={true}
                                                                onChange={(value) => {
                                                                    setFieldValue('startDate', value);
                                                                    handleGetArrayDate(value, values.endDate);
                                                                    setErrorMessageDetail('');
                                                                    setOpenStartDate(false);
                                                                }}
                                                                onError={(newError) => setFromError(newError)}
                                                                onChangeRaw={(e) => e.preventDefault()}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        error={touched.startDate && Boolean(errors.startDate)}
                                                                        helperText={
                                                                            fromError === 'invalidDate'
                                                                                ? touched.startDate &&
                                                                                  t('Please follow the format dd/mm/yyyy')
                                                                                : touched.startDate && t(errors.startDate)
                                                                        }
                                                                        color="secondary"
                                                                    />
                                                                )}
                                                                disablePast={true}
                                                                inputFormat="DD/MM/YYYY"
                                                                className="form-input"
                                                            />
                                                        )}
                                                    </LocalizationProvider>
                                                </FormControl>
                                            </Grid>
                                            <Grid item lg={4} md={4} sm={4} xs={12}>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(touched.endDate && errors.endDate)}
                                                    sx={{ ...theme.typography.customInput }}
                                                >
                                                    <Box className="title-form">
                                                        <span>{t('To')}</span>
                                                        <span className="require">(*)</span>
                                                    </Box>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        {!isMobile ? (
                                                            <DatePicker
                                                                id="outlined-adornment-leave-to"
                                                                type="date"
                                                                name="endDate"
                                                                value={values.endDate}
                                                                onChange={(value) => {
                                                                    setFieldValue('endDate', value);
                                                                    handleGetArrayDate(values.startDate, value);
                                                                    setErrorMessageDetail('');
                                                                    setOpenEndDate(false);
                                                                }}
                                                                PopperProps={{
                                                                    onClick: (e) => e.stopPropagation()
                                                                }}
                                                                open={openEndDate}
                                                                closeOnSelect={true}
                                                                onError={(newError) => setToError(newError)}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setOpenEndDate(true);
                                                                            setOpenStartDate(false);
                                                                        }}
                                                                        inputProps={{
                                                                            ...params.inputProps,
                                                                            readOnly: true,
                                                                            sx: { cursor: 'pointer' }
                                                                        }}
                                                                        error={touched.endDate && Boolean(errors.endDate)}
                                                                        helperText={
                                                                            toError === 'invalidDate'
                                                                                ? touched.endDate &&
                                                                                  t('Please follow the format dd/mm/yyyy')
                                                                                : touched.endDate && t(errors.endDate)
                                                                        }
                                                                        color="secondary"
                                                                    />
                                                                )}
                                                                disablePast={true}
                                                                inputFormat="DD/MM/YYYY"
                                                                className="form-input"
                                                            />
                                                        ) : (
                                                            <MobileDatePicker
                                                                id="outlined-adornment-leave-to"
                                                                type="date"
                                                                name="endDate"
                                                                value={values.endDate}
                                                                onChange={(value) => {
                                                                    setFieldValue('endDate', value);
                                                                    handleGetArrayDate(values.startDate, value);
                                                                    setErrorMessageDetail('');
                                                                    setOpenEndDate(false);
                                                                }}
                                                                closeOnSelect={true}
                                                                onError={(newError) => setToError(newError)}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        error={touched.endDate && Boolean(errors.endDate)}
                                                                        helperText={
                                                                            toError === 'invalidDate'
                                                                                ? touched.endDate &&
                                                                                  t('Please follow the format dd/mm/yyyy')
                                                                                : touched.endDate && t(errors.endDate)
                                                                        }
                                                                        color="secondary"
                                                                    />
                                                                )}
                                                                disablePast={true}
                                                                inputFormat="DD/MM/YYYY"
                                                                className="form-input"
                                                            />
                                                        )}
                                                    </LocalizationProvider>
                                                </FormControl>
                                            </Grid>
                                            <Grid item lg={4} md={4} sm={4} xs={12}>
                                                <FormControl
                                                    fullWidth
                                                    error={
                                                        type == 'normal'
                                                            ? Boolean(touched.assignTo && errors.assignTo)
                                                            : Boolean(touched.personOnLeave && errors.personOnLeave)
                                                    }
                                                    sx={{ ...theme.typography.customInput }}
                                                >
                                                    <Box className="title-form">
                                                        <span>{type == 'normal' ? t('Assign To') : t('Person On Leave')}</span>
                                                        <span className="require">(*)</span>
                                                    </Box>
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        name={type == 'normal' ? 'assignTo' : 'personOnLeave'}
                                                        value={type == 'normal' ? values.assignTo : values.personOnLeave}
                                                        onChange={async (e, value) => {
                                                            if (type == 'normal') {
                                                                setFieldValue('assignTo', value);
                                                            } else if (type == 'support') {
                                                                setFieldValue('personOnLeave', value);
                                                                setPersonOnLeaveId(value?.id);
                                                            }
                                                            const res = handleGetEmployeeLeaveCount(value?.id);
                                                            res.then(function (result) {
                                                                let leaveUnUse = result.data.leaveUnUse < 0 ? 0 : result.data.leaveUnUse;
                                                                setLeaveUnUse(leaveUnUse);
                                                                if (leaveUnUse === 0 || leaveUnUse === 1) {
                                                                    setInforLeaveUnUse(leaveUnUse + ' ');
                                                                } else {
                                                                    setInforLeaveUnUse(leaveUnUse + ' ');
                                                                }
                                                            });
                                                        }}
                                                        noOptionsText={t('No Options')}
                                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                                        options={listManagerSortByAlphabetically}
                                                        getOptionLabel={(option) => option.user?.firstName + ' ' + option.user?.lastName}
                                                        renderOption={(props, option) => (
                                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                                {option.user?.firstName} {option.user?.lastName}
                                                            </Box>
                                                        )}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                fullWidthpersonOnLeave
                                                                ref={inputRef}
                                                                name={type == 'normal' ? 'assignTo' : 'personOnLeave'}
                                                                {...params}
                                                                error={
                                                                    type == 'normal'
                                                                        ? touched.assignTo && Boolean(errors.assignTo)
                                                                        : touched.personOnLeave && Boolean(errors.personOnLeave)
                                                                }
                                                                helperText={
                                                                    type == 'normal'
                                                                        ? touched.assignTo && t(errors.assignTo)
                                                                        : touched.personOnLeave && t(errors.personOnLeave)
                                                                }
                                                                color="secondary"
                                                            />
                                                        )}
                                                        className="form-input"
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <FormControl
                                            fullWidth
                                            error={Boolean(touched.password && errors.password)}
                                            sx={{ ...theme.typography.customInput }}
                                        >
                                            <Box className="title-form">
                                                <span>{t('Reason')}</span>
                                                <span className="require">(*)</span>
                                            </Box>
                                            <TextField
                                                id="outlined-multiline-static"
                                                multiline
                                                name="reason"
                                                type="text"
                                                rows={6}
                                                placeholder={t('Reason')}
                                                value={values.reason}
                                                onChange={handleChange}
                                                inputProps={{ style: { fontSize: '16px' } }}
                                                error={touched.reason && Boolean(errors.reason)}
                                                helperText={t(touched.reason) && t(errors.reason)}
                                                color="secondary"
                                            />
                                        </FormControl>
                                    </Grid>
                                    {/* Mobile Leave Detail */}
                                    {isMobileAndTablet && (
                                        <Grid xs={12} sx={{ my: 1 }}>
                                            <Card
                                                sx={{
                                                    backgroundColor: '#FAFAFA'
                                                }}
                                                variant="outlined"
                                            >
                                                <CardHeader
                                                    sx={{ padding: '24px 24px 10px 24px' }}
                                                    title={t('Leave Detail')}
                                                    subheader={
                                                        leaveUnUser
                                                            ? inforLeaveUnUse + t('days of Annual Leave')
                                                            : leaveUnUser !== null
                                                            ? '0 ' + t('day of Annual Leave')
                                                            : ''
                                                    }
                                                />
                                                <CardContent
                                                    sx={{ p: '4px' }}
                                                    style={{
                                                        overflowY: 'auto',
                                                        maxHeight: '450px',
                                                        display: 'flex',
                                                        flexGrow: 1,
                                                        flexDirection: 'column'
                                                    }}
                                                >
                                                    {dateAndLeaveTimes?.length === 0 && leaveType !== 'MATERNITY' ? (
                                                        <Box>
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
                                                                <Typography sx={{ color: '#9E9E9E' }}>{t('Empty Detail')}</Typography>
                                                            </center>
                                                        </Box>
                                                    ) : (
                                                        <div></div>
                                                    )}

                                                    {errorMessageDetail !== '' && <Alert severity="error">{errorMessageDetail}</Alert>}
                                                    {leaveType === 'MATERNITY' && (
                                                        <Alert severity="info" sx={{ display: 'flex', alignItems: 'center' }}>
                                                            {t('Your leave type is Maternity.')} <br />
                                                            {t("You don't need to select Leave Detail.")}
                                                        </Alert>
                                                    )}
                                                    <ul style={{ paddingLeft: 0 }}>
                                                        {values.type !== 'MATERNITY' &&
                                                            dateAndLeaveTimes?.length > 0 &&
                                                            checkValidDate(dateAndLeaveTimes) &&
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
                                                                                        <MenuItem value={'ALL_DAY'}>
                                                                                            {t('All day')}
                                                                                        </MenuItem>
                                                                                        <MenuItem value={'MORNING'}>
                                                                                            {t('Morning')}
                                                                                        </MenuItem>
                                                                                        <MenuItem value={'AFTERNOON'}>
                                                                                            {t('Afternoon')}
                                                                                        </MenuItem>
                                                                                    </Select>
                                                                                    <Stack direction="row" spacing={1}>
                                                                                        <IconButton
                                                                                            aria-label="delete"
                                                                                            onClick={(e) => handleClickOpen(index)}
                                                                                        >
                                                                                            <SpeakerNotesIcon
                                                                                                fontSize="medium"
                                                                                                color={item.note === '' ? '' : 'secondary'}
                                                                                            />
                                                                                        </IconButton>
                                                                                    </Stack>
                                                                                </>
                                                                            )}
                                                                            {(isHoliday(item) === true || isWeekend(item) === true) && (
                                                                                <Box
                                                                                    sx={{ m: 1, width: '50%', marginLeft: '15px' }}
                                                                                    size="small"
                                                                                >
                                                                                    <Typography className="non-working-day-title">
                                                                                        {t('Non-working day')}
                                                                                    </Typography>
                                                                                </Box>
                                                                            )}
                                                                        </li>
                                                                    </div>
                                                                );
                                                            })}
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )}
                                    {/* end Mobile Leave Detail */}

                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <Stack direction="row" spacing={2} style={{ justifyContent: 'center' }}>
                                            <Button
                                                disableElevation
                                                size={isMobile ? 'medium' : 'large'}
                                                type="reset"
                                                variant="outlined"
                                                onClick={(e) => {
                                                    if (type == 'support') {
                                                        setLeaveUnUse(null);
                                                    }
                                                    resetForm();
                                                    setDateAndLeaveTimes([]);
                                                    const input = inputRef.current.children[0].children[0];
                                                    input.value = '';
                                                }}
                                                color="secondary"
                                                startIcon={<RestartAltIcon />}
                                            >
                                                {t('Reset')}
                                            </Button>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                size={isMobile ? 'medium' : 'large'}
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<SendIcon />}
                                                onClick={(e) => checkValidLeave()}
                                            >
                                                {t('Submit')}
                                            </Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid>
                                <Dialog open={openModelConfirm} onClose={handleClose} fullWidth>
                                    <DialogTitle sx={{ fontSize: '24px' }}>{t('Confirm')}</DialogTitle>
                                    <DialogContent>
                                        {type == 'normal' && leaveUnUser === 0 ? (
                                            <Box>
                                                <span style={{ fontSize: '15px' }}>
                                                    {t('You have used up your leave for this year. Would you like to submit this leave?')}
                                                </span>
                                            </Box>
                                        ) : (
                                            <Box>
                                                <span style={{ fontSize: '15px' }}>{t('Are you sure to submit this leave?')}</span>
                                            </Box>
                                        )}
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
                                            {t('Cancel')}
                                        </Button>
                                        <Button
                                            disableElevation
                                            style={{ width: '20%' }}
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            onClick={(e) => {
                                                handleClose();
                                                handleSubmit(values);
                                            }}
                                        >
                                            {t('Submit')}
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>

                            {!isMobileAndTablet && (
                                <Grid item lg={4} md={4} sm={12}>
                                    <Card
                                        sx={{
                                            height: '88%',
                                            backgroundColor: '#FAFAFA'
                                        }}
                                        variant="outlined"
                                    >
                                        <CardHeader
                                            sx={{ padding: '24px 24px 10px 24px' }}
                                            title={t('Leave Detail')}
                                            subheader={
                                                leaveUnUser
                                                    ? inforLeaveUnUse + t('days of Annual Leave')
                                                    : leaveUnUser !== null
                                                    ? '0 ' + t('day of Annual Leave')
                                                    : ''
                                            }
                                        />
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
                                            {dateAndLeaveTimes?.length === 0 && leaveType !== 'MATERNITY' ? (
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
                                                        <Typography sx={{ color: '#9E9E9E' }}>{t('Empty Detail')}</Typography>
                                                    </center>
                                                </Box>
                                            ) : (
                                                <div></div>
                                            )}

                                            {errorMessageDetail !== '' && <Alert severity="error">{errorMessageDetail}</Alert>}
                                            {leaveType === 'MATERNITY' && (
                                                <Alert severity="info" sx={{ display: 'flex', alignItems: 'center' }}>
                                                    {t('Your leave type is Maternity.')} <br />
                                                    {t("You don't need to select Leave Detail.")}
                                                </Alert>
                                            )}
                                            <ul style={{ paddingLeft: 0 }}>
                                                {values.type !== 'MATERNITY' &&
                                                    dateAndLeaveTimes?.length > 0 &&
                                                    checkValidDate(dateAndLeaveTimes) &&
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
                                                                                <MenuItem value={'ALL_DAY'}>{t('All day')}</MenuItem>
                                                                                <MenuItem value={'MORNING'}>{t('Morning')}</MenuItem>
                                                                                <MenuItem value={'AFTERNOON'}>{t('Afternoon')}</MenuItem>
                                                                            </Select>
                                                                            <Stack direction="row" spacing={1}>
                                                                                <IconButton
                                                                                    aria-label="delete"
                                                                                    onClick={(e) => handleClickOpen(index)}
                                                                                >
                                                                                    <SpeakerNotesIcon
                                                                                        fontSize="medium"
                                                                                        color={item.note === '' ? '' : 'secondary'}
                                                                                    />
                                                                                </IconButton>
                                                                            </Stack>
                                                                        </>
                                                                    )}
                                                                    {(isHoliday(item) === true || isWeekend(item) === true) && (
                                                                        <Box sx={{ m: 1, width: '50%', marginLeft: '15px' }} size="small">
                                                                            <Typography className="non-working-day-title">
                                                                                {t('Non-working day')}
                                                                            </Typography>
                                                                        </Box>
                                                                    )}
                                                                </li>
                                                            </div>
                                                        );
                                                    })}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )}
                            <Grid>
                                {loading ? setOpenLoadingSubmit(true) : setOpenLoadingSubmit(false)}
                                <div>
                                    <BackdropLoading open={openLoadingSubmit} />
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            <Formik
                initialValues={{
                    note: dateAndLeaveTimes[currentIndex]?.note,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    note: Yup.string()
                        .min(0, 'Please enter between 0 and 255 characters')
                        .max(255, 'Please enter between 0 and 255 characters')
                        .trim()
                })}
                enableReinitialize={true}
                validateOnChange={true}
                validateOnMount={true}
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
                            <DialogTitle sx={{ fontSize: '24px' }}>{t('Note')}</DialogTitle>
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
                                    placeholder={t('Note')}
                                    inputProps={{ style: { fontSize: '16px' } }}
                                    color="secondary"
                                    error={touched.note && Boolean(errors.note)}
                                    helperText={t(touched.note) && t(errors.note)}
                                    style={{ marginTop: '5px' }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    disableElevation
                                    size={isMobile ? 'medium' : 'large'}
                                    type="reset"
                                    variant="outlined"
                                    onClick={(e) => {
                                        resetForm();
                                        handleClose();
                                    }}
                                    color="secondary"
                                >
                                    {t('Cancel')}
                                </Button>
                                <Button
                                    disableElevation
                                    size={isMobile ? 'medium' : 'large'}
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<AddIcon />}
                                    onClick={(e) => {
                                        handleSubmit(values);
                                    }}
                                >
                                    {t('Add')}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </form>
                )}
            </Formik>
        </MainCard>
    );
};

export default SubmitLeaveForm;
