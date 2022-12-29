// material
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import DevicesIcon from '@mui/icons-material/Devices';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Button, FormControl, Grid, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// table
import { OrderTableHead } from 'ui-component/table/table-head';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// redux
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { assetActions } from 'store/asset/assetSlice';

// react
import * as React from 'react';

// date
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// format
import { upperCaseFirstCharacter } from 'utils/string';

// lodash
import _ from 'lodash';

// scss
import '../../../assets/scss/asset.scss';

// validate
import { SubmitRequestAssetSchema } from '../../../utils/validate/submit-request-asset-schema';

const headCells = [
    {
        id: 'image',
        align: 'center',
        disablePadding: true,
        label: ''
    },
    {
        id: 'description',
        align: 'left',
        disablePadding: false,
        label: 'Description',
        width: '250px'
    },
    {
        id: 'serialNumber',
        align: 'left',
        disablePadding: false,
        label: 'Serial Number'
    },
    {
        id: 'note',
        align: 'left',
        disablePadding: false,
        label: 'Note'
    },
    {
        id: 'status',
        align: 'left',
        disablePadding: false,
        label: 'Status'
    }
];

const boxColors = [
    {
        status: 'UNAVAILABLE',
        color: 'warning.dark'
    },
    {
        status: 'DAMAGED',
        color: 'orange.dark'
    },
    {
        status: 'AVAILABLE',
        color: 'success.dark'
    },
    {
        status: 'LOST',
        color: 'grey'
    }
];

const ColorBox = ({ bgcolor, title }) => (
    <>
        <Card sx={{ borderRadius: '0 !important' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '75px',
                    height: '40px',
                    bgcolor,
                    color: 'white',
                    borderRadius: '3px !important'
                }}
            >
                {title && (
                    <Typography variant="subtitle1" color="inherit">
                        {title}
                    </Typography>
                )}
            </Box>
        </Card>
    </>
);

export default function CardList({ data = [], ...others }) {
    const dispatch = useAppDispatch();
    const [order] = React.useState('asc');
    const [orderBy] = React.useState('trackingNo');
    const [open, setOpen] = React.useState(false);
    const [openForm, setOpenForm] = React.useState(false);
    const theme = useTheme();
    const modelDetail = useAppSelector((state) => state.asset.model);
    const [idSelected, setIdSelected] = React.useState('');

    const handleClickOpen = (idx) => {
        setOpen(true);
        dispatch(assetActions.getModelDetail(idx));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenForm = (idx) => {
        setOpenForm(true);
        setIdSelected(idx);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    };

    const handleSubmitRequestAsset = (value) => {
        const assetModel = {
            id: idSelected
        };
        dispatch(
            assetActions.submit({
                ...value,
                assetModel: assetModel
            })
        );
    };

    return (
        <Box>
            <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Grid container spacing={3}>
                        {data?.length > 0 &&
                            data?.map((item, index) => {
                                return (
                                    <Grid item lg={3} md={3} sm={4} xs={4} key={index}>
                                        <Card className="card">
                                            <CardMedia
                                                component="img"
                                                style={{ height: '160px' }}
                                                image="https://macstores.vn/tin-tuc/wp-content/uploads/2020/03/macbook-air-2020-1.jpg"
                                                alt="Asset"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {item?.modelName}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item?.description}
                                                </Typography>
                                                <Typography>
                                                    Available: {item?.assets.filter((ite) => ite.status === 'AVAILABLE').length}
                                                </Typography>
                                                <Typography>
                                                    Unavailable:{' '}
                                                    {item?.assets.length - item?.assets.filter((ite) => ite.status === 'AVAILABLE').length}
                                                </Typography>
                                            </CardContent>
                                            <CardActions className="card-action">
                                                <Button
                                                    disableElevation
                                                    style={{ width: '35%' }}
                                                    size="small"
                                                    type="reset"
                                                    variant="outlined"
                                                    color="secondary"
                                                    startIcon={<InfoIcon />}
                                                    onClick={(e) => handleClickOpen(item.id)}
                                                >
                                                    <span>Detail</span>
                                                </Button>

                                                <Button
                                                    size="small"
                                                    disableElevation
                                                    style={{ width: '35%' }}
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={(e) => handleClickOpenForm(item.id)}
                                                    disabled={item?.assets.filter((ite) => ite.status === 'AVAILABLE').length === 0}
                                                    startIcon={<ArrowCircleUpIcon />}
                                                >
                                                    Request
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        {data.length === 0 && (
                            <h3 style={{ marginLeft: 'auto', marginRight: 'auto', paddingTop: '20px' }}>
                                There is currently no data available
                            </h3>
                        )}
                    </Grid>
                    {_.isEmpty(modelDetail) === false && (
                        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                            <DialogTitle sx={{ fontSize: '24px' }}>Asset Model Detail</DialogTitle>
                            <DialogContent dividers="paper">
                                <Card>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="300"
                                        image="https://macstores.vn/tin-tuc/wp-content/uploads/2020/03/macbook-air-2020-1.jpg"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Name: {modelDetail.modelName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Description: {modelDetail.description}
                                        </Typography>
                                        <Typography variant="h5">List asset:</Typography>
                                        {modelDetail.assets?.length > 0 && (
                                            <Table aria-labelledby="tableTitle">
                                                <OrderTableHead headCells={headCells} order={order} orderBy={orderBy} />
                                                <TableBody>
                                                    {modelDetail.assets?.length > 0 &&
                                                        modelDetail.assets?.map((item, index) => {
                                                            return (
                                                                <TableRow
                                                                    key={index}
                                                                    className={`row-detail-asset ${
                                                                        index == modelDetail.assets?.length - 1 && 'last-row'
                                                                    }`}
                                                                >
                                                                    <TableCell>
                                                                        <Avatar>
                                                                            <DevicesIcon />
                                                                        </Avatar>
                                                                    </TableCell>
                                                                    <TableCell>{item?.description}</TableCell>
                                                                    <TableCell>{item?.serialNumber}</TableCell>
                                                                    <TableCell>{item?.note}</TableCell>
                                                                    <TableCell>
                                                                        <ColorBox
                                                                            bgcolor={
                                                                                boxColors.filter((it) => it.status === item?.status)
                                                                                    .length === 0
                                                                                    ? 'primary.light'
                                                                                    : boxColors
                                                                                          .filter((it) => it.status === item?.status)
                                                                                          .at(0)?.color
                                                                            }
                                                                            title={upperCaseFirstCharacter(item?.status)}
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                </TableBody>
                                            </Table>
                                        )}
                                        {modelDetail.assets.length === 0 && <span className="empty-message">No data available</span>}
                                    </CardContent>
                                </Card>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    disableElevation
                                    style={{ width: '15%' }}
                                    size="large"
                                    type="reset"
                                    variant="outlined"
                                    onClick={handleClose}
                                    color="secondary"
                                >
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>
                    )}
                </Grid>
            </Grid>
            <Formik
                initialValues={{
                    title: 'Request Asset',
                    description: '',
                    issuedDate: null,
                    returnedDate: null,
                    submit: null
                }}
                validationSchema={SubmitRequestAssetSchema()}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                        handleSubmitRequestAsset(values);
                        resetForm();
                        handleCloseForm();
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleChange, handleSubmit, isSubmitting, touched, values, resetForm, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Dialog open={openForm} onClose={handleCloseForm} fullWidth>
                            <DialogTitle sx={{ fontSize: '24px' }}>Request Asset</DialogTitle>
                            <DialogContent>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.title && errors.title)}
                                    sx={{ ...theme.typography.customInput }}
                                    className="title-form"
                                >
                                    <span className="title-form">Title</span>
                                    <TextField
                                        id="outlined-multiline-static"
                                        name="title"
                                        type="text"
                                        placeholder="Title"
                                        value={values.title}
                                        onChange={handleChange}
                                        error={touched.title && Boolean(errors.title)}
                                        helperText={touched.title && errors.title}
                                        color="secondary"
                                    />
                                </FormControl>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.description && errors.description)}
                                    sx={{ ...theme.typography.customInput }}
                                    className="title-form"
                                >
                                    <span className="title-form">Description</span>
                                    <TextField
                                        id="outlined-multiline-static"
                                        name="description"
                                        type="text"
                                        placeholder="Description"
                                        value={values.description}
                                        onChange={handleChange}
                                        error={touched.description && Boolean(errors.description)}
                                        helperText={touched.description && errors.description}
                                        color="secondary"
                                    />
                                </FormControl>
                                <Grid container spacing={3}>
                                    <Grid item lg={6} md={6} sm={6} xs={6}>
                                        <FormControl
                                            fullWidth
                                            error={Boolean(touched.issuedDate && errors.issuedDate)}
                                            sx={{ ...theme.typography.customInput }}
                                            className="title-form"
                                        >
                                            <span className="title-form">Issued Date</span>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    value={values.issuedDate}
                                                    name="issuedDate"
                                                    onChange={(value) => {
                                                        setFieldValue('issuedDate', value);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            color="secondary"
                                                            error={touched.issuedDate && Boolean(errors.issuedDate)}
                                                            helperText={touched.issuedDate && errors.issuedDate}
                                                        />
                                                    )}
                                                    disablePast={true}
                                                    inputFormat="DD/MM/YYYY"
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={6} xs={6}>
                                        <FormControl
                                            fullWidth
                                            error={Boolean(touched.returnedDate && errors.returnedDate)}
                                            sx={{ ...theme.typography.customInput }}
                                            className="title-form"
                                        >
                                            <span className="title-form">Returned Date</span>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    id="outlined-adornment-leave-to"
                                                    type="date"
                                                    name="returnedDate"
                                                    value={values.returnedDate}
                                                    onChange={(value) => {
                                                        setFieldValue('returnedDate', value);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            color="secondary"
                                                            error={touched.returnedDate && Boolean(errors.returnedDate)}
                                                            helperText={touched.returnedDate && errors.returnedDate}
                                                        />
                                                    )}
                                                    disablePast={true}
                                                    inputFormat="DD/MM/YYYY"
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    disableElevation
                                    style={{ width: '20%' }}
                                    size="large"
                                    type="reset"
                                    variant="outlined"
                                    onClick={() => {
                                        resetForm();
                                        handleCloseForm();
                                    }}
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
                                    startIcon={<ArrowCircleUpIcon />}
                                    onClick={(e) => {
                                        handleSubmit(values);
                                    }}
                                >
                                    Request
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </form>
                )}
            </Formik>
        </Box>
    );
}
