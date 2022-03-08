import { Slider } from "@material-ui/core";
import { useApplicationContext } from "../../context/DataContext";

const LengthFilter = () => {
  const { filterOnLength, setFilterOnLength } = useApplicationContext();

  const gfg = [
    // ändra till beskrivande namn
    // Kan läggas utanför komponenten
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

  const updateRange = (e, data) => {
    setFilterOnLength(data);
  };

  return (
    <Slider
      value={filterOnLength}
      onChange={updateRange}
      marks={gfg}
      min={0}
      max={500}
    />
  );
};

export default LengthFilter;
