import "../css/search.css";
import { useState } from "react";

export default function Filter(props) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleFilter = (e) => {
    setSelectedCategory(e.target.value);
    props.onFilter(e.target.value);
  };

  const categories = Array.from(new Set(Object.values(props.pizza).map((item) => item.category)));

  return (
    <div className="category-filter mt-4">
      <select
        id="category"
        value={selectedCategory}
        onChange={handleFilter}
        className="filter-select"
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
