import './App.css';
import { RouterProvider } from 'react-router-dom';
import baseRoutes from './routes/baseRoutes';
import ScrollToTop from './components/ScrollToTop';
import { Provider } from 'react-redux';
import store from './redux/store';


function App() {


  
  return (
    <Provider store={store} >
      <RouterProvider router={baseRoutes}>
        <ScrollToTop />
      </RouterProvider>
    </Provider>
    
  );
}

export default App;
