import "../css/search.css";
import { useState } from "react";

export default function Search(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    props.onChange(e.target.value);
  };

  return (
    <div className="search-bar">
        <div style={{paddingTop: "2rem"}}>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      </div>
    </div>
  );
}
