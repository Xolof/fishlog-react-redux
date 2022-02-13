const UserStatus = ({ userName }) => {
    if (userName) {
        return (
            <>
                <h4>Logged in as {userName}</h4>
            </>
        )
    }

    return (<h4>Not logged in</h4>)
}

export default UserStatus;
