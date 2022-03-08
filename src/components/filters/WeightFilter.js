import { Slider } from "@material-ui/core";
import { useApplicationContext } from "../../context/DataContext";

const WeightFilter = () => {
  const { filterOnWeight, setFilterOnWeight } = useApplicationContext();

  const gfg = [
    {
      value: 0,
      label: "0 g",
    },
    {
      value: 2500,
      label: "2500 g",
    },
    {
      value: 5000,
      label: "5000 g",
    },
    {
      value: 7500,
      label: "7500 g",
    },
    {
      value: 10000,
      label: "10 000 g",
    },
  ];

  const updateRange = (e, data) => {
    setFilterOnWeight(data);
  };

  return (
    <Slider
      value={filterOnWeight}
      onChange={updateRange}
      marks={gfg}
      min={0}
      max={10000}
    />
  );
};

export default WeightFilter;
