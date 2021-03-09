import { BrowserRouter, Route, Switch } from 'react-router-dom'; // BrowserRouter
import Layout from '@views/layout';
import Dashboard from '@views/dashboard';

function App() {
    return (
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
    );
}

export default App;
