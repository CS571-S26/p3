import { useState, useContext } from "react";
import { Container, Row, Col, Dropdown, ButtonGroup, Button } from "react-bootstrap";

import RestaurantsDataContext from "../../../contexts/RestaurantsDataContext";
import RestaurantCard from "../../RestaurantCard";
import "../../../index.css";

export default function DiscoverPage() {
    const [restaurants] = useContext(RestaurantsDataContext);
    const [cuisineSelected, setCuisineSelected] = useState(new Set());
    const [priceSelected, setPriceSelected] = useState("");
    const [vibeSelected, setVibeSelected] = useState(new Set());

    const toggleCuisine = (option) => {
        setCuisineSelected((prev) => {
            const next = new Set(prev);
            next.has(option) ? next.delete(option) : next.add(option);
            return next;
        });
    };

    const toggleVibe = (option) => {
        setVibeSelected((prev) => {
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
                                onClick={() => toggleCuisine("American")}
                            >
                                American
                            </Button>
                            <Button
                                variant={cuisineSelected.has("Asian") ? "danger" : "outline-danger"}
                                onClick={() => toggleCuisine("Asian")}
                            >
                                Asian
                            </Button>
                            <Button
                                variant={cuisineSelected.has("European") ? "danger" : "outline-danger"}
                                onClick={() => toggleCuisine("European")}
                            >
                                European
                            </Button>
                            <Button
                                variant={cuisineSelected.has("Latin") ? "danger" : "outline-danger"}
                                onClick={() => toggleCuisine("Latin")}
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
                                variant={vibeSelected.has("Upscale") ? "primary" : "outline-primary"}
                                onClick={() => toggleVibe("Upscale")}
                            >
                                Upscale
                            </Button>
                            <Button
                                variant={vibeSelected.has("Quiet") ? "primary" : "outline-primary"}
                                onClick={() => toggleVibe("Quiet")}
                            >
                                Quiet
                            </Button>
                            <Button
                                variant={vibeSelected.has("Family-friendly") ? "primary" : "outline-primary"}
                                style = {{ fontSize: "0.8rem" }}
                                onClick={() => toggleVibe("Family-friendly")}
                            >
                                Family-friendly
                            </Button>
                            <Button
                                variant={vibeSelected.has("Casual") ? "primary" : "outline-primary"}
                                onClick={() => toggleVibe("Casual")}
                            >
                                Casual
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button
                                variant={vibeSelected.has("Romantic") ? "primary" : "outline-primary"}
                                onClick={() => toggleVibe("Romantic")}
                            >
                                Romantic
                            </Button>
                            <Button
                                variant={vibeSelected.has("Trendy") ? "primary" : "outline-primary"}
                                onClick={() => toggleVibe("Trendy")}
                            >
                                Trendy
                            </Button>
                            <Button
                                variant={vibeSelected.has("Outdoor seating") ? "primary" : "outline-primary"}
                                style = {{ fontSize: "0.8rem" }}
                                onClick={() => toggleVibe("Outdoor seating")}
                            >
                                Outdoor seating
                            </Button>
                            <Button
                                variant={vibeSelected.has("Lively") ? "primary" : "outline-primary"}
                                onClick={() => toggleVibe("Lively")}
                            >
                                Lively
                            </Button>
                        </ButtonGroup>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
            <Button 
                style={{ borderRadius: "50px" }} 
                variant="light" 
                onClick={() => {
                    setPriceSelected(""); 
                    setCuisineSelected(new Set());
                    setVibeSelected(new Set());
                }}
            >
                Clear Filters
            </Button>
            </div>
            <Container>
                <Row className="g-4 mt-3">
                    {restaurants.discoverable.filter((rest) => {
                        const matchesPrice = priceSelected === "" || rest.cost === priceSelected;
                        const matchesCuisine = cuisineSelected.size === 0 || rest.cuisine.some(c => cuisineSelected.has(c));
                        const matchesVibe = vibeSelected.size === 0 || rest.vibe.some(v => vibeSelected.has(v));
                        return matchesPrice && matchesCuisine && matchesVibe;
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