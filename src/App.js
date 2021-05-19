import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  // URL in a variable
  const url = "https://moonapi.herokuapp.com";

  // State to hold the list of moons
  const [moons, setMoons] = React.useState([]);

  // Empty Moon- For the Create Form
  const emptyMoon = {
    img:"",
    name: "",
    sign: "",
    description: "",
  };

  const [selectedMoon, setSelectedMoon] = React.useState(emptyMoon);

  // Function to get list 
  const getMoons = () => {
    // make a get a request to this url
    fetch(url + "/moon/")
      // use .then to take action when the response comes in
      // convert data into js object
      .then((response) => response.json())
      // use the data from the response
      .then((data) => {
        setMoons(data);
      });
  };

  // useEffect, to get the data right away
  React.useEffect(() => {
    getMoons();
  }, []);

  //handleCreate - function for when the create form is submitted
  const handleCreate = (newMoon) => {
    fetch(url + "/moon/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMoon),
    }).then(() => getMoons());
  };

  // handleUpdate - function for when the edit form is submitted
  const handleUpdate = (moon) => {
    fetch(url + "/moon/" + moon._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(moon),
    }).then(() => getMoons());
  };

  // function to specify which moon we are updated
  const selectMoon = (moon) => {
    setSelectedMoon(moon);
  };

  // deleteDog to delete inidividual moon
  const deleteMoon = (moon) => {
    fetch(url + "/moon/" + moon._id, {
      method: "delete"
    })
    .then(() => {
      getMoons()
    })
  }

  return (
    <div style={{ 
      backgroundImage: `url("https://wallpapercave.com/wp/wp6203652.png")`, 
      
    }} className="App">
      <h1 style={{color:"#DD869B", fontWeight: 'bold', fontFamily: 'Italianno' ,fontStyle: 'italic' }}>Sailor Moon Characters</h1>
      <hr />
      <Link to="/create">
        <button>Add Sailor</button>
      </Link>
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => (
              <Display 
              {...rp} 
              moons={moons} 
              selectMoon={selectMoon}
              deleteMoon={deleteMoon} 
              />
            )}
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form
                {...rp}
                label="create"
                moon={emptyMoon}
                handleSubmit={handleCreate}
              />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form 
              {...rp} 
              label="update" 
              moon={selectedMoon} 
              handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
