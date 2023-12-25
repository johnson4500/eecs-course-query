import { ModalContent } from './components/ModalContent';
import { SearchBar } from './components/SearchBar';
import { TableContainer } from './components/TableContainer';
import { Header } from './components/Header';
import { React, useEffect, useState, useRef} from 'react'
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
  };

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
  }, []);

  Modal.setAppElement('#root');
  function afterOpenModal() {
  };

  function closeModal() {
    setIsOpen(false);
    setSectionSelected("Select...")
    setSectionID("")
  };

  // group courses by a specific property
  function groupBy(objects, property) {
    return objects.reduce((acc, obj) => {
      const key = obj[property];
      acc[key] = acc[key] || [];
      acc[key].push(obj);
      return acc;
    }, {});
  };

  const sectionF = (selectedOption) => {
    setSectionSelected(selectedOption.label)
    setSectionID(selectedOption.label)
    // console.log(selectedOption.label)

    let elements = []
    sectionData[selectedOption.label].map((element, index) => {
      elements.push({value: index, label: element.class_type
      })
    }, 0)
    console.log(elements)
    setLabDropdownOptions(elements.slice(1))
  };

  const styleOptions = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'black' : 'black',
      backgroundColor: 'darkgray',
      fontSize: '1.2vw',
      height: '5vh',
    }),
    
    singleValue: (provided, state) => ({
      ...provided,
      color: 'black',
      fontSize: '1.5vw',
    }),

    container: (provided) => ({
      ...provided,
      width: '90%',
    })
  };

  return (
    <>
      <div className = "app-container">
        <Header     />
        <SearchBar   searchInput={searchInput} handleSearch={handleSearch}  />
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
            <ModalContent nodeRef={nodeRef} styleOptions={styleOptions} filteredData={filteredData} modalCourse={modalCourse} dropdownOptions={dropdownOptions} sectionF={sectionF} sectionSelected={sectionSelected} sectionData={sectionData} sectionID={sectionID} labDropdownOptions={labDropdownOptions} modalIsOpen={modalIsOpen} />
          </Modal>
            ):(null)}
            
          <TableContainer   filteredData={filteredData} showCourseModal={showCourseModal}></TableContainer>
          </div>
        ):(
          <div>No results found.</div>
        )}
      </div>
    </>
  )
}

export default App
