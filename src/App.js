import React, { useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@mui/material";

import InfoBox from "./InfoBox";
import Table from "./Table";
import {sortData} from "./util";
import "./App.css";





function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(["worldwide"]);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  // state: how to write variable in react

  //disease.sh -> covid19 for all countries

  //useeffect= run a piece of code based on given condition

  useEffect(() => {
    // code inside here will run once
    // when the component loads and not again after
    // as well as whenever the variable countries changes

    //here we'll run asynchronous
    // async : send a req to a server,
    //wait for it, do somthing with info

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // india, united state, russia
            value: country.countryInfo.iso2, // IN, US, RUS
          }));

          const sortedData=sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);

        //all of the data from country response
        setCountryInfo(data);
      });

    // https://disease.sh/v3/covid-19/all
    // https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
  };

  console.log("country info", countryInfo);

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1 className="header_class">Covid-19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select
              varient="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide" >WorldWide</MenuItem>

              {/* loop through all countries and show dropdown list of that countries */}

              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}

              {/*
         <MenuItem value="worldwide">worldwide 1</MenuItem>
          <MenuItem value="worldwide">worldwide 2</MenuItem>
          <MenuItem value="worldwide">worldwide 3</MenuItem>
          <MenuItem value="worldwide">worldwide 4</MenuItem> 
         */}
            </Select>
          </FormControl>
        </div>

        {/* header */}
        {/* title + select input dropdown field */}

        {/***************************************************************************************** */}

        <div className="app_stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}

            className="deat"
          />

          {/* it hold infobox */}
          {/* infobox title= coronavirus cases */}
          {/* infobox title= coronavirus recoveries */}
          {/* infobox title= no. of deaths */}
        </div>

        {/* infobox */}
        {/* infobox */}
        {/* infobox */}

        {/********************************************************* */}

        
        {/* map */}
      </div>

      <Card className="app_right">
        <CardContent>
          {/* tables */}
          <h3>Total covid cases in country</h3>
          <Table countries={tableData} /> 
          {/* graph */}

          {/*<LineGraph /> 
          <h3>worldwise new cases</h3> */}
        </CardContent>

        {/********************************************************* */}
      </Card>
    </div>
  );
}

export default App;
