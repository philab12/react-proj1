import './App.css';
import Employee from './components/Employee';

function App() {

  const showEmployees = true;

  return (
    <div className="App">
      {showEmployees ?  (
        <>
        <Employee name="Caleb" role="Intern" />
        <Employee name="Aby" />
        <Employee name="John" />

        </>
        ):( <p>You cannot see the employees</p>)
      } 
      </div>
  );
}

export default App;
