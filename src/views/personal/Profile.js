/// material-ui
import MainCard from 'ui-component/cards/MainCard';
import { CardContent, Grid, Paper, Typography, Avatar, Box, Stack, IconButton, Devider } from '@mui/material';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CakeIcon from '@mui/icons-material/Cake';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import TransgenderOutlinedIcon from '@mui/icons-material/TransgenderOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import WorkIcon from '@mui/icons-material/Work';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import NearMeIcon from '@mui/icons-material/NearMe';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

// scss
import '../../assets/scss/contruction.scss';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { profileAction } from 'store/personal/profileSlice';
import DataText from '../../ui-component/personal/DataText';
import { Divider } from '@mui/material';
import DataField from 'ui-component/personal/DataField';
import { formatTimeStampToDate } from 'utils/format/date';
import SkeletonLoading from 'ui-component/SkeletonLoading';
import { useTranslation } from 'react-i18next';
import useResponsive from 'hooks/useResponsive';

const Profile = ({ ...others }) => {
    const isMobile = useResponsive('mobile');
    const { t, i18n } = useTranslation();
    const { dataProfile, loading } = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();
    const currentUserId = JSON.parse(localStorage.getItem('employee'))?.id;
    useEffect(() => {
        dispatch(profileAction.fetchData({ currentUserId }));
    }, []);

    return (
        <MainCard>
            <div>
                <Paper>
                    <CardContent sx={isMobile ? { p: 0 } : { p: 3 }}>
                        {loading ? (
                            [...Array(5).keys()].map((value) => (
                                <SkeletonLoading key={value} sx={{ marginBottom: '15px', marginLeft: '20px' }} />
                            ))
                        ) : (
                            <>
                                {/* Header */}
                                <Grid container>
                                    <Grid item container xs={12} spacing={isMobile ? 1 : 2} alignItems="center">
                                        <Grid item xs={4} md={2} sx={isMobile ? {} : { display: 'flex', justifyContent: 'center' }}>
                                            <Avatar
                                                alt={dataProfile.data?.user?.lastName}
                                                src={dataProfile.data?.user?.imageUrl || ''}
                                                sx={{ width: isMobile ? '50px' : '120px', height: isMobile ? '50px' : '120px' }}
                                            />
                                        </Grid>
                                        {isMobile ? (
                                            <>
                                                <Grid item xs={8} md={10}>
                                                    <Typography variant="h3" sx={{ color: '#616161' }}>
                                                        {dataProfile.data?.user.lastName + ' ' + dataProfile.data?.user.firstName}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <DataText
                                                        label={t('Employee ID')}
                                                        variant={'h5'}
                                                        data={dataProfile?.data?.employeeCode}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <DataText
                                                        variant="h5"
                                                        label={t('Department')}
                                                        Icon={StorageOutlinedIcon}
                                                        data={dataProfile?.data?.department}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <DataText
                                                        variant="h5"
                                                        label={t('Team')}
                                                        Icon={GroupsOutlinedIcon}
                                                        data={dataProfile.data?.team?.name}
                                                    />
                                                </Grid>
                                            </>
                                        ) : (
                                            <>
                                                <Grid
                                                    item
                                                    xs={10}
                                                    md={4}
                                                    sx={{ display: 'flex', flexDirection: 'column' }}
                                                    justifyContent="center"
                                                >
                                                    <Typography variant="h2" sx={{ mb: '4px', color: '#616161' }}>
                                                        {dataProfile.data?.user.lastName + ' ' + dataProfile.data?.user.firstName}
                                                    </Typography>
                                                    <DataText
                                                        label={t('Employee ID')}
                                                        variant={'h4'}
                                                        data={dataProfile?.data?.employeeCode}
                                                    />
                                                </Grid>
                                                <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column' }} justifyContent="center">
                                                    <DataText
                                                        variant="h4"
                                                        label={t('Department')}
                                                        Icon={StorageOutlinedIcon}
                                                        data={dataProfile?.data?.department}
                                                    />
                                                    <DataText
                                                        variant="h4"
                                                        label={t('Team')}
                                                        Icon={GroupsOutlinedIcon}
                                                        data={dataProfile.data?.team?.name}
                                                    />
                                                </Grid>
                                            </>
                                        )}
                                    </Grid>

                                    <Grid container item xs={12} sx={{ marginTop: '30px' }}>
                                        <div class="underline-header" sx={{ height: '1px', width: '100%', background: '#616161' }}></div>
                                    </Grid>
                                </Grid>
                                <Divider />
                                {/* Body  */}
                                <Grid container spacing={2} sx={{ mt: '20px' }}>
                                    <Grid item xs={12} md={4}>
                                        <Box sx={{ border: '1px solid #ccc', borderRadius: '4px' }}>
                                            <Box sx={{ p: 2 }}>
                                                <Typography variant="h3" sx={{ color: '#616161' }}>
                                                    {t('Personal Information')}
                                                </Typography>
                                            </Box>
                                            <Divider />
                                            <DataField
                                                Icon={CakeIcon}
                                                divider={true}
                                                label={t('Date of Birth')}
                                                data={formatTimeStampToDate(dataProfile?.data?.dateOfBirth)}
                                            />
                                            <DataField
                                                Icon={TransgenderOutlinedIcon}
                                                divider
                                                label={t('Gender')}
                                                data={t(
                                                    `${dataProfile?.data?.gender[0]}${dataProfile?.data?.gender.substring(1).toLowerCase()}`
                                                )}
                                            />
                                            <DataField
                                                Icon={PhoneAndroidOutlinedIcon}
                                                divider
                                                label={t('Phone Number')}
                                                data={dataProfile?.data?.phoneNumber}
                                            />
                                            <DataField
                                                Icon={MailOutlinedIcon}
                                                divider
                                                label="Email"
                                                data={dataProfile?.data?.user?.email}
                                            />
                                            <DataField
                                                Icon={PlaceOutlinedIcon}
                                                label={t('Address')}
                                                data={`${dataProfile?.data?.address?.streetAddress}`}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Box sx={{ border: '1px solid #ccc', borderRadius: '4px' }}>
                                            <Box sx={{ p: 2 }}>
                                                <Typography variant="h3" sx={{ color: '#616161' }}>
                                                    {t('Professional Information')}
                                                </Typography>
                                            </Box>
                                            {isMobile ? null : <Divider />}
                                            <Grid container>
                                                <Grid item xs={12} md={6}>
                                                    <DataField
                                                        divider={isMobile}
                                                        Icon={WorkIcon}
                                                        label={t('Position')}
                                                        data={dataProfile?.data?.position}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <DataField
                                                        divider={isMobile}
                                                        Icon={WorkspacesIcon}
                                                        label={t('Branch')}
                                                        data={dataProfile?.data?.branch?.name}
                                                    />
                                                </Grid>
                                            </Grid>
                                            {isMobile ? null : <Divider />}
                                            <Grid container>
                                                <Grid item xs={12} md={6}>
                                                    <DataField
                                                        divider={isMobile}
                                                        Icon={NearMeIcon}
                                                        label={t('Nation')}
                                                        data={dataProfile?.data?.nationality}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <DataField
                                                        divider={isMobile}
                                                        Icon={CalendarMonthIcon}
                                                        label={t('Joining Date')}
                                                        data={formatTimeStampToDate(dataProfile?.data?.joinedDate)}
                                                    />
                                                </Grid>
                                            </Grid>
                                            {isMobile ? null : <Divider />}
                                            <Grid container>
                                                <Grid item xs={12} md={6}>
                                                    <DataField
                                                        divider={isMobile}
                                                        Icon={ShareOutlinedIcon}
                                                        label={t('CV URL')}
                                                        data={
                                                            <a href={dataProfile?.data?.resumeUrl} target="_blank">
                                                                <IconButton>
                                                                    <LinkOutlinedIcon />
                                                                </IconButton>
                                                            </a>
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </CardContent>
                </Paper>
            </div>
        </MainCard>
    );
};

export default Profile;
