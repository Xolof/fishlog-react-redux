
const FlashMessage = ({ flashMessage }) => {
  return (
    <>
      {
        flashMessage ?
          <p className={`flashMessage ${flashMessage.style}`}>{flashMessage.message}</p> :
          null
      }
    </>

  )
}

export default FlashMessage;
