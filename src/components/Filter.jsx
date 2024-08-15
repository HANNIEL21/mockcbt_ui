import react from "react";
import React from "react";

const Filter = ({ onFilter, filter, filterText }) => {
  const [isActive, setIsActive] = react.useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        className="border-2 border-gray-300 rounded-md m-0 px-2 py-1 focus:outline-none focus:border-blue-500 text-blue-900  text-lg"
        placeholder={`Search by ${filter}`}
        value={filterText}
        onChange={onFilter}
      />
    </div>
  );
};

export default Filter;
