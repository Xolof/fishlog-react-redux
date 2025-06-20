import FishCatchCard from "./FishCatchCard";
import { FishCatch } from "./../../types/FishCatch";

type FeedProps = {
  fishCatches: FishCatch[];
};

const Feed: React.FC<FeedProps> = ({ fishCatches }) => {
  return (
    <>
      {fishCatches.map((fishCatch) => (
        <FishCatchCard fishCatch={fishCatch} key={fishCatch.id} />
      ))}
    </>
  );
};

export default Feed;
