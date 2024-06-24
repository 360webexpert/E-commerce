// import Layout from '../components/Layout'
import '../styles/globals.css'
import Layout from "../components/Layout"
import { AuthProvider } from './signin/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    // <AuthProvider>
    <Layout>
     <ToastContainer />
      <Component {...pageProps} />
     </Layout>
    // </AuthProvider>
  );
}

export default MyApp;