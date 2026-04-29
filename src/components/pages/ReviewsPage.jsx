import { useContext } from "react";
import {Container, Row, Col } from "react-bootstrap";

import RestaurantsDataContext from "../../contexts/RestaurantsDataContext";
import RestaurantCard from "../RestaurantCard";

export default function ReviewedPage() {
    const [restaurants] = useContext(RestaurantsDataContext);

    if (restaurants.review.length === 0) {
            return <div style= {{ textAlign: "center", marginBottom: "3rem" }}>
                <h1>Reviewed Restaurants</h1>
                <p>You have no restaurants reviewed. Go to Saved and start reviewing!</p>
            </div>
    }
    
    return <div>
        <h1>Your Reviews</h1>
        <Container>
            <Row className="g-3 align-items-start">
                {restaurants.review.map((rest) => (
                    <Col xs={12} md={8} lg={6} key={rest.name}>
                        <RestaurantCard {...rest} page="review"/>
                    </Col>
                ))}
            </Row>
        </Container>
    </div>
}