import { createRoot } from 'react-dom/client';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';

// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';

// style + assets
import 'assets/scss/style.scss';
import { store } from 'app/store';
import history from 'routes/history';

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <App />
            </HistoryRouter>
        </Provider>
    </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
