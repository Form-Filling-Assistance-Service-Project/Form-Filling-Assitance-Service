import * as React from 'react';
import "./App.css";
import Listings from "./Listings";


function App() {
  const [page,setPage] = React.useState("form")

  const handleClick= (event)=>{
      if(page ==="landing")setPage("form");
      else  setPage("landing");

  }
  return (
    <>
    <div className="App">
      <header className="App-header">
        <input type="button" value={`To ${page} page`} onClick={handleClick}/>
        {(page==="form")&&<div>
        <h3>Welcome to Form Filling Assistance demo.</h3>
        <p>
          This webapp provides some basic demonstration  of the functionality of the service.
        </p></div>}
        {(page==="landing")&&<Listings/>}
      </header>
    </div></>
  );
}

export default App;
