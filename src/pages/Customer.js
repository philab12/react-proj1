import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// import NotFound from "../components/NotFound";
import { baseUrl } from "../shared";

export default function Customer() {
  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [notFound, setNotFound] = useState(false);
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!customer) return;
    if (!tempCustomer) return;
    let equal = true;
    if (customer.name !== tempCustomer.name) equal = false;

    if (customer.industry !== tempCustomer.industry) equal = false;

    if (equal) setChanged(false);
  }, [customer, tempCustomer]);

  useEffect(() => {
    const url = `${baseUrl}/customers/${id}`;

    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          //   //redirect to a 404 page (new URL)
          //   navigate("/404");

          // render a 404 component in this page
          setNotFound(true);
        }

       else if(response.status === 401){
            navigate("/login");
        }

        if (!response.ok)
          throw new Error("Something Went Wrong, try again later");
        // console.log('response',response);
        return response.json();
      })
      .then((data) => {
        setCustomer(data);
        setTempCustomer(data);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
        //console.log(e.message);
      });
  }, [id,navigate]);

  function updateCustomer(e) {
    e.preventDefault();
    const url = `${baseUrl}/customers/${id}`;
    fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something Went Wrong");
        }
        return response.json();
      })
      .then((data) => {
        setChanged(false);
        console.log(data);
        setCustomer(data);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  return (
    <div className="p-3">
      {notFound ? <p>Customer Not Found</p> : null}
      {customer ? (
        <div>
          <form
            id="customer"
            onSubmit={updateCustomer}
            className="w-full max-w-sm"
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label htmlFor="name">Name</label>
              </div>
              <div className="md:w-3/4">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  id="name"
                  onChange={(e) => {
                    setChanged(true);
                    setTempCustomer({ ...tempCustomer, name: e.target.value });
                  }}
                  value={tempCustomer.name}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label htmlFor="industry">Industry</label>
              </div>
              <div className="md:w-3/4">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="industry"
                  type="text"
                  onChange={(e) => {
                    setChanged(true);
                    setTempCustomer({
                      ...tempCustomer,
                      industry: e.target.value,
                    });
                  }}
                  value={tempCustomer.industry}
                />
              </div>
            </div>
          </form>
          {changed ? (
            <>
              <div className="mb-2">
                <button
                  className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setTempCustomer({ ...customer });
                    setChanged(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  form="customer"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </>
          ) : null}

          <div>
            <button
              className="bg-slate-800 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                const url = `${baseUrl}/customers/${id}`;
                fetch(url, {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error("Something went wrong");
                    }
                    setError(undefined);
                    navigate("/customers");
                  })
                  .catch((e) => {
                    //console.log(e);
                    setError(e.message);
                  });
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ) : null}
      {error ? <p>{error}</p> : null}
      <br />
      <Link
        to="/customers"
      >
        <button className="no-underline bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"> ← Go Back </button>
      </Link>
    </div>
  );
}
