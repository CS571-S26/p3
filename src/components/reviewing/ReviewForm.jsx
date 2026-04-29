import { useState, useRef } from "react";
import { Button } from "react-bootstrap";

import StarRating from "./StarRating";
import StickerRating from "./StickerRating";

export default function ReviewForm({ name, page, move }) {
    const reviewRef = useRef('');
    const [rating, setRating] = useState(0);
    const [sticker, setSticker] = useState("");

    //Holds the review text for each restaurant
    return (
        <div style={{ marginTop: "1rem" }}>
            <form>
                <StarRating rating={rating} onSelect={setRating} /> 
                <StickerRating sticker={sticker} setSticker={setSticker} />
                <label htmlFor={`review-${name}`} className="form-label"><b>Write your review</b></label>
                <textarea
                    id={`review-${name}`}
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

                        move(page, "review", name, {
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
    );
}