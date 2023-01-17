/// material-ui
import HomeIcon from '@mui/icons-material/Home';
import { Button, CardContent, Grid, Paper, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

// image
import image500_1 from 'assets/images/500/500-1.svg';
import image500_2 from 'assets/images/500/500-2.svg';
import image500_3 from 'assets/images/500/500-3.svg';
import image500_4 from 'assets/images/500/500-4.svg';

// navigate
import { useNavigate } from 'react-router-dom';

// scss
import '../../assets/scss/error-500.scss';

const ErorrPage500 = () => {
    const navigate = useNavigate();

    return (
        <MainCard className="card-error-500">
            <div>
                <Paper>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12}>
                                <div className="group-image">
                                    <img src={image500_1} alt="Berry" className="error-500-image-1" />
                                    <img src={image500_2} alt="Berry" className="error-500-image-2" />
                                    <img src={image500_3} alt="Berry" className="error-500-image-3" />
                                    <img src={image500_4} alt="Berry" className="error-500-image-4" />
                                </div>
                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: '30px' }}>
                                <div className="group-text">
                                    <Grid container className="error-500-grid-container-text">
                                        <Grid item xs={12}>
                                            <Typography className="error-500-title">Internal Server Error</Typography>
                                        </Grid>
                                        <Grid item xs={12} className="error-500-description">
                                            <Typography>
                                                Server error 500. We are fixing the problem. <br /> Please try again later.
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: '30px' }}>
                                <div style={{ transform: 'none', display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        disableElevation
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<HomeIcon />}
                                        onClick={(event) => navigate('/login')}
                                    >
                                        Home
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Paper>
            </div>
        </MainCard>
    );
};

export default ErorrPage500;
