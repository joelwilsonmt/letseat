import React, { useState } from "react";
import { Cart, RestaurantList } from "../src/components";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import Tilt from 'react-parallax-tilt';
import { InputGroup, InputGroupText, Input } from "reactstrap";

const Logo = () => {
  return  <Tilt tiltReverse trackOnWindow>
      <img src="/delivery-man.png" alt="Delivery Man" className="logo-large" />
    </Tilt>
}

function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  console.log(`URL: ${API_URL}`);
  const [query, setQuery] = useState("");
  const link = new HttpLink({ uri: `${API_URL}/graphql` });
  const cache = new InMemoryCache();
  const client = new ApolloClient({ link, cache });

  return (
    <>
      <ApolloProvider client={client}>
      <Logo />
      <h2 className="home-header">Discover Restaurants Near You!</h2>
        <div className="search">
          <InputGroup>
            <InputGroupText> Search </InputGroupText>
            <Input
              onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
              value={query}
            />
          </InputGroup>
          <br></br>
        </div>
        <RestaurantList search={query} />
        <Cart />
      </ApolloProvider>
    </>
  );
}
export default Home;
