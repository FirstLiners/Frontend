// Import React and useState hook
import React, { useState } from "react";

// Import the JSON file that contains the data
import data from "../../../mocdata/forecast.json";

// Define a custom component that renders a select element
const DashboardSelect = () => {
  // Initialize the state to store the selected option
  const [selected, setSelected] = useState("");

  // Define a function that handles the change event of the select element
  //@ts-expect-error
  const handleChange = (event) => {
    // Update the state with the new selected option
    setSelected(event.target.value);
  };

  // Return the JSX code that renders the select element
  return (
    <div className="dashboard-select">
      <label htmlFor="select">Select an option:</label>
      <select id="select" value={selected} onChange={handleChange}>
        {/* Map each item in the data array to an option element */}
        {/*@ts-expect-error*/}
        {data.map((item) => (
          <option key={item.id} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Export the component
export default DashboardSelect;
