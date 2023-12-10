import { React, useEffect, useState, useRef} from 'react'
import { CSSTransition } from 'react-transition-group';
import Select from 'react-select'
import './App.css'
import axios from 'axios'
import Modal from 'react-modal';

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([])
  const [scheduleData, setScheduleData] = useState([])
  const [searchInput, setSearchInput] = useState()
  const [filteredData, setFilteredData] = useState([])
  const [modalCourse, setModalCourse] = useState(0)
  const [sectionData, setSectionData] = useState({})
  const [sectionSelected, setSectionSelected] = useState("Select...")
  const [sectionID, setSectionID] = useState("")
  const [dropdownOptions, setDropDownOptions] = useState([]) 
  const [labDropdownOptions, setLabDropdownOptions] = useState([])
  const nodeRef = useRef(null);


  // Searching for courses is done on the client side for efficiency.
  const handleSearch = (e) => {
    const inputValue = e.target.value
    setSearchInput(inputValue)
    setFilteredData(prevData => data.filter(element =>
      element.course_name.toLowerCase().includes(inputValue.toLowerCase()) || element.course_subject.toLowerCase().includes(inputValue.toLowerCase())
    ))
  }

  // Make a specific get request for the clicked course
  const showCourseModal = async (e) => {
    setModalCourse(e.target.closest('tr').id)
    setIsOpen(true)
      await axios.get(`http://localhost:8080/courseSchedules/${e.target.id}`).then(result => {
        console.log(result.data)
        setScheduleData(result.data)
        let sectiondata = groupBy(result.data, 'section')
        setSectionData(sectiondata)
        
        let sections = []
        Object.keys(sectiondata).map((section) => (
            sections.push({value: section, label: section})
        ))
      setDropDownOptions(sections)
      // setLabDropdownOptions(Array.from(sections[0]))
      }).catch(error => {
        console.log(error)
      })
    }

  // Initial get request upon page load
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
  }

  function closeModal() {
    setIsOpen(false);
    setSectionSelected("Select...")
    setSectionID("")
  }

  // group courses by a specific property
  function groupBy(objects, property) {
    return objects.reduce((acc, obj) => {
      const key = obj[property];
      acc[key] = acc[key] || [];
      acc[key].push(obj);
      return acc;
    }, {});
  }

  const sectionF = (selectedOption) => {
    setSectionSelected(selectedOption.label)
    setSectionID(selectedOption.label)
    // console.log(selectedOption.label)

    let elements = []
    sectionData[selectedOption.label].map((element) => {
      elements.push({value: element.class_type, label: element.class_type
      })
    })
    console.log(elements)
    setLabDropdownOptions(elements.slice(1))

  }

  const styleOptions = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'black' : 'black',
      backgroundColor: 'darkgray',
      fontSize: '20px',
      height: 40,
    }),
    
    singleValue: (provided, state) => ({
      ...provided,
      color: 'black',
      fontSize: '20px',
    }),

    container: (provided) => ({
      ...provided,
      width: '50%'
    })
  }

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
          {Object.keys(sectionData).length > 0 && scheduleData.length > 0 ? (
          <Modal
          className= "course-modal"
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Example Modal"

          style={{

            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.8)", 
              overflowY: "scroll",
              textOverflow: "scroll"
            },
            
            content: {
            background: "red"
          }}}
          >
          <div style = {{height: 'auto'}} ref ={nodeRef} className= 'info-container'>
            <h2 ref ={nodeRef}  style = {{fontSize: "3vh", color: "white", marginBottom: "4vh"}}>{filteredData[modalCourse].course_subject.split(" ")[0]} {filteredData[modalCourse].course_subject.split(" ")[1]} {filteredData[modalCourse].course_name}</h2>
            <div ref ={nodeRef} style = {{marginRight: "4vh", float: "left", borderRadius: "20px", padding: "15px", paddingTop: "0", position: "relative", maxHeight: "35vh", minHeight: "auto", width: "20vw", overflowY: "scroll", backgroundColor: "rgba(20,20,20)"}}>
             <h2>Description</h2>
             <h2 ref ={nodeRef} style = {{fontSize: "1.75vh", color: "white"}}>{filteredData[modalCourse].course_description}</h2>
            </div>
            <div ref ={nodeRef} style = {{ width: "500px", height: "auto", marginLeft:"25vw"}}>
                <h2 ref ={nodeRef}> Select a section
                  <Select
                    className='dropdown-container'
                    classNamePrefix="dropdown-container"
                    ref ={nodeRef}
                    styles = {styleOptions}
              
                    options = {dropdownOptions}

                    defaultValue='Select'

                    isSearchable={false}

                    onChange = {sectionF}
                  ></Select>
                </h2>
                
              <CSSTransition
                in={sectionSelected !== "Select..."}
                timeout={300}
                nodeRef={nodeRef}
                classNames="expanding-container"
                unmountOnExit
              > 
              <div style = {{width: "60%", fontSize: "10px"}} ref ={nodeRef} className='expanding-container'>
                {sectionID.length > 1 ? (
                <>
                {/* <h2 ref = {nodeRef}>The class type is: {sectionData[sectionID][0].class_type}</h2> */}
                <h2 ref = {nodeRef}>Your prof is: {sectionData[sectionID][0].prof_name.replace(/([a-z])([A-Z])/g, '$1 $2')}</h2>
                {parseInt(sectionData[sectionID][0].time.substring(0,2)) > 12 ? (
                  <h2 ref = {nodeRef}>Your lecture is at {parseInt(sectionData[sectionID][0].time.substring(0,2)) > 20 ? parseInt(sectionData[sectionID][0].time.substring(0,2)) - 10 : parseInt(sectionData[sectionID][0].time.substring(0,2)) - 10 + sectionData[sectionID][0].time.substring(2,5)} PM</h2>
                ):(
                  <h2 ref = {nodeRef}>Your lecture is at {sectionData[sectionID][0].time} AM</h2>
                )}

               <h2 ref = {nodeRef}>Your lecture room is: {sectionData[sectionID][0].classroom}</h2>
              
               <h2 style = {{fontSize: '2vw', marginBottom: 0}}>Select a lab!</h2>
               {labDropdownOptions.length > 0 ? (
                <Select
                ref ={nodeRef}
                styles = {{
                  option: (provided, state) => ({
                    ...provided,
                    color: state.isSelected ? 'black' : 'black',
                    backgroundColor: 'darkgray',
                    fontSize: '20px',
                    height: 40,
                  }),
                  
                  singleValue: (provided, state) => ({
                    ...provided,
                    color: 'black',
                    fontSize: '20px',
                  }),
              
                  container: (provided) => ({
                    ...provided,
                    width: '80%'
                  })
                }}
          
                options = {labDropdownOptions}

                defaultValue='Select'

                isSearchable={false}
              ></Select>
               ) : (
                null
               )}
              
                {/* {sectionData[sectionID].map((element) => (
                  <h2>{element.class_type}</h2>
                ))}  */}
                </>
                ) : (
                  null
                )}
              </div>
              </CSSTransition>
            </div>
         </div>
        </Modal>
          ):(null)}
          
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
                  <td id = {element.course_subject.split(" ")[1]} className = "left">{element.course_subject}</td>
                  <td id = {element.course_subject.split(" ")[1]} className = "right">{element.course_name}</td>
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
