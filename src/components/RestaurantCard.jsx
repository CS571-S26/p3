import { Button, Card, Carousel, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState, useContext, useRef} from "react";

import RestaurantsDataContext from "../contexts/RestaurantsDataContext";

export default function RestaurantCard(props) {
    const [restaurants, setRestaurants, move] = useContext(RestaurantsDataContext);
    const reviewRef = useRef('');
    const [rating, setRating] = useState(0);
    const savedRating = props.review?.rating || 0;
    const [sticker, setSticker] = useState("");
    const savedSticker = props.review?.sticker || "";
    const stickers = ["😍", "😊", "😐", "😕", "🤢", "🥳", "💅", "🤌", "🍕", "🍣", "🍔", "🌮", "☕", "🍸", "🍾", "🍻", "🎉", "🔥"]; // AI emojis

    // state for show more toggle and save button
    const [showMore, toggleShowMore] = useState(false);

    const saved = restaurants.save.some(rest => rest.name === props.name);
    return (
        <Card className="h-100 shadow-sm">
            <Card.Img variant="top" src={props.image} alt={`Photo of ${props.name}`} style={{ height: "200px", objectFit: "cover" }} />
            <Card.Body>
                {(props.page === "review" ) && (<>
                    <div style={{ marginBottom: "1rem"}}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                style={{
                                    fontSize: "2.5rem",
                                    color: star <= savedRating ? "gold" : "gray"
                                }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    {savedSticker && (
                        <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                            {savedSticker}
                        </div>
                    )}
                </>)}

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

                {props.page  !== "review" && showMore && (//dont show the submition form when already reviewed
                    <div style={{ marginTop: "1rem" }}>
                        <form>
                            <div style={{ marginBottom: "0.5rem" }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`${star} star rating`}
                                        style={{
                                            fontSize: "1.5rem",
                                            cursor: "pointer",
                                            color: star <= rating ? "gold" : "gray",
                                            marginRight: "0.15rem"
                                        }}
                                        onClick={() => setRating(star)}
                                        onKeyDown={(e) => { // Can enter star rating w/ keyboard as well, got some AI help with structure of how to make each star keyboard-selectable
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                setRating(star);
                                            }
                                        }}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <div>
                                {stickers.map((emoji) => ( // the fun emoji sticker palette!
                                    <Button 
                                        key={emoji}
                                        variant={sticker === emoji ? "danger" : "outline-danger"}
                                        size="sm"
                                        aria-label={`Select ${emoji} sticker`}
                                        style={{ 
                                            marginRight: "0.25rem",
                                            marginBottom: "0.25rem",
                                            fontSize: "1.25rem",
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSticker(emoji);
                                            }}>
                                                {emoji}
                                        </Button>
                                ))}
                            </div>
                            <label htmlFor={`review-${props.name}`} className="form-label">Write your review</label>
                            <textarea
                                id={`review-${props.name}`}
                                placeholder="Write text here..."
                                rows="4"
                                className="form-control"
                                onChange={(e) => reviewRef.current = e.target.value}
                            ></textarea>
                            <Button
                                variant="success"
                                style={{ marginTop: "0.5rem" }}
                                onClick={(e) => {
                                    e.preventDefault();

                                    const text = reviewRef.current?.trim();

                                    if (!text || rating === 0 || !sticker) {
                                        window.alert("Make sure you write review, star rate, and select a sticker to submit your review.");
                                        return;
                                    }

                                    move(props.page, "review", props.name, {
                                        text: reviewRef.current,
                                        rating: rating,
                                        sticker: sticker
                                    });
                                }}
                            >
                                Submit Review
                            </Button>
                        </form>
                    </div>
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
