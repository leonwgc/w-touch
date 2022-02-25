import { applyMiddleware, compose, createStore, Store } from 'redux';
import createRootReducer from './reducers';
export { default as useUpdateStore } from './hooks/useUpdateStore';
export { useSelector, Provider } from 'react-redux';

export const configureStore = (
  initState: Record<string, unknown> | null = {},
  trace = false
): Store => {
  let composeEnhancers = compose;

  if (trace && typeof window !== 'undefined') {
    if ('__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' in window) {
      composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({ trace: true });
    }
  }

  const store = createStore(
    createRootReducer(),
    { app: initState },
    composeEnhancers(applyMiddleware())
  );

  return store;
};

export default configureStore;
