import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";

export default function Customers(){
    const [customers,setCustomers] = useState();

    useEffect(() => {
        console.log("fetching...");
        const url = `${baseUrl}/customers`;
        fetch(url)
        .then((response) => {
            //console.log(response.status);
            return response.json()
        })
        .then((data) => {
            setCustomers(data)
        })
        .catch()
    },[]);



    const newCustomer = (name, industry) => {
        const data = {name, industry};
        const url = `${baseUrl}/customers`;
        fetch(url,{
            method:"POST", 
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then((response) => {
            if(!response.ok){
                throw new Error("Something went wrong");
            }

            return response.json();
        })
        .then((data) => {
            //assume the add was successful
            //hide the modal
            //make sure the list is updated appropriately
            //setCustomers([...customers,{data}])
        })
        .catch((e) => {
            console.log(e)
        })
    }



    return (
        <>
        <h1>Here are our customers: </h1>
       <ul>
        {
            customers ? 
            customers.map((cust) => {
                return (
                <li key={cust.id}>
                     <Link to={`/customer/${cust.id}`} >{cust.name}</Link>
                </li>
                )
            }) : null
        }
        </ul>

        <AddCustomer newCustomer={newCustomer} />
        </>
    )
}