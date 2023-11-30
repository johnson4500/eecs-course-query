import { React, useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [isSearch, setIsSearch] = useState(false)
  const [data, setData] = useState([])
  const [searchInput, setSearchInput] = useState([])
  const [open, setOpen] = useState(false)
  const [searchParam, setSearchParam] = useState("Name")
  const [inputText, setInputText] = useState("")

  const handleOpen = () => {
    setOpen(!open);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(`http://localhost:8080/users/courses/${searchParam}/${searchInput}`)
    const fetchData = async() => {
        await axios.get(`http://localhost:8080/courses/${searchParam}/${searchInput}`).then(result => {
          console.log(result)
          setData(result.data)
          setIsSearch(true)
          setInputText(searchInput)
        }).catch(error => {
          console.log(error)
        })
      }
    fetchData()
  }

  function dropdownClick(e) {
    setSearchParam(e)
    setOpen(!open)
  }

  useEffect(() => {
    const fetchData = async() => {
      await axios.get('http://localhost:8080/courses').then(result => {
        console.log(result)
        setData(result.data)
      }).catch(error => {
        console.log(error)
      })
    }
  fetchData()
  }, [])

  return (
    <>
    <div className = "app-container">
      <div>
        <strong className = "main-info">STEM Course Query</strong>
      </div>
      <br></br>
      <div className="dropdown">
        <strong>Searching by: &nbsp;</strong>
        <button className = "button" onClick={handleOpen}>Course {searchParam}</button>
        <br></br>
        {open ? (
          <div className = "dropdown-content">
            <button onClick = {(e) => dropdownClick(e.target.id)} id = "Name" className = "dropdown-buttons button">Course Name</button>
            <br></br>
            <button onClick = {(e) => dropdownClick(e.target.id)} id = "Code" className = "dropdown-buttons button">Course Code</button>
            <br></br>
            <button onClick = {(e) => dropdownClick(e.target.id)} id = "Professor" className = "dropdown-buttons button">Professor</button>
          </div>
        ) : null}
      </div>

      <form onSubmit={handleSubmit}>
        <br></br>
        <input 
        className = "input-field" 
        type="text" 
        id="fname" 
        name="fname" 
        style = {{fontWeight: "bold"}} 
        placeholder='Search...' 
        onChange = {(e) => setSearchInput(e.target.value)}
        />
        <br></br>
        <br></br>
        <input style = {{width: "120px", height: "50px"}} className='button' type="submit"></input>
        {/* <button onClick={buttonClick}>Get!</button> */}
      </form>
      <br></br>
    </div>
    {isSearch && data.length > 0 ? (
      <div style = {{fontSize: "20px"}}>Displaying results for search "{inputText}"</div>
    ) : null}
    <br></br>
    {data.length > 0 ? (
      <div className='table-container'>
            <table className = "data-table">
              <thead>
                <tr className = "top-row">
                    <th className = "top-row">Subject</th>
                    <th className = "top-row">Course Code</th>
                    <th className = "top-row">Course Name</th>
                </tr>
              </thead>
              {data.map((element, i) => (
                <tbody>
                  <tr className = "data-row" key = {"tableRow" + i}>
                    <td>{element.course_subject}</td>
                    <td>{element.course_code}</td>
                    <td>{element.course_name}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
    ):(
      <div>No results found.</div>
    )}
    </>
  )
}

export default App
