import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import "./Country.css";

const Country = () => {
  const [api, setApi] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        let res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setApi(data);
      } catch (err) {
        console.log("fetch Api Error");
      }
    };
    fetchdata();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const filteredCountries = api
    ? api.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div>
      <div className="headerstyle">
        <input
          className="input"
          type="text"
          placeholder=" Search For Countries"
          value={searchTerm}
          onChange={handleSearch}
        />
        <CiSearch style={{ width: 50, padding: "2px", marginLeft: "-40px" }} />
      </div>
      <div className="Main__container">
        {filteredCountries.map((country) => (
          <div key={country.cca1} className="Country-card">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className="img"
            />
            <div>
              <h3 className="text"> {country.name.common} </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Country;
