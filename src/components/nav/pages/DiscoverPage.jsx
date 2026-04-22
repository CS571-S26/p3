import { useState, useContext } from "react";
import { Container, Row, Col, Dropdown, ButtonGroup, Button } from "react-bootstrap";

import RestaurantsDataContext from "../../../contexts/RestaurantsDataContext";
import RestaurantCard from "../../RestaurantCard";
import "../../../index.css";

export default function DiscoverPage() {
    const [restaurants] = useContext(RestaurantsDataContext);
    const [cuisineSelected, setCuisineSelected] = useState(new Set());
    const [priceSelected, setPriceSelected] = useState("");

    const toggleOption = (option) => {
        setCuisineSelected((prev) => {
            const next = new Set(prev);
            next.has(option) ? next.delete(option) : next.add(option);
            return next;
        });
    };

    return (
        <div>
            <h2 style={{ textAlign: "center", marginBottom: "3rem" }}>Discover Restaurants in Madison ➭</h2>
            <div className="d-flex justify-content-center gap-2">
            <Dropdown>
                <Dropdown.Toggle style={{ borderRadius: "50px" }} variant="danger" id="dropdownMenuButton">
                    Price
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <div className="px-2">
                        <ButtonGroup>
                            <Button
                                variant={`${priceSelected === "$" ? "success" : "outline-success"}`}
                                onClick={() => setPriceSelected("$")}
                            >
                                $
                            </Button>
                            <Button
                                variant={`${priceSelected === "$$" ? "success" : "outline-success"}`}
                                onClick={() => setPriceSelected("$$")}
                            >
                                $$
                            </Button>
                            <Button
                                variant={`${priceSelected === "$$$" ? "success" : "outline-success"}`}
                                onClick={() => setPriceSelected("$$$")}
                            >
                                $$$
                            </Button>
                        </ButtonGroup>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
            
            <Dropdown>
                <Dropdown.Toggle style={{ borderRadius: "50px" }}variant="danger" id="dropdownMenuButton">
                    Cuisine
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <div className="px-2">
                        <ButtonGroup>
                            <Button
                                variant={cuisineSelected.has("American") ? "danger" : "outline-danger"}
                                onClick={() => toggleOption("American")}
                            >
                                American
                            </Button>
                            <Button
                                variant={cuisineSelected.has("Asian") ? "danger" : "outline-danger"}
                                onClick={() => toggleOption("Asian")}
                            >
                                Asian
                            </Button>
                            <Button
                                variant={cuisineSelected.has("European") ? "danger" : "outline-danger"}
                                onClick={() => toggleOption("European")}
                            >
                                European
                            </Button>
                            <Button
                                variant={cuisineSelected.has("Latin") ? "danger" : "outline-danger"}
                                onClick={() => toggleOption("Latin")}
                            >
                                Latin
                            </Button>
                        </ButtonGroup>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
            
             <Dropdown>
                <Dropdown.Toggle style={{ borderRadius: "50px" }} variant="danger" id="dropdownMenuButton">
                    Vibe
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <div className="px-2">
                        <ButtonGroup>
                            <Button
                                variant={cuisineSelected.has("American") ? "danger" : "outline-danger"}
                                onClick={() => toggleOption("American")}
                            >
                                American
                            </Button>
                            <Button
                                variant={cuisineSelected.has("Asian") ? "danger" : "outline-danger"}
                                onClick={() => toggleOption("Asian")}
                            >
                                Asian
                            </Button>
                            <Button
                                variant={cuisineSelected.has("European") ? "danger" : "outline-danger"}
                                onClick={() => toggleOption("European")}
                            >
                                European
                            </Button>
                            <Button
                                variant={cuisineSelected.has("Latin") ? "danger" : "outline-danger"}
                                onClick={() => toggleOption("Latin")}
                            >
                                Latin
                            </Button>
                        </ButtonGroup>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
            <Button style={{ borderRadius: "50px" }} variant="light" onClick={() => {setPriceSelected(""); cuisineSelected(new Set())}}>Clear Filters</Button>
            </div>
            <Container>
                <Row className="g-4 mt-3">
                    {restaurants.discoverable.filter((rest) => {
                        const matchesPrice = priceSelected === "" || rest.cost === priceSelected;
                        const matchesCuisine = cuisineSelected.size === 0 || cuisineSelected.has(rest.cuisine);
                        return matchesPrice && matchesCuisine;
                    })
                    .map((rest) => (
                        <Col xs={12} md={6} lg={4} key={rest.name}>
                            <RestaurantCard {...rest} page="discoverable" />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}