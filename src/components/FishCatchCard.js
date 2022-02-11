const FishCatchCard = ({ fishCatch }) => {
    return (
        <section className="fishCatchCard">
                <h3>{fishCatch.species}</h3>
                <p>{fishCatch.length} cm</p>
                <p>{fishCatch.weight} g</p>
                <p>{fishCatch.location}</p>
                <p className="postDate">{fishCatch.date}</p>
                <p>Caught by {fishCatch.username}</p>
                <img src={`http://localhost:8000${fishCatch.imageurl}`} alt={fishCatch.species} />
        </section>
    )
}

export default FishCatchCard;
