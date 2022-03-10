import { Slider } from "@material-ui/core";
import { useApplicationContext } from "../../context/DataContext";

const labels = [
  {
    value: 0,
    label: "0 cm",
  },
  {
    value: 100,
    label: "100 cm",
  },
  {
    value: 200,
    label: "200 cm",
  },
  {
    value: 300,
    label: "300 cm",
  },
  {
    value: 400,
    label: "400 cm",
  },
  {
    value: 500,
    label: "500 cm",
  },
];

const LengthFilter = () => {
  const { filterOnLength, setFilterOnLength } = useApplicationContext();

  const updateRange = (e, data) => {
    setFilterOnLength({ min: data[0], max: data[1] });
  };

  return (
    <Slider
      value={[filterOnLength.min, filterOnLength.max]}
      onChange={updateRange}
      marks={labels}
      min={0}
      max={500}
    />
  );
};

export default LengthFilter;
