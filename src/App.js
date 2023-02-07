import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import { useAppSelector } from 'app/hooks';
import NavigationScroll from 'layout/NavigationScroll';

// toast imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'ui-component/modal';

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
            <Modal />
            <ToastContainer />
        </StyledEngineProvider>
    );
};

export default App;
