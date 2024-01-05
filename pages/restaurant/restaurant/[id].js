// pages/restaurant/[id].js

import React from 'react';
import { useRouter } from 'next/router';
import Dishes from '../../components/Dishes'; // Adjust the path accordingly
import Cart from '../../components/Cart'; // Adjust the path accordingly

function RestaurantDetails() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <p>Loading...</p>; // You can add better loading handling
  }

  return (
    <div>
      <h1>Restaurant Details</h1>
      <h2>Restaurant ID: {id}</h2>
      <Dishes restId={id} />
      <Cart />
    </div>
  );
}

export default RestaurantDetails;
