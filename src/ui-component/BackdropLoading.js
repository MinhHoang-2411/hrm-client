import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const BackdropLoading = ({ open }) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            transitionDuration={{ enter: 500, exit: 1000 }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default BackdropLoading;
