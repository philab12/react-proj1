import "./index.css";
import Employee from "./components/Employee";
import { useState } from "react";
import {v4 as uuidv4} from "uuid";

function App() {
  const [role, setRole] = useState("dev");
  const [employees, setEmployees] = useState([
    {
      name: "Caleb",
      role: "Developer",
      img: "https://pixels.com/images/overview/apparel/mensTshirts002.jpg",
    },
    {
      name: "Sal",
      role: "Manager",
      img: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/2/freckles-marc-meyer.jpg",
    },
    {
      name: "John",
      role: "Director Of Eng",
      img: "https://render.fineartamerica.com/images/images-profile-flow/400/images-medium-large-5/1-i-am-the-way-ray-downing.jpg",
    },
    {
      name: "Melanie Software Engineer",
      role: "Developer",
      img: "https://render.fineartamerica.com/images/images-profile-flow/400/images-medium-large-5/night-alexandr-sutula.jpg",
    },
    {
      name: "Corey",
      role: "The Devops Guy",
      img: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/2/joyful-young-male-laughing-out-hysterically-at-funnyjoke-wit-cavan-images-sumeet-kansara.jpg",
    },
    {
      name: "Jake",
      role: "Senior",
      img: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/2/comedian-rodney-dangerfield-portrait-george-rose.jpg",
    },
  ]);
  const showEmployees = true;

  return (
    <div className="App">
      {showEmployees ? (
        <>
          <input
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
              setRole(e.target.value);
            }}
          />
          <div className="flex flex-wrap justify-center">
            {employees.map((employee) => {
             return (
                <Employee
                key={uuidv4()}
                  name={employee.name}
                  role={employee.role}
                  img={employee.img}
                />
              );
            })}
          </div>
        </>
      ) : (
        <p>You cannot see the employees</p>
      )}
    </div>
  );
}

export default App;
