import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import {cookieClient} from "@/utils/cookieClient";
import {setApiAuthToken} from "@/utils/apiClient";
import {useEffect, useState} from "react";

const authToken = cookieClient.get('authToken');
if (authToken) {
  setApiAuthToken(authToken);
}

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENV === 'local') {
      import('@/mock/browser').then(x => {
        x.worker.start()
        setIsLoading(false);
      });
    } else setIsLoading(false);
  }, []);

  return ( isLoading ? null : <Component {...pageProps} />)
}
