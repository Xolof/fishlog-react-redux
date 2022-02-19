import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <article className="notFoundArticle">
            <h1 className="fourOfour">404</h1>
            <h2>Not found</h2>
            <Link to="/">Go to homepage</Link>
        </article>
    )
}

export default NotFound;
