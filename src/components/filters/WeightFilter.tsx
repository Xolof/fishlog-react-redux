import { Slider } from "@mui/material";
import {
  selectFilterOnWeightMin,
  selectFilterOnWeightMax,
  setFilterOnWeightMin,
  setFilterOnWeightMax,
} from "../../slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { SyntheticEvent } from "react";

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

const WeightFilter: React.FC = () => {
  const dispatch = useDispatch();
  const filterOnWeightMin = useSelector(selectFilterOnWeightMin) as number;
  const filterOnWeightMax = useSelector(selectFilterOnWeightMax) as number;

  const updateRange = (
    _e: Event | SyntheticEvent<Element, Event>,
    data: number | number[]
  ) => {
    if (Array.isArray(data) && data.length === 2) {
      dispatch(setFilterOnWeightMin(data[0]));
      dispatch(setFilterOnWeightMax(data[1]));
    }
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
