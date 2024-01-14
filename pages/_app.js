import { useState } from 'react';
import Head from 'next/head';
import { AppProvider, useApp } from '../src/Providers/Context';
import Layout from '../src/components/Layout';
import '../src/styles/styles.css';

const title = 'Restaurant App';

function MyApp(props) {
    const { Component, pageProps } = props;

    return (
        <AppProvider>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                    crossOrigin="anonymous"
                />
                <link
                    rel="stylesheet"
                    href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
                    integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
                    crossOrigin="anonymous"
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Lemon&display=swap"
                    rel="stylesheet"
                />
                <title>{title}</title>
                <script src="https://js.stripe.com/v3" />
            </Head>

            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AppProvider>
    );
}

export default MyApp;
