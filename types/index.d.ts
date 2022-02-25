import { Store } from 'redux';
export { default as useUpdateStore } from './hooks/useUpdateStore';
export { useSelector, Provider } from 'react-redux';
export declare const configureStore: (
  initState?: Record<string, unknown> | null,
  trace?: boolean
) => Store;
export default configureStore;
