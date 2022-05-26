import '../styles/globals.css'
import { NextUIProvider } from '@nextui-org/react';
import { Darktheme, lighTheme } from '../themes';
import { LoginProvider } from '../context/loginProvider';
import { GifProvider } from '../context/gifProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
      <LoginProvider>
        <GifProvider>
      <NextUIProvider
      theme={Darktheme}
      >
        <Component
          {...pageProps} 
          />
          <ToastContainer 
            position="top-right"
            autoClose={1000}
            limit={1}
   />
      </NextUIProvider>
      </GifProvider>
      </LoginProvider>
      )
}

export default MyApp
