// material-ui
import MainCard from 'ui-component/cards/MainCard';
import { Box } from '@mui/material';
import MeetingCalendar from './MeetingCalendar';

const Booking = ({ ...others }) => {
    return (
        <MainCard title="Meeting Events">
            <MeetingCalendar></MeetingCalendar>
        </MainCard>
    );
};

export default Booking;
