
const FlashMessage = ({ flashMessage }) => {
    return (
        <>
            {
                flashMessage ?
                <p className="flashMessage">{flashMessage}</p> :
                null
            }
        </>

    )
}

export default FlashMessage;
