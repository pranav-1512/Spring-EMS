import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaEdit, FaTrash } from 'react-icons/fa'

const DepartmentForm = () => {
    const [deptName, setDeptName] = useState("")
    const [deptLoc, setDeptLoc] = useState("")
    const [departments, setDepartments] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [formType, setFormType] = useState('')
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getDepartments()
    }, [])
    
    const getDepartments = async () => {
        try {
            setLoading(true)
            const response = await axios.get("http://localhost:8080/api/department")
            setDepartments(response.data)
            setShowForm(false)
        } catch (error) {
            console.log("Error", error)
        } finally {
            setLoading(false)
        }
    }

    const addDepartment = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8080/api/department", { deptName, deptLoc })
            console.log("Response", response)
            window.alert("Department Added")
            setShowForm(false)
            getDepartments()
            clearForm()
        } catch (error) {
            console.log("Error", error)
            window.alert("Failed to add department")
        }
    }

    const updateDepartment = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:8080/api/department/${selectedDepartmentId}`, { deptName, deptLoc })
            console.log("Response", response)
            window.alert("Department Updated")
            setShowForm(false)
            getDepartments()
            clearForm()
        } catch (error) {
            console.log("Error", error)
            window.alert("Failed to update department")
        }
    }

    const handleAddDepartment = () => {
        setShowForm(true)
        setFormType('add')
        clearForm()
    }

    const handleUpdateDepartment = (department) => {
        setShowForm(true)
        setFormType('update')
        setSelectedDepartmentId(department.id)
        setDeptName(department.deptName)
        setDeptLoc(department.deptLoc)
    }

    const handleDeleteDepartment = async (id) => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            try {
                const response = await axios.delete(`http://localhost:8080/api/department/${id}`)
                console.log(response)
                window.alert("Department deleted")
                getDepartments()
            } catch (error) {
                console.log(error)
                window.alert("Failed to delete Department")
            }
        }
    }

    const clearForm = () => {
        setDeptName("")
        setDeptLoc("")        
    }

    const renderForm = () => {
        return (
            <form onSubmit={formType === 'add' ? addDepartment : updateDepartment}>
                <h2>{formType === 'add' ? 'Add Department' : 'Update Department'}</h2>
                <div>
                    <label htmlFor="deptName">Department Name:</label>
                    <input 
                        type="text" 
                        id="deptName" 
                        name="deptName" 
                        value={deptName}
                        onChange={(e) => setDeptName(e.target.value)} 
                    />
                </div>
                <div>
                    <label htmlFor="deptLoc">Department Location:</label>
                    <input 
                        type="text" 
                        id="deptLoc" 
                        name="deptLoc" 
                        value={deptLoc}
                        onChange={(e) => setDeptLoc(e.target.value)} 
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
                <h1>Department</h1>
            </div>
            <Link to='/'><button style={{ marginBottom: "5px" }}>Home</button></Link>
            <div>
                <button style={{ margin: "5px" }} onClick={handleAddDepartment}>Add Department</button>
            </div>
            {showForm ? (
                renderForm()
            ) : loading ? (
                <p>Loading...</p>
            ) : departments.length > 0 ? (
                <div>
                    <h2>Department List</h2>
                    <table style={{borderCollapse: 'collapse', width: '100%'}}>
                        <thead>
                            <tr>
                                <th style={{border: '1px solid black', padding: '8px'}}>ID</th>
                                <th style={{border: '1px solid black', padding: '8px'}}>Department Name</th>
                                <th style={{border: '1px solid black', padding: '8px'}}>Department Location</th>
                                <th style={{border: '1px solid black', padding: '8px'}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map(department => (
                                <tr key={department.id}>
                                    <td style={{border: '1px solid black', padding: '8px'}}>{department.id}</td>
                                    <td style={{border: '1px solid black', padding: '8px'}}>{department.deptName}</td>
                                    <td style={{border: '1px solid black', padding: '8px'}}>{department.deptLoc}</td>
                                    <td style={{border: '1px solid black', padding: '8px'}}>
                                        <FaEdit 
                                            onClick={() => handleUpdateDepartment(department)} 
                                            style={{cursor: 'pointer', marginRight: '10px'}}
                                        />
                                        <FaTrash 
                                            onClick={() => handleDeleteDepartment(department.id)} 
                                            style={{cursor: 'pointer'}}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No departments found.</p>
            )}
        </>
    )
}

export default DepartmentForm