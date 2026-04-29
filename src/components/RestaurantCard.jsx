import { Button, Card, Carousel, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState, useContext, useRef} from "react";

import RestaurantsDataContext from "../contexts/RestaurantsDataContext";
import ReviewForm from "./reviewing/ReviewForm"
import ReviewedCardHeader from "./reviewing/ReviewedCardHeader"

// AI used to help with toggle functionality, overlay triggers, and breakup of review components
export default function RestaurantCard(props) {
    const [restaurants, setRestaurants, move] = useContext(RestaurantsDataContext);
    const savedRating = props.review?.rating || 0;
    const savedSticker = props.review?.sticker || "";

    // state for show more toggle and save button
    const [showMore, toggleShowMore] = useState(false);

    const saved = restaurants.save.some(rest => rest.name === props.name);
    return (
        <Card className="h-100 shadow-sm">
            <Card.Img variant="top" src={props.image} alt={`Photo of ${props.name}`} style={{ height: "200px", objectFit: "cover" }} />
            <Card.Body>
                {props.page === "review" && <ReviewedCardHeader review={props.review} />}

                <Card.Title>{props.name}</Card.Title>
                <p>{props.cost}</p>
                <p style={{ color: "gray" }}>{props.cuisine.join(" | ")}</p> 
                <p style={{ color: "gray", fontSize: "0.8rem" }}>{props.vibe.join(", ")}</p>      

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
                        style={{ marginLeft: "10px" }}
                        onClick={() => {
                            if (!saved) {
                                move(props.page, "save", props.name);
                            } else {
                                move("save", "discoverable", props.name);
                            }
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
                            style={{ marginLeft: "10px" }}
                            onClick={() => {
                                toggleShowMore(!showMore);
                            }} 
                            >
                                {showMore ? "Hide Review" : "Review✎"}
                        </Button>
                    </OverlayTrigger>

                </>)}</>)}

                
                {props.page !== "review" && showMore && ( // Show review form when not in review page and showMore is true
                    <ReviewForm name={props.name} page={props.page} move={move} />
                )}

                {props.page === "review" && (<>
                    <Button
                        variant={"primary"}
                        style={{ marginRight: ".5rem"}}
                        onClick={() => toggleShowMore(!showMore)}>
                        {showMore ? "Hide Review" : "View My Review"}
                    </Button>
                    
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>{"Delete Review"}</Tooltip>}
                    >
                        <Button
                            variant={"danger"}
                            onClick={() => {
                                if (window.confirm("Are you sure you want to remove this review?")) {
                                    move("review", "discoverable", props.name);
                                }
                            }} 
                        >
                            {"✗"}
                        </Button>
                    </OverlayTrigger>
                    {showMore && (
                        <div style={{ marginTop: "1rem"}}>
                            <div className="form-control">
                                {props.review?.text}
                            </div>
                        </div>
                    )}
                </>)}
            </Card.Body>
        </Card>
        
    );
    
}
