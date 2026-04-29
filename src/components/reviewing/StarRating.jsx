export default function StarRating({ rating, savedRating, onSelect }) {
    const displayRating = savedRating ?? rating;

    return (
        <div style={{ marginBottom: "0.5rem" }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    role={onSelect ? "button" : undefined}
                    tabIndex={onSelect ? 0 : undefined}
                    aria-label={onSelect ? `${star} star rating` : undefined}
                    style={{
                        fontSize: onSelect ? "1.5rem" : "2.5rem",
                        cursor: onSelect ? "pointer" : "default",
                        color: star <= displayRating ? "gold" : "gray",
                        marginRight: "0.15rem"
                    }}
                    onClick={() => onSelect?.(star)}
                    onKeyDown={(e) => {
                        if (onSelect && (e.key === "Enter" || e.key === " ")) {
                            e.preventDefault();
                            onSelect(star);
                        }
                    }}
                >
                    ★
                </span>
            ))}
        </div>
    );
}