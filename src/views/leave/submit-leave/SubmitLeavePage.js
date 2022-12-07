// material-ui
import { Grid } from '@mui/material';

// project imports
import SubmitLeaveForm from './SubmitLeaveForm';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| TYPOGRAPHY ||============================== //

const SubmitLeavePage = () => (
    <MainCard title="Leave Request">
        <Grid item xs={12}>
            <SubmitLeaveForm />
        </Grid>
    </MainCard>
);

export default SubmitLeavePage;
