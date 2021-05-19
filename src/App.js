import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  // URL in a variable
  const url = "http://localhost:4500";

  // State to hold the list of dogs
  const [moons, setMoons] = React.useState([]);

  // Empty Dog - For the Create Form
  const emptyMoon = {
    img:"",
    name: "",
    sign: "",
    description: "",
  };

  const [selectedMoon, setSelectedMoon] = React.useState(emptyMoon);

  // Function to get list of Dogs
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

  // function to specify which dog we are updated
  const selectMoon = (moon) => {
    setSelectedMoon(moon);
  };

  // deleteDog to delete inidividual dogs
  const deleteMoon = (moon) => {
    fetch(url + "/moon/" + moon._id, {
      method: "delete"
    })
    .then(() => {
      getMoons()
    })
  }

  return (
    <div className="App">
      <h1>SAILOR MOON CHARACTERS</h1>
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
