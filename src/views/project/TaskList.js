// material-ui
import MainCard from 'ui-component/cards/MainCard';
import { Box, CardContent, Grid, Paper, Typography } from '@mui/material';
import underContruction1 from 'assets/images/under-contruction/under-contruction-1.svg';
import underContruction2 from 'assets/images/under-contruction/under-contruction-2.svg';
import underContruction3 from 'assets/images/under-contruction/under-contruction-3.svg';

// scss
import '../../assets/scss/contruction.scss';

const TaskList = ({ ...others }) => {
    return (
        <MainCard title="My Tasks">
            <div>
                <Paper>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12}>
                                <div className="group-image">
                                    <img src={underContruction1} alt="Berry" className="under-contruction-image-1" />
                                    <img src={underContruction2} alt="Berry" className="under-contruction-image-2" />
                                    <img src={underContruction3} alt="Berry" className="under-contruction-image-3" />
                                </div>
                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: '30px' }}>
                                <div className="group-text">
                                    <Grid container className="under-contruction-grid-container-text">
                                        <Grid item xs={12}>
                                            <Typography className="under-contruction-title">Under Contruction</Typography>
                                        </Grid>
                                        <Grid item xs={12} className="under-contruction-description">
                                            <Typography>This site is on under construction!! Please check after some time</Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Paper>
            </div>
        </MainCard>
    );
};

export default TaskList;
