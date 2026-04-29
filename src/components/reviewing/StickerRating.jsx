import { Button } from "react-bootstrap";

const stickers = ["😍", "😊", "😐", "😕", "🤢", "🥳", "💅", "🤌", "🍕", "🍣", "🍔", "🌮", "☕", "🍸", "🍾", "🍻", "🎉", "🔥"];

export default function StickerPicker({ sticker, setSticker }) {
    //can select an emoji to describe the restaurant
    return (
        <div>
            {stickers.map((emoji) => (
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
    );
}