import { BrowserRouter, Route, Switch } from 'react-router-dom'; // BrowserRouter
import { Provider } from 'react-redux';
import Layout from '@views/layout';
import Dashboard from '@views/dashboard';
import store from '@views/store';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/"
                        render={(props) => (
                            <Layout>
                                <Dashboard {...props} />
                            </Layout>
                        )}
                    />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
