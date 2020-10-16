import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => (
  <div>
    <Header currentUser={currentUser} />
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} currentUser={currentUser} />
  </div>
);

AppComponent.getInitialProps = async ({ Component, ctx }) => {
  const client = buildClient(ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, ...data };
};

export default AppComponent;
