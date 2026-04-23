import { useContext } from "react";
import {Container, Row, Col } from "react-bootstrap";

import RestaurantsDataContext from "../../../contexts/RestaurantsDataContext";
import RestaurantCard from "../../RestaurantCard";

export default function ReviewedPage() {
    const [restaurants] = useContext(RestaurantsDataContext);

    return <div>
        <h2 style= {{ textAlign: "center", marginBottom: "3rem" }}>Your Reviews</h2>
        <Container>
            <Row className="g-3">
                {restaurants.review.map((rest) => (
                    <Col xs={12} md={6} lg={4} key={rest.name}>
                        <RestaurantCard {...rest} page="review"/>
                    </Col>
                ))}
            </Row>
        </Container>
        
    </div>
}