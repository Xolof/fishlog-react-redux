const About = () => {
  return (
    <article>
      <p>
        This is an app for logging fish you caught. The the frontend is made
        with React and Redux and the backend is made with Laravel.
        <h2>GitHub Repositories</h2>
        <ul>
          <li>
            <a
              href="https://github.com/Xolof/fishlog-react-redux"
              target="_blank"
              rel="noreferrer"
            >
              Frontend
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Xolof/fishlog-backend"
              target="_blank"
              rel="noreferrer"
            >
              Backend
            </a>
          </li>
        </ul>
      </p>
    </article>
  );
};

export default About;
