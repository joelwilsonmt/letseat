import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
    useQuery,
    ApolloProvider,
    ApolloClient,
    HttpLink,
    InMemoryCache,
    gql,
} from '@apollo/client';
import { Dishes, Cart } from '../../src/components';

const DishList = ({ id }) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
    const [query, setQuery] = useState('');

    // Define the GraphQL query for fetching dishes based on the restaurant ID
    const GET_DISHES = gql`
        query {
            dishes(where: { restaurant: { id: 1 } }) {
                id
                name
            }
        }
    `;

    // Fetch the dishes using the Apollo useQuery hook
    const { loading, error, data } = useQuery(GET_DISHES);
    console.log('data', data);
    // const dishes = data.dishes;

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading dishes</p>;
    }
    return <p>Dish list here</p>;
};

function RestaurantDetails() {
    const router = useRouter();
    const { id } = router.query;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
    const link = new HttpLink({ uri: `${API_URL}/graphql` });
    const cache = new InMemoryCache();
    const client = new ApolloClient({ link, cache });
    if (!id) {
        return <p>Loading...</p>; // You can add better loading handling
    }
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <ApolloProvider client={client}>
            <div>
                <h1>Restaurant Details</h1>
                <h2>Restaurant ID: {id}</h2>

                {/* Search bar */}
                <input
                    type="text"
                    className="dish-search"
                    placeholder="Search for dishes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Display all dishes */}
                <Dishes restId={id} searchTerm={searchTerm} />

                <Cart />
            </div>
        </ApolloProvider>
    );
}

export default RestaurantDetails;