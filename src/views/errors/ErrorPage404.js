/// material-ui
import HomeIcon from '@mui/icons-material/Home';
import { Button, CardContent, Grid, Paper, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

// image
import image404_1 from 'assets/images/404/404-1.svg';
import image404_2 from 'assets/images/404/404-2.svg';
import image404_3 from 'assets/images/404/404-3.svg';
import image404_4 from 'assets/images/404/404-4.svg';

// navigate
import { useNavigate } from 'react-router-dom';

// scss
import '../../assets/scss/error-404.scss';

const ErrorPage404 = () => {
    const navigate = useNavigate();

    return (
        <MainCard className="card-error-404">
            <div>
                <Paper>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12}>
                                <div className="group-image">
                                    <img src={image404_1} alt="Berry" className="error-404-image-1" />
                                    <img src={image404_2} alt="Berry" className="error-404-image-2" />
                                    <img src={image404_3} alt="Berry" className="error-404-image-3" />
                                    <img src={image404_4} alt="Berry" className="error-404-image-4" />
                                </div>
                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: '30px' }}>
                                <div className="group-text">
                                    <Grid container className="error-404-grid-container-text">
                                        <Grid item xs={12}>
                                            <Typography className="error-404-title">Something is wrong</Typography>
                                        </Grid>
                                        <Grid item xs={12} className="error-404-description">
                                            <Typography>
                                                The page you are looking was moved, removed, renamed, or might never exist!
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

export default ErrorPage404;
