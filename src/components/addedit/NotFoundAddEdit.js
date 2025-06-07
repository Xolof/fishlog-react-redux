import { Link } from "react-router-dom";

const NotFoundAddEdit = () => {
  return (
    <article>
      <p>
        <Link to="/login">Login</Link> to be able to add a catch.
      </p>
      <p>
        Or <Link to="/signup">create an account.</Link>
      </p>
    </article>
  )
}

export default NotFoundAddEdit;
