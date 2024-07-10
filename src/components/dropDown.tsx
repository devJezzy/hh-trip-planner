import { getCityNames } from "@/utils/getCityNames";
import React, { useState } from "react";
import Select from "react-dropdown-select";

interface Option {
  label: string;
  value: string;
}

const initialOptions: Option[] = [];

const DropdownComponent: React.FC = () => {
  const [options, setOptions] = useState<Option[]>(initialOptions);

  // const fetchCityNames = async (query: any) => {
  //     try {
  //         if (query) {
  //             const cityNames = await getCityNames(query); // Fetch city names
  //             const uniqueNames = Array.from(new Set(cityNames)); // Remove duplicates

  //             const newOptions = uniqueNames.map((name) => ({
  //                 label: name,
  //                 value: name,
  //             }));

  //             setOptions(newOptions);
  //         } else {
  //             setOptions([]);
  //         }
  //     } catch (error) {
  //         console.error('Error fetching city names:', error);
  //     }
  // };

  const [selectedValues, setSelectedValues] = useState<Option[]>([]);

  const handleChange = (values: Option[]) => {
    setSelectedValues(values);
    console.log("Selected values:", values);
  };

  // const handleEnter = (selectedValues: any) => {
  //     let searchText = "";
  //     if (selectedValues.event.key === "Backspace") {
  //         searchText = selectedValues["state"].search = selectedValues["state"].search.slice(0, -1);
  //     } else {
  //         searchText = selectedValues["state"].search + selectedValues.event.key;
  //     }
  //     fetchCityNames(searchText);
  //     console.log(searchText);
  // };

  return (
    <div className="flex-1 justify-center">
      <Select
        placeholder="Destination"
        name="destination"
        options={options}
        values={selectedValues}
        onChange={handleChange}
        // handleKeyDownFn={handleEnter}
        style={{ padding: "20px", borderRadius: "10px" }}
        color="gray"
        required
      />
    </div>
  );
};

export default DropdownComponent;
