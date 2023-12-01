import { React, useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Modal from 'react-modal';

function App() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([])
  const [searchInput, setSearchInput] = useState()
  const [filteredData, setFilteredData] = useState([])
  const [modalCourse, setModalCourse] = useState(0)

  const handleSearch = (e) => {
    const inputValue = e.target.value
    setSearchInput(inputValue)
    setFilteredData(prevData => data.filter(element =>
      element.course_name.toLowerCase().includes(inputValue.toLowerCase()) || element.course_subject.toLowerCase().includes(inputValue.toLowerCase())
    ))
  }

  const showCourseModal = (e) => {
    setModalCourse(e.target.closest('tr').id)
    setIsOpen(true)
    console.log(e.target.closest('tr').id)
  }

  useEffect(() => {
    const fetchData = async() => {
      await axios.get('http://localhost:8080/courses').then(result => {
        console.log(result)
        setData(result.data)
        setFilteredData(result.data)
      }).catch(error => {
        console.log(error)
      })
    }
  fetchData()
  }, [])

  Modal.setAppElement('#root');
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = 'black';
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };


  return (
    <>
      <div className = "app-container">
        <strong className = "main-info">STEM Course Query</strong>
        <br></br>
        <br></br>
        <div className="dropdown">
        <strong style = {{fontSize: "2.5vh"}}>Info about your EECS Courses!&nbsp;</strong>
        </div>
        <br></br>
        <br></br>
        <input 
          className = "input-field" 
          type="text" 
          id="fname" 
          name="fname" 
          style = {{fontWeight: "bold", fontSize: "1.5vh"}} 
          placeholder='Search...' 
          value = {searchInput}
          onChange = {handleSearch}
          // {(e) => setSearchInput(e.target.value)}
          />
      <br></br>
      <br></br>
      {filteredData.length > 0 ? (
        <div>
          <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{filteredData[modalCourse].course_description}</h2>
          <button onClick={closeModal}>close</button>
          </Modal>
          <div className='table-container'>
            <table className = "data-table">
              <thead>
                <tr className = "top-row">
                  <th className = "top-row">Subject</th>
                  <th className = "top-row">Course Name</th>
                </tr>
              </thead>
              <tbody>
              {filteredData.map((element, index) => (
                <tr onClick={showCourseModal} className = "data-row" key = {index} id = {index}>
                  <td className = "left">{element.course_subject}</td>
                  <td className = "right">{element.course_name}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      ):(
        <div>No results found.</div>
      )}
      </div>
    </>
  )
}

export default App
