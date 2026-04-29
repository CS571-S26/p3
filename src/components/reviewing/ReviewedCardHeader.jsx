// ReviewedCardHeader.jsx
export default function ReviewedCardHeader({ review }) {
    const savedRating = review?.rating || 0;
    const savedSticker = review?.sticker || "";

    //Stars for reviewing (can range 1-5)
    return (<>
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
    </>);
}