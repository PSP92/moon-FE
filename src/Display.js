import React from "react";

const Display = (props) => {
  // destruct the moons from props
  const {moons, selectMoon, history} = props

  // Returns the JSX for when you have moons
  const loaded = () => (
    <div style={{textAlign: "center"}}>
      {moons.map((moon) => (
        <article key={moon._id}>
          <img src={moon.img}/>
          <h1>{moon.name}</h1>
          <h3>{moon.sign}</h3>
          <h3>{moon.description}</h3>
          <button onClick={() => {
            selectMoon(moon)
            history.push("/edit")
          }}>
            edit
          </button>
          <button onClick={() => {
            props.deleteMoon(moon)
          }}>
            Delete
          </button>
        </article>
      ))}
    </div>
  )

  const loading = () => <h1>Loading</h1>

  return moons.length > 0 ? loaded() : loading()
};

export default Display;