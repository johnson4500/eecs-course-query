import React, { useState } from "react";
import Select from 'react-select';
import { CSSTransition } from 'react-transition-group';
import { CourseInfoContainer } from "./CourseInfoContainer";

export function ModalContent({
  nodeRef,
  styleOptions,
  dropdownOptions,
  filteredData,
  sectionF,
  sectionSelected,
  sectionData,
  sectionID,
  labDropdownOptions,
  modalCourse,
  modalIsOpen
}) {

  const [labOrTutorialID, setLabOrTutorialID] = useState();

  const changeID = (selectedOption) => {
    setLabOrTutorialID(selectedOption.value)
  }

  return <div style={{
    minWidth: '70vw',
    maxWidth: '1080px',
    height: 'auto'
  }} 
  ref={nodeRef} className='info-container'>
  <h2 ref={nodeRef} style={{
    fontSize: "3vh",
    color: "white",
    marginBottom: "4vh"
  }}>{filteredData[modalCourse].course_subject.split(" ")[0]} {filteredData[modalCourse].course_subject.split(" ")[1]} {filteredData[modalCourse].course_name}</h2>
  <div ref={nodeRef} style={{
    boxSizing: 'border-box',
    marginRight: "4vh",
    float: "left",
    borderRadius: "20px",
    padding: "15px",
    paddingTop: "0",
    position: "relative",
    maxHeight: "35vh",
    minHeight: "auto",
    width: "20vw",
    overflowY: "scroll",
    backgroundColor: "rgba(20,20,20)"
  }}>
    <h2 style = {{marginTop: 10, marginBottom: 10}}>Description</h2>
    <p ref={nodeRef} style={{
      marginTop: 0,
      fontSize: "1.75vh",
      color: "white"
    }}>{filteredData[modalCourse].course_description}</p>
  </div>
  <div ref={nodeRef} style={{
    marginTop: 0,
    boxSizing: 'border-box',
    float: 'left',
    width: "30%",
    height: "auto",
    marginRight: '0px',
    padding: 0
  }}>
    <h2 style={{
      marginTop: 0,
      fontSize: "2.5vh"
    }} ref={nodeRef}> 
      Select a section
      <Select className='dropdown-container' classNamePrefix="dropdown-container" ref={nodeRef} styles={styleOptions} options={dropdownOptions} defaultValue='Select' isSearchable={false} onChange={sectionF}></Select>
    </h2>
    <CSSTransition in={sectionSelected !== "Select..."} timeout={300} nodeRef={nodeRef} classNames="expanding-container" unmountOnExit> 
      <CourseInfoContainer nodeRef={nodeRef} sectionData={sectionData} sectionID={sectionID} labDropdownOptions={labDropdownOptions} labOrTutorialID={labOrTutorialID} setLabOrTutorialID={setLabOrTutorialID} changeID={changeID}/>
    </CSSTransition>
  </div>
  <div style={{
    float: 'left',
    backgroundColor: 'gray',
    width: '35%',
    height: '35vh',
    borderRadius: '25px',
    fontSize: '0.85vw',
    paddingLeft: '10px'
  }}>
    {modalIsOpen && labOrTutorialID ? (
      <>
        <h2 ref={nodeRef}>Your prof is: {sectionData[sectionID][0].prof_name.replace(/([a-z])([A-Z])/g, '$1 $2')}</h2>
        {parseInt(sectionData[sectionID][0].time.substring(0, 2)) > 12 ? <h2 ref={nodeRef}>Your lecture is at {parseInt(sectionData[sectionID][0].time.substring(0, 2)) > 20 ? parseInt(sectionData[sectionID][0].time.substring(0, 2)) - 10 : parseInt(sectionData[sectionID][0].time.substring(0, 2)) - 10 + sectionData[sectionID][0].time.substring(2, 5)} PM</h2> : <h2 ref={nodeRef}>Your lecture is at {sectionData[sectionID][0].time} AM</h2>}
        <h2 ref={nodeRef}>Your lecture room is: {sectionData[sectionID][0].classroom}</h2>
        <h2>Your lab/tutorial room is: {sectionData[sectionID][labOrTutorialID].classroom}</h2>
        {parseInt(sectionData[sectionID][labOrTutorialID].time.substring(0, 2)) > 12 ? <h2 ref={nodeRef}>Your lab/tutorial is at {parseInt(sectionData[sectionID][labOrTutorialID].time.substring(0, 2)) > 20 ? parseInt(sectionData[sectionID][labOrTutorialID].time.substring(0, 2)) - 10 : parseInt(sectionData[sectionID][labOrTutorialID].time.substring(0, 2)) - 10 + sectionData[sectionID][0].time.substring(2, 5)} PM</h2> : <h2 ref={nodeRef}>Your lab/tutorial is at {sectionData[sectionID][labOrTutorialID].time} AM</h2>}
      </>
    ) : (
      <></>
    )}
    
  </div>
</div>;
}
  