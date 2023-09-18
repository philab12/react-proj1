import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";

export default function Customers(){
    const [customers,setCustomers] = useState();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    function toggleShow(){
        setShow(!show)
    }

    useEffect(() => {
        console.log("fetching...");
        const url = `${baseUrl}/customers`;
        fetch(url)
        .then((response) => {
            //console.log(response.status);
            if(response.status === 401){
                navigate("/login")
            }
            if(!response.ok) throw new Error("Something Went Wrong");
            return response.json()
        })
        .then((data) => {
            setCustomers(data)
        })
        .catch(e => console.log(e.message))
    },[navigate]);



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
            toggleShow();
          
            
            //make sure the list is updated appropriately
            console.log(data);
            setCustomers([...customers,data])
        })
        .catch((e) => {
            console.log(e)
        })
    }



    return (
        <>
        <h1>Here are our customers: </h1>
       
        {
            customers ? 
            customers.map((cust) => {
                return (
                <div className="m-2" key={cust.id}>
                     <Link to={`/customer/${cust.id}`} >
                        <button className="no-underline bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                        {cust.name}
                        </button>
                    </Link>
                </div>
                )
            }) : null
        }
       

        <AddCustomer newCustomer={newCustomer} show={show} toggleShow={toggleShow} />
        </>
    )
}