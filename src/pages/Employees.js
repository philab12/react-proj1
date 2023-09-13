import "../index.css";
import Employee from "../components/Employee";
import { useState } from "react";
import {v4 as uuidv4} from "uuid";
import AddEmployee from "../components/AddEmployee";
import EditEmployee from "../components/EditEmployee";

function Employees() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Caleb",
      role: "Developer",
      img: "https://pixels.com/images/overview/apparel/mensTshirts002.jpg",
    },
    {
      id: 2,
      name: "Sal",
      role: "Manager",
      img: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/2/freckles-marc-meyer.jpg",
    },
    {
      id: 3,
      name: "John",
      role: "Director Of Eng",
      img: "https://render.fineartamerica.com/images/images-profile-flow/400/images-medium-large-5/1-i-am-the-way-ray-downing.jpg",
    },
    {
      id: 4,
      name: "Melanie Software Engineer",
      role: "Developer",
      img: "https://render.fineartamerica.com/images/images-profile-flow/400/images-medium-large-5/night-alexandr-sutula.jpg",
    },
    {
      id: 5,
      name: "Corey",
      role: "The Devops Guy",
      img: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/2/joyful-young-male-laughing-out-hysterically-at-funnyjoke-wit-cavan-images-sumeet-kansara.jpg",
    },
    {
      id: 6,
      name: "Jake",
      role: "Senior",
      img: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/2/comedian-rodney-dangerfield-portrait-george-rose.jpg",
    },
  ]);


  function updateEmployee(id, newName, newRole){
     const updatedEmployees = employees.map((employee) => {

      if(id === employee.id){
        //return new Employee
        return {...employee, name:newName, role:newRole}
      }

      return employee

     });
     setEmployees(updatedEmployees);    
  }


  function newEmployee(name, role, img){
    const newEmployee = {
      id: uuidv4(),
      name,
      role,
      img

     }
     setEmployees([...employees, newEmployee])
  }

  const showEmployees = true;

  return (
    <div className="">
      
      {showEmployees ? (
        <>
      
          <div className="flex flex-wrap justify-center">
            {employees.map((employee) => {
              const editEmployee = (<EditEmployee name={employee.name} role={employee.role} updateEmployee={updateEmployee} id={employee.id} />)
             return (
                <Employee
                key={employee.id}
                id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  img={employee.img}
                  editEmployee={editEmployee}
                />
              );
            })}
          </div>
          <AddEmployee newEmployee={newEmployee} />
        </>
      ) : (
        <p>You cannot see the employees</p>
      )}
    </div>
  );
}

export default Employees;
