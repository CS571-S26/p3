import { Link } from "react-router";

export default function PageNotFound(props) {

    return (
        <div>
            <h1>That's a 404.</h1>
            <p>Uh oh, looks like you've taken a wrong turn!</p>
            <p>
                <Link to="/">Back to safety.</Link>
            </p>
        </div>
    );
}
