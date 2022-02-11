import FishCatchCard from "./FishCatchCard";

const Feed = ({ fishCatches }) => {
    return (
        <>
            {fishCatches
                .sort((a, b) => b.id - a.id)
                .map(fishCatch => (<FishCatchCard fishCatch={fishCatch} key={fishCatch.id}/>))}
        </>
    )
}

export default Feed;
