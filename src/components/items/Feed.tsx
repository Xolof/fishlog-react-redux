import FishCatchCard from "./FishCatchCard";

const Feed = ({ fishCatches }) => {
  return (
    <>
      {fishCatches.map((fishCatch) => (
        <FishCatchCard fishCatch={fishCatch} key={fishCatch.id} />
      ))}
    </>
  );
};

export default Feed;
