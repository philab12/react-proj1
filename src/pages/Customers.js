import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { baseUrl } from "../shared";

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
            console.log(data)
            setCustomers(data)
        })
        .catch()
    },[])

    return (
        <>
        <h1>Here are our customers: </h1>
        {
            customers ? 
            customers.map((cust) => {
                return (
                <p key={cust.id}>
                    <Link to={`/customer/${cust.id}`} >{cust.name}</Link>
                </p>
                )
            }) : null
        }
        </>
    )
}