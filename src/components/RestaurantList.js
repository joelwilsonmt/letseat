import { gql, useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  Container,
  Row,
  Col,
} from "reactstrap";

import { Dishes } from "./index";
import AppContext from "../Providers/Context";

function RestaurantList(props) {
  const [restaurantID, setRestaurantID] = useState(0);
  const { cart } = useContext(AppContext);
  const [state, setState] = useState(cart);
  const GET_RESTAURANTS = gql`
    query {
      restaurants {
        id
        name
        description
        image {
          url
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_RESTAURANTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="alert alert-danger">{error.message}</p>;
  if (!data) return <p className="alert alert-warning">Not found</p>;
  console.log(`Query Data: ${data.restaurants}`);

  let searchQuery =
    data.restaurants.filter((res) => {
      return res.name.toLowerCase().includes(props.search);
    }) || [];

  // define renderer for Dishes
  const renderDishes = (restaurantID) => {
    return <Dishes restId={restaurantID}> </Dishes>;
  };
  if (searchQuery.length > 0) {
    const restList = searchQuery.map((res) => (
      <Col xs="12" sm="6" md="6" lg="4" key={res.id}>
        <Link href={`/restaurant/${res.id}`}>
          <a>
            <Card style={{ margin: "0 0.5rem 20px 0.5rem", height: "500px" }}>
              <div style={{ paddingTop: "56.25%", position: "relative" }}>
                <CardImg
                  top={true}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  src={`http://localhost:1337` + res.image.url}
                />
              </div>
              <CardBody style={{ height: "400px", overflow: "hidden" }}>
                <CardText style={{ overflowY: "auto", maxHeight: "100%" }}>
                  {res.description}
                </CardText>
              </CardBody>
              <div className="card-footer text-center">
                <Button color="info" onClick={() => setRestaurantID(res.id)}>
                  {res.name}
                </Button>
              </div>
            </Card>
          </a>
        </Link>
      </Col>
    ));

    return (
      <Container>
        <Row xs="3">{restList}</Row>

        <Row xs="3">{renderDishes(restaurantID)}</Row>
      </Container>
    );
  } else {
    return <h1> No Restaurants Found</h1>;
  }
}
export default RestaurantList;
