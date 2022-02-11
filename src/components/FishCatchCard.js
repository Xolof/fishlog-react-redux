const FishCatchCard = ({ fishCatch }) => {
    const splitPosition = fishCatch.location.split(",");
    const lat = splitPosition[0].slice(0, 4);
    const lon = splitPosition[1].slice(0, 4);
    
    return (
        <section className="fishCatchCard">
                <h3>{fishCatch.species}</h3>
                <p>{fishCatch.length} cm</p>
                <p>{fishCatch.weight} g</p>
                <p>{lat} {lon}</p>
                <p className="postDate">{fishCatch.date}</p>
                <p>Caught by {fishCatch.username}</p>
                <img src={`http://localhost:8000${fishCatch.imageurl}`} alt={fishCatch.species} />
        </section>
    )
}

export default FishCatchCard;
