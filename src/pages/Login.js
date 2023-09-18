import { useState } from "react"
import { baseUrl } from "../shared";

export default function Login(){

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();


    const login = (e) => {
        e.preventDefault();
        const bodyData = {username, password};
        const url = `${baseUrl}/auth/login`;
        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(bodyData)
        })
        .then((response) => {
            if(response.status === 401){
                throw new Error("User Credentials Is Incorrect")
            }
            return response.json();
        })
        .then((data) => {
            console.log(data)
        })
        .catch((e) => {
            console.log(e.message)
        })
    }

    return (
        <form
            id="customer"
            onSubmit={login}
            className="m-2 w-full max-w-sm"
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label htmlFor="username">Username</label>
              </div>
              <div className="md:w-3/4">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  id="username"
                  onChange={(e) => {setUsername(e.target.value)}}
                  value={username}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label htmlFor="password">Password</label>
              </div>
              <div className="md:w-3/4">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="password"
                  type="password"
                  onChange={(e) => {setPassword(e.target.value)}}
                  value={password}
                />
              </div>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Login</button>
          </form>
    )
}