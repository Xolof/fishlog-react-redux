const Footer = () => {
    const dateObj = new Date();
    return (
        <footer>
            <p>Copyright &copy; {dateObj.getFullYear()}</p>
        </footer>
    )
}

export default Footer;
