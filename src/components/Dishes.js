import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { useState, useContext } from 'react';
import AppContext from '../Providers/Context';
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col } from 'reactstrap';

function Dishes({ restId, searchTerm }) {
    const { addItem } = useContext(AppContext);

    const GET_RESTAURANT_DISHES = gql`
        query ($id: ID!) {
            restaurant(id: $id) {
                id
                name
                dishes {
                    id
                    name
                    description
                    price
                    image {
                        url
                    }
                }
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
        variables: { id: restId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>ERROR here</p>;
    if (!data) return <p>Not found</p>;

    let { restaurant } = data;
    const { dishes } = restaurant || {};

    // // Filter dishes based on the search term
    const filteredDishes = dishes?.filter((dish) =>
        dish.name.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    if (restId > 0) {
        return (
            <>
                {filteredDishes.map((res) => (
                    <Col xs="12" sm="6" md="6" lg="6" style={{ padding: 0 }} key={res.id}>
                        <Card style={{ margin: '0 0.5rem 20px 0.5rem', maxHeight: '500px' }}>
                            <CardTitle className="dish-name">
                                {res.name} - ${res.price}
                            </CardTitle>
                            <CardImg
                                top={true}
                                style={{ height: 150, width: 150 }}
                                src={`http://localhost:1337${res.image.url}`}
                            />
                            <CardBody style={{ height: '400px', overflow: 'hidden' }}>
                                <CardText
                                    style={{ overflowY: 'auto', maxHeight: '100%', color: 'black' }}
                                >
                                    {res.description}
                                </CardText>
                            </CardBody>
                            <div className="card-footer">
                                <Button className="add-to-cart-button" onClick={() => addItem(res)}>
                                    + Add To Cart
                                </Button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </>
        );
    } else {
        return <h1>No dishes in cart</h1>;
    }
}

export default Dishes;
