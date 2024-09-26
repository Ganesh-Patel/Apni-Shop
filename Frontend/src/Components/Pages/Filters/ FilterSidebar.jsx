import React, { useState } from 'react';
import { filterOptions } from './AllData/filterOptions'; // Adjust the path as necessary

const FilterSidebar = ({ filters, onFilterChange }) => {
  const [showAll, setShowAll] = useState({
    brand: false,
    category: false,
  });
  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...filters };

    if (filterType === 'brand' || filterType === 'category') {
      if (!Array.isArray(updatedFilters[filterType])) {
        updatedFilters[filterType] = [];
      }

      if (updatedFilters[filterType].includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter((item) => item !== value);
      } else {
        updatedFilters[filterType].push(value);
      }
    } else {
      const filterName = filterType.replace(/[\s_.,]+/g, '').toLowerCase();
      updatedFilters[filterName] = value;
    }
    onFilterChange(updatedFilters);
  };

  const handlePriceRangeChange = (event) => {
    const value = event.target.value;
    handleFilterChange('priceRange', value);
  };

  const clearAllFilters = () => {
    onFilterChange({
      category: [],
      priceRange: '',
      price: '',
      brand: [],
      avgcustomerreview: '',
      rating: '',
    });
  };

  const renderOptions = (options, type, filterType) => {
    if (!Array.isArray(options)) {
      return null;
    }

    if (type === 'checkbox') {
      return options.map((option, index) => (
        <label key={index} className="block mb-1 text-sm">
          <input
            type="checkbox"
            onChange={() => handleFilterChange(filterType, option.value)}
            checked={filters[filterType]?.includes(option.value) || false}
            className="mr-2"
          />
          {option.label}
        </label>
      ));
    }

    if (type === 'radio') {
        return options.map((option, index) => (
          <label key={index} className="flex items-center mb-1 text-sm">
            <input
              type="radio"
              name={filterType}
              onChange={() => handleFilterChange(filterType, option.value)}
              checked={filters[filterType] === option.value}
              className="form-radio text-teal-500 focus:ring-teal-500 mr-2"
            />
            <span className={`ml-2 ${filters[filterType] === option.value ? 'text-teal-500' : 'text-gray-700'}`}>
              {option.label}
            </span>
          </label>
        ));
      }
    return null;
  };

  return (
    <div className="w-full lg:w-full p-4 border-r border-gray-300">
      <button
        className="w-1/2 bg-teal-500 text-white py-2 mb-4 rounded hover:bg-teal-800"
        onClick={clearAllFilters}
      >
        Clear All Filters
      </button>

      {filterOptions.map((filter, index) => {
        const isBrandOrCategory = filter.label === 'Brand' || filter.label === 'Category';
        const showMore = showAll[filter.label.toLowerCase()];

        return (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{filter.label}</h3>

            {filter.label === 'Price Range' ? (
              <select
                value={filters.priceRange}
                onChange={handlePriceRangeChange}
                className="w-full p-2 border rounded"
              >
                {filter.options.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : isBrandOrCategory ? (
              renderOptions(
                filter.options.slice(0, showMore ? filter.options.length : 5),
                filter.type,
                filter.label.toLowerCase()
              )
            ) : (
              renderOptions(filter.options, filter.type, filter.label.toLowerCase())
            )}

            {isBrandOrCategory && filter.options.length > 5 && (
              <button
                className="text-blue-500 text-sm mt-2"
                onClick={() =>
                  setShowAll((prevState) => ({
                    ...prevState,
                    [filter.label.toLowerCase()]: !showMore,
                  }))
                }
              >
                {showMore ? 'See Less' : 'See More'}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FilterSidebar;
