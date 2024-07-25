import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaEdit, FaTrash } from 'react-icons/fa'

function EmployeeForm() {
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [formType, setFormType] = useState('')
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null)

    useEffect(() => {
      return () => {
        getEmployees()
      }
    }, [])
    

    const getEmployees = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.get("http://localhost:8080/api/employees")
            console.log(response);
            setEmployees(response.data)
            setShowForm(false)
        } catch (err) {
            setError('Failed to fetch employees')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const addEmployee = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/employees", {
                firstname,
                lastname,
                email
            });
            console.log("post response", response);
            window.alert("Added Employee");
            setShowForm(false);
            getEmployees();
            clearForm();
        } catch (error) {
            console.log("Error", error);
            window.alert("Failed to add employee");
        }
    }

    const updateEmployee = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/api/employees/${selectedEmployeeId}`, {
                firstname,
                lastname,
                email
            });
            console.log("put response", response);
            window.alert("Updated Employee");
            setShowForm(false);
            getEmployees();
            clearForm();
        } catch (error) {
            console.log("Error", error);
            window.alert("Failed to update employee");
        }
    }

    const handleAddEmployee = () => {
        setShowForm(true)
        setFormType('add')
        clearForm()
    }

    const handleUpdateEmployee = (employee) => {
        setShowForm(true)
        setFormType('update')
        setSelectedEmployeeId(employee.id)
        setFirstname(employee.firstname)
        setLastname(employee.lastname)
        setEmail(employee.email)
    }

    const handleDeleteEmployee = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await axios.delete(`http://localhost:8080/api/employees/${id}`);
                window.alert("Employee deleted");
                getEmployees();
            } catch (error) {
                console.log("Error", error);
                window.alert("Failed to delete employee");
            }
        }
    }

    const clearForm = () => {
        setFirstname("");
        setLastname("");
        setEmail("");
        setSelectedEmployeeId(null);
    }

    const renderForm = () => {
        return (
            <form onSubmit={formType === 'add' ? addEmployee : updateEmployee}>
                <h2>{formType === 'add' ? 'Add Employee' : 'Update Employee'}</h2>
                <div>
                    <label htmlFor="firstname">First Name:</label>
                    <input 
                        type="text" 
                        id="firstname" 
                        name="firstname" 
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)} 
                    />
                </div>
                <div>
                    <label htmlFor="lastname">Last Name:</label>
                    <input 
                        type="text" 
                        id="lastname" 
                        name="lastname" 
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)} 
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit" style={{margin:"5px"}}>{formType === 'add' ? 'Add' : 'Update'}</button>
                <button type="button" style={{margin:"5px"}} onClick={() => setShowForm(false)}>Cancel</button>
            </form>
        )
    }

    return (
        <>
            <div>
                <h1>Employee</h1>
            </div>
            <Link to='/'><button style={{marginBottom:"5px"}}>Home</button></Link>
            <div>
                <button style={{margin:"5px"}} onClick={handleAddEmployee}>Add Employee</button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}

            {showForm ? (
                renderForm()
            ) : (
                employees.length > 0 && (
                    <div>
                        <h2>Employee List</h2>
                        <table style={{borderCollapse: 'collapse', width: '100%'}}>
                            <thead>
                                <tr>
                                    <th style={{border: '1px solid black', padding: '8px'}}>ID</th>
                                    <th style={{border: '1px solid black', padding: '8px'}}>First Name</th>
                                    <th style={{border: '1px solid black', padding: '8px'}}>Last Name</th>
                                    <th style={{border: '1px solid black', padding: '8px'}}>Email</th>
                                    <th style={{border: '1px solid black', padding: '8px'}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map(employee => (
                                    <tr key={employee.id}>
                                        <td style={{border: '1px solid black', padding: '8px'}}>{employee.id}</td>
                                        <td style={{border: '1px solid black', padding: '8px'}}>{employee.firstname}</td>
                                        <td style={{border: '1px solid black', padding: '8px'}}>{employee.lastname}</td>
                                        <td style={{border: '1px solid black', padding: '8px'}}>{employee.email}</td>
                                        <td style={{border: '1px solid black', padding: '8px'}}>
                                            <FaEdit 
                                                onClick={() => handleUpdateEmployee(employee)} 
                                                style={{cursor: 'pointer', marginRight: '10px'}}
                                            />
                                            <FaTrash 
                                                onClick={() => handleDeleteEmployee(employee.id)} 
                                                style={{cursor: 'pointer'}}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            )}
        </>
    )
}

export default EmployeeForm