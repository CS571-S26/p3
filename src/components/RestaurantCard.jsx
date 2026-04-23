import { Button, Card, Carousel, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState, useContext} from "react";

import RestaurantsDataContext from "../contexts/RestaurantsDataContext";

export default function RestaurantCard(props) {
    const [restaurants, setRestaurants, move] = useContext(RestaurantsDataContext);

    // state for show more toggle and save button
    const [showMore, toggleShowMore] = useState(false);

    const [saved, toggleSaved] = useState(
    restaurants.save.some(rest => rest.name === props.name)
);

    return (
        <Card className="h-100 shadow-sm">
            <Card.Img variant="top" src={props.image} style={{ height: "200px", objectFit: "cover" }} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <p>{props.cuisine}</p>
                <p>{props.cost}</p>
            
            
                {(props.page === "discoverable" || props.page === "save") && ( <>
                <Button
                    variant={"primary"}
                    onClick={() => window.open(props.website, "_blank")} 
                    >
                        {"Website"}
                </Button>
                <OverlayTrigger
                    placement="bottom"
                    overlay={ props.page === "discoverable" ? <Tooltip>Save Restaurant</Tooltip> : <Tooltip>Remove Restaurant</Tooltip>}
                >
                    <Button
                        variant={saved ? "danger" : "outline-danger"}
                        style={{ marginLeft: "9.5rem", marginRight: "0.5rem" }}
                        onClick={() => {
                            if (!saved) {
                                move(props.page, "save", props.name);
                            } else {
                                move("save", "discoverable", props.name);
                            }
                            toggleSaved(!saved);
                        }}
                    >
                    {props.page === "discoverable" ? <>{"♡"}</> : <>{"❤︎"}</>}
                    </Button>
                </OverlayTrigger>
                
                {(props.page !== "discoverable" && props.page !== "review") && (<>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>{showMore ? "Hide Review" : "Write a Review"}</Tooltip>}
                    >
                        <Button
                            variant={showMore ? "primary" : "outline-primary"}
                            onClick={() => {
                                toggleShowMore(!showMore);
                            }} 
                            >
                                {showMore ? "Hide Review" : "Review✎"}
                        </Button>
                    </OverlayTrigger>

                </>)}</>)}

                {props.page  !== "review" && showMore && (//dont show the submition form when already reviewed
                    <div style={{ marginTop: "1rem" }}>
                        <form>
                            <textarea
                                placeholder="Write your review..."
                                rows="4"
                                className="form-control"
                                onChange={(e) => props.setReview(e.target.value)}
                            ></textarea>

                            <Button
                                variant="success"
                                style={{ marginTop: "0.5rem" }}
                                onClick={() => {move(props.page, "review", props.name)}}
                            >
                                Submit Review
                            </Button>
                        </form>
                    </div>
                )}

                {props.page === "review" && (<>
                    <Button
                        variant={"primary"}
                        style={{ marginRight: "10.5rem"}}
                        onClick={() => toggleShowMore(!showMore)}>
                        {showMore ? "Hide Review" : "View My Review"}
                    </Button>
                    
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>{"Delete Review"}</Tooltip>}
                    >
                        <Button
                            variant={"danger"}
                            onClick={() => {//TODO: we should give the 'are you sure?' as a modal since if they click it by accident, there is no going back
                                move(props.page, "discoverable", props.name)
                                alert("Are you sure you want to remove this review? It will be removed from 'Saved' too.")
                            }} 
                        >
                            {"Delete Review ✗"}
                        </Button>
                    </OverlayTrigger>
                    {showMore && (
                        <div style={{ marginTop: "1rem"}}>
                            <div className="form-control">
                                {props.reviews}
                            </div>
                        </div>
                    )}
                </>)}
            </Card.Body>
        </Card>
        
    );
    
}

/*
{isAdoptablePage && (
                    <div>
                        <Button
                            id="show-more-btn"
                            variant="outline-primary"
                            style={{ marginRight: "0.5rem" }}
                            onClick={() => toggleShowMore(!showMore)}
                        >
                            {showMore ? "Show Less" : "Show More"}
                        </Button>

                        <Button
                            id="save-btn"
                            variant={"success"}
                            onClick={() => {
                                move("adoptable", "basket", props.id)
                                alert(props.name + " has been added to your basket!");
                            }} 
                        >
                            {"Save ♡"}
                        </Button>
            
                        {showMore ? 
                            <div style={{ marginTop: "1rem" }}>
                                <p><strong>Gender:</strong> {props.gender}</p>
                                <p><strong>Breed:</strong> {props.breed}</p>
                                <p><strong>Age:</strong> {props.age} years</p>
                                <p>{props.description}</p>
                            </div> : null
                        }
                    </div>
                )}

                {!isAdoptablePage && (
                    <div className="d-grid gap-2">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => {
                                move("basket", null, props.id)
                                alert(props.name + " has been adopted!");
                            }} 
                        >
                            Adopt!
                        </Button>

                        <Button
                            variant="outline-danger"
                            onClick={() => {
                                move("basket", "adoptable", props.id)
                                alert(props.name + " has been removed from your basket!");
                            }} 
                        >
                            Unselect
                        </Button>
                    </div>
                )}
*/