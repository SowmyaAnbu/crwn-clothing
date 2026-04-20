import {compose, createStore, applyMiddleware, Middleware} from 'redux'
import logger from 'redux-logger'
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from 'redux-persist/lib/storage'
// import {thunk} from 'redux-thunk'
import { rootReducer } from './root-reducer'
import createSagaMiddleWare from 'redux-saga'
import { rootSaga } from './root-saga';

declare global {
    interface Window {
         __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }  
}

export type RootState = ReturnType<typeof rootReducer>

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}

const sagaMiddleWare = createSagaMiddleWare();

const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleWare].filter(
    Boolean
) as Middleware[]
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));
export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);