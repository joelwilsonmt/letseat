/* pages/checkout.js */

import React, { useContext } from "react";
import { Row, Col } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm, Cart } from "../src/components";
import AppContext from "../src/Providers/Context";

function Checkout() {
  // get app context
  const {isAuthenticated} = useContext(AppContext);
  // isAuthenticated is passed to the cart component to display order button
  //const isAuthenticated  = true;

  // load stripe to inject into elements components
  const stripePromise = loadStripe(
    "pk_test_51OKmDEDKiT1VaJkErW7vaphjFWfhsG9xwWTCjw59TZcpxwt2v9ihg6h64X1logoVkjKFV5icpXmIiSwyu4loWCR00079NYRcfK"
  );

  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
        <h1 style={{ margin: 20 }}>Let's eat!</h1>
        <Cart isAuthenticated={isAuthenticated} />
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Col>
    </Row>
  );
  // }
}
export default Checkout;
