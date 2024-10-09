import React, { useState } from 'react';
import { filterOptions } from './AllData/filterOptions'; // Adjust the path as necessary

const FilterSidebar = ({ filters, onFilterChange, makeNetworkCall }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState({
    brand: false,
    category: false,
  });
  console.log(filters);
  const handleFilterChange = (filterName, value) => {
    const updatedFilters = { ...filters };

    if (filterName === 'brand' || filterName === 'category') {
      if (!Array.isArray(updatedFilters[filterName])) {
        updatedFilters[filterName] = [];
      }

      if (updatedFilters[filterName].includes(value)) {
        updatedFilters[filterName] = updatedFilters[filterName].filter((item) => item !== value);
      } else {
        updatedFilters[filterName].push(value);
      }
    } else if (filterName === 'price') {
      let [min, max] = value.replace(/[₹,]/g, '').split(' - ');
      console.log(min, max);
      min = parseInt(min, 10);
      max = parseInt(max, 10);
      updatedFilters[filterName] = { min, max };
    } else if (filterName === 'rating') {
      updatedFilters[filterName] = parseInt(value[0], 10);
    } else if (filterName === 'search') {
      updatedFilters['search'] = value.trim().toLowerCase();
    } else {
      // General case for other filters
      updatedFilters[filterName] = value.toLowerCase();
    }

    onFilterChange(updatedFilters);
  };


  const handlePriceRangeChange = (event) => {
    const value = event.target.value;
    handleFilterChange('price', value);
  };
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    console.log(searchTerm)
    handleFilterChange('search', value);
  };

  const clearAllFilters = () => {
    onFilterChange({
      category: [],
      price: { min: 0, max: Number.MAX_VALUE },
      brand: [],
      search: '',
      rating: 0,
    });
  };

  const renderOptions = (options, type, filterType, name) => {
    if (!Array.isArray(options)) {
      return null;
    }

    if (type === 'checkbox') {
      return options.map((option, index) => (
        <label key={index} className="block mb-1 text-sm">
          <input
            type="checkbox"
            name={name}
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
            name={name}
            onChange={() => handleFilterChange(name, option.value)}
            value={filters[filterType] === option.value}
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

      <div className="flex flex-wrap mb-4">
        <input
          type="text"
          name="search"
          placeholder="Search products..."
          value={searchTerm}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          onChange={handleSearch}
        />
      </div>
      <button
        className="w-full bg-teal-500 text-white py-2 mb-4 rounded hover:bg-teal-800"
        onClick={clearAllFilters}
      >
        Clear All Filters
      </button>
      <button className="w-full bg-teal-500 text-white py-2 mb-4 rounded hover:bg-teal-800" onClick={() => makeNetworkCall(filters)}>
        Apply filter
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
                filter.label.toLowerCase(),
                filter.name
              )
            ) : (
              renderOptions(filter.options, filter.type, filter.label.toLowerCase(), filter.name)
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
