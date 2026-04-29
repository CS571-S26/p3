import { Dropdown, ButtonGroup, Button } from "react-bootstrap";

export default function RestaurantFilters({
    priceSelected,
    setPriceSelected,
    cuisineSelected,
    toggleCuisine,
    vibeSelected,
    toggleVibe,
    onClear
}) {
    return (
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
                <Dropdown.Toggle style={{ borderRadius: "50px" }} variant="danger" id="dropdownMenuButton">
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
                                style={{ fontSize: "0.8rem" }}
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
                                style={{ fontSize: "0.8rem" }}
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
                onClick={onClear}
            >
                Clear Filters
            </Button>
        </div>
    );
}