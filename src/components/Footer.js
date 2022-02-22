const Footer = () => {
  const dateObj = new Date();
  return (
    <footer>
      <p>&copy; Xolof {dateObj.getFullYear()}</p>
    </footer>
  )
}

export default Footer;
