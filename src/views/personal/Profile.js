/// material-ui
import MainCard from 'ui-component/cards/MainCard';
import { CardContent, Grid, Paper, Typography, Avatar, Box, Stack, IconButton } from '@mui/material';
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

const Profile = ({ ...others }) => {
    const { t, i18n } = useTranslation();
    const { dataProfile, loading } = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();
    const currentUserId = JSON.parse(localStorage.getItem('employee'))?.id;
    useEffect(() => {
        console.log({ currentUserId });
        dispatch(profileAction.fetchData({ currentUserId }));
    }, []);
    console.log('dataProfile', dataProfile);
    return (
        <MainCard>
            <div>
                <Paper>
                    <CardContent>
                        {loading ? (
                            [...Array(5).keys()].map((value) => (
                                <SkeletonLoading key={value} sx={{ marginBottom: '15px', marginLeft: '20px' }} />
                            ))
                        ) : (
                            <>
                                {/* Header */}
                                <Grid container>
                                    <Grid item container xs={12}>
                                        <Grid item xs={2} justifyContent="center" sx={{ display: 'flex' }}>
                                            <Avatar
                                                alt={dataProfile.data?.user?.lastName}
                                                src={dataProfile.data?.user?.imageUrl || ''}
                                                sx={{ width: '120px', height: '120px' }}
                                            />
                                        </Grid>
                                        <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column' }} justifyContent="center">
                                            <Typography variant="h2" sx={{ mb: '4px', color: '#616161' }}>
                                                {dataProfile.data?.user.lastName + ' ' + dataProfile.data?.user.firstName}
                                            </Typography>
                                            <DataText label={t('Employee ID')} variant={'h4'} data={dataProfile?.data?.employeeCode} />
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
                                    </Grid>

                                    <Grid container item xs={12} sx={{ marginTop: '30px' }}>
                                        <div class="underline-header" sx={{ height: '1px', width: '100%', background: '#616161' }}></div>
                                    </Grid>
                                </Grid>
                                <Divider />
                                {/* Body  */}
                                <Grid container spacing={2} sx={{ mt: '20px' }}>
                                    <Grid item xs={4}>
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
                                                data={`${dataProfile?.data?.address?.streetAddress}, ${dataProfile?.data?.address?.city}`}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Box sx={{ border: '1px solid #ccc', borderRadius: '4px' }}>
                                            <Box sx={{ p: 2 }}>
                                                <Typography variant="h3" sx={{ color: '#616161' }}>
                                                    {t('Professional Information')}
                                                </Typography>
                                            </Box>
                                            <Divider />
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <DataField
                                                        Icon={WorkIcon}
                                                        divider={true}
                                                        label={t('Position')}
                                                        data={dataProfile?.data?.position}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <DataField
                                                        Icon={WorkspacesIcon}
                                                        divider
                                                        label={t('Branch')}
                                                        data={dataProfile?.data?.branch?.name}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <DataField
                                                        Icon={NearMeIcon}
                                                        divider={true}
                                                        label={t('Nation')}
                                                        data={dataProfile?.data?.nationality}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <DataField
                                                        Icon={CalendarMonthIcon}
                                                        divider
                                                        label={t('Joining Date')}
                                                        data={formatTimeStampToDate(dataProfile?.data?.joinedDate)}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <DataField
                                                        Icon={ShareOutlinedIcon}
                                                        divider={true}
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
