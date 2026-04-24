import { useContext, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";

import RestaurantsDataContext from "../../../contexts/RestaurantsDataContext";
import RestaurantCard from "../../RestaurantCard";

export default function SavePage() { 
    const [restaurants, setRestaurants] = useContext(RestaurantsDataContext);
    
    if (restaurants.save.length === 0) {
            return <div style= {{ textAlign: "center", marginBottom: "3rem" }}>
                <h2 >Saved Restaurants</h2>
                <p>You have no restaurants saved. Go to Discover and find some!</p>
            </div>
    }

    return <div>
        <h2 style= {{ textAlign: "center", marginBottom: "3rem" }}>Saved Restaurants</h2>
        <Container>
            <Row className="g-3 align-items-start">
                {restaurants.save.map((rest) => (
                    <Col xs={12} md={6} lg={4} key={rest.name}>
                        <RestaurantCard {...rest} page="save"/>
                    </Col>
                ))}
            </Row>
        </Container>
    </div>
}