import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'; // BrowserRouter
import { Provider } from 'react-redux';
import Layout from '@views/layout';
import store from '@views/store';
import routes from '@/routes';
import ErrorPage from '@views/errorpage';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Layout>
                    <Switch>
                        {routes.menus.map(({ path, exact, strict, component: Component, ...rest }) => (
                            <Route
                                key={path}
                                path={path}
                                exact={exact}
                                strict={strict}
                                render={(props) => <Component {...rest} {...props} />}
                            />
                        ))}
                        <Route
                            exact
                            path="/404"
                            render={(props) => <ErrorPage.Error404 defaultLink="/" {...props} />}
                        />
                        <Redirect from="*" to="/404" />
                    </Switch>
                </Layout>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
