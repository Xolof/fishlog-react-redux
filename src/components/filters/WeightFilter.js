import { Slider } from "@material-ui/core";
import {
  selectFilterOnWeightMin,
  selectFilterOnWeightMax,
  setFilterOnWeightMin,
  setFilterOnWeightMax,
} from "../../slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";

const labels = [
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

const WeightFilter = () => {
  const dispatch = useDispatch();
  const filterOnWeightMin = useSelector(selectFilterOnWeightMin);
  const filterOnWeightMax = useSelector(selectFilterOnWeightMax);

  const updateRange = (e, data) => {
    dispatch(setFilterOnWeightMin(data[0]));
    dispatch(setFilterOnWeightMax(data[1]));
  };

  return (
    <Slider
      value={[filterOnWeightMin, filterOnWeightMax]}
      onChange={updateRange}
      marks={labels}
      min={0}
      max={10000}
    />
  );
};

export default WeightFilter;
