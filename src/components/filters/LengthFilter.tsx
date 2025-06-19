import { Slider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilterOnLengthMin,
  setFilterOnLengthMin,
  selectFilterOnLengthMax,
  setFilterOnLengthMax,
} from "../../slices/dataSlice";
import { SyntheticEvent } from "react";

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

const LengthFilter: React.FC = () => {
  const dispatch = useDispatch();

  const filterOnLengthMin = useSelector(selectFilterOnLengthMin) as number;
  const filterOnLengthMax = useSelector(selectFilterOnLengthMax) as number;

  const updateRange = (_e: Event | SyntheticEvent<Element, Event>, data: number | number[]) => {
    if (Array.isArray(data) && data.length === 2) {
      dispatch(setFilterOnLengthMin(data[0]));
      dispatch(setFilterOnLengthMax(data[1]));
    }
  };

  return (
    <Slider
      value={[filterOnLengthMin, filterOnLengthMax]}
      onChange={updateRange}
      marks={labels}
      min={0}
      max={500}
    />
  );
};

export default LengthFilter;
