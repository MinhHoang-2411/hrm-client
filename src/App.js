import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { useAppSelector } from 'app/hooks';

// toast imports
import { ToastContainer } from 'react-toastify';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useAppSelector((state) => state.action);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
            <ToastContainer />
        </StyledEngineProvider>
    );
};

export default App;
