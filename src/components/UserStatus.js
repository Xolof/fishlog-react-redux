const UserStatus = ({ userName }) => {


    if (userName) {
        return (
            <>
                <p>Logged in as {userName}</p>
            </>
        )
    }

    return (<p>Not logged in</p>)
}

export default UserStatus;
