import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import NotFound from "../components/NotFound";
import { baseUrl } from "../shared";

export default function Customer () {
    const [customer, setCustomer] = useState();
    const [notFound, setNotFound] = useState(false);
   const {id} = useParams();
   //const navigate = useNavigate();

   useEffect(() => {

    const url = `${baseUrl}/customers/${id}`;

    fetch(url)
    .then((response) => {
        if(response.status === 404){
        //   //redirect to a 404 page (new URL)
        //   navigate("/404");

        // render a 404 component in this page
        setNotFound(true);
        }
        return response.json();
    })
    .then((data) => {
       setCustomer(data);
    })
    .catch(e => {
        console.log(e.message);
    })

   },[id])


   

    return ( 
    <>
    {notFound ? <p>Customer Not Found</p> : null}
    {
     customer ? (   
    <div>
        <p>{customer.id}</p>
        <p>{customer.name}</p>
        <p>{customer.industry}</p>
    </div>
     ) : <p>No Customer Exist</p>
    }
    <Link to="/customers">Go Back</Link>
    </>
    );
}