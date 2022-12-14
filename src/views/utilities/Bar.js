// material-ui
import MainCard from 'ui-component/cards/MainCard';
import { Box } from '@mui/material';

const Bar = ({ ...others }) => {
    return (
        <MainCard title="Chainhaus Bar">
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                    src="https://raw.githubusercontent.com/tmKamal/under-construction-template/0127dad06e3fd4433fac38d77bd319425fd3e294/undraw_dev_productivity_umsq%201%20.svg"
                    alt="Berry"
                    style={{ width: '50%' }}
                />
            </Box>
        </MainCard>
    );
};

export default Bar;
