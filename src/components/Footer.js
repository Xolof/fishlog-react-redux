const Footer = () => {
    const dateObj = new Date();
    return (
        <footer>
            <p>Copyright Xolof &copy; {dateObj.getFullYear()}</p>
        </footer>
    )
}

export default Footer;
