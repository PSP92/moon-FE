import React from "react";

const Display = (props) => {
  // destruct the moons from props
  const {moons, selectMoon, history} = props

  // Returns the JSX for when you have moons
  const loaded = () => (
    <div style={{textAlign: "center"}}>
      {moons.map((moon) => (
        <article key={moon._id}>
          <img style={{height:325  }} src={moon.img}/>
          <h1 style={{color:"black"  }}>{moon.name}</h1>
          <h3 style={{color:"black"  }}>{moon.sign}</h3>
          <h4 style={{color:"black" }}>{moon.description}</h4>
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