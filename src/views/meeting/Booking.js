// material-ui
import { useAppDispatch } from 'app/hooks';
import MainCard from 'ui-component/cards/MainCard';
import MeetingCalendar from './MeetingCalendar';

const Booking = ({ ...others }) => {
    const dispatch = useAppDispatch();
    return (
        <MainCard title="Meeting Events">
            <MeetingCalendar dispatch={dispatch} />
        </MainCard>
    );
};

export default Booking;
