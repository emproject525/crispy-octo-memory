import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware(); // middleware
const middleware = applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, middleware);
sagaMiddleware.run(rootSaga);

export default store;
