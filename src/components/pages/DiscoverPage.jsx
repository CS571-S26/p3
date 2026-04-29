import { useState, useContext, useMemo } from "react";
import { Container, Row, Col, Dropdown, ButtonGroup, Button } from "react-bootstrap";

import RestaurantsDataContext from "../../contexts/RestaurantsDataContext";
import RestaurantCard from "../RestaurantCard";
import RestaurantFilters from "../RestaurantFilters";

export default function DiscoverPage() {
    const [restaurants] = useContext(RestaurantsDataContext);
    const [cuisineSelected, setCuisineSelected] = useState(new Set());
    const [priceSelected, setPriceSelected] = useState("");
    const [vibeSelected, setVibeSelected] = useState(new Set());

    // AI used to help with the useMemo hook and randomization logic
    const shuffled = useMemo(() => { // show restaurants in a random order
        const copy = [...restaurants.discoverable];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }, [restaurants.discoverable.length]);
    
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
            <h1 style={{ textAlign: "center", marginBottom: "2rem", marginTop: "4rem" }}>Discover Restaurants in Madison ➭</h1>
            <p style={{ textAlign: "center", marginBottom: "3rem" }}>Save ♡ restaurants based on your preferences and view them in your saved list!</p>
            <div className="d-flex justify-content-center gap-2">
            
            <RestaurantFilters // Display filter options for price, cuisine, and vibe
                priceSelected={priceSelected}
                setPriceSelected={setPriceSelected}
                cuisineSelected={cuisineSelected}
                toggleCuisine={toggleCuisine}
                vibeSelected={vibeSelected}
                toggleVibe={toggleVibe}
                onClear={() => { setPriceSelected(""); setCuisineSelected(new Set()); setVibeSelected(new Set()); }}
            />

            </div>
            <Container>
                <Row className="g-4 mt-3">
                    {shuffled.filter((rest) => { // Filter logic for restaurants based on their selected options
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