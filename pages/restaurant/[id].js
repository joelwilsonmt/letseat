// pages/restaurant/[id].js

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Dishes, Cart } from '../../src/components';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

function RestaurantDetails() {
    const router = useRouter();
    const { id } = router.query;

    if (!id) {
        return <p>Loading...</p>; // You can add better loading handling
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
    console.log(`URL: ${API_URL}`);
    const [query, setQuery] = useState('');
    const link = new HttpLink({ uri: `${API_URL}/graphql` });
    const cache = new InMemoryCache();
    const client = new ApolloClient({ link, cache });
    return (
        <ApolloProvider client={client}>
            <div>
                <h1>Restaurant Details</h1>
                <h2>Restaurant ID: {id}</h2>
                <Dishes restId={id} />
                <Cart />
            </div>
        </ApolloProvider>
    );
}

export default RestaurantDetails;
