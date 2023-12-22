import React from "react";
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
  modalCourse
}) {
  return <div style={{
    minWidth: '70vw',
    maxWidth: '1080px',
    height: 'auto'
  }} ref={nodeRef} className='info-container'>
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
              <h2>Description</h2>
              <h2 ref={nodeRef} style={{
        marginTop: 0,
        fontSize: "1.75vh",
        color: "white"
      }}>{filteredData[modalCourse].course_description}</h2>
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
      }} ref={nodeRef}> Select a section
                <Select className='dropdown-container' classNamePrefix="dropdown-container" ref={nodeRef} styles={styleOptions} options={dropdownOptions} defaultValue='Select' isSearchable={false} onChange={sectionF}></Select>
                  </h2>
                <CSSTransition in={sectionSelected !== "Select..."} timeout={300} nodeRef={nodeRef} classNames="expanding-container" unmountOnExit> 
                <CourseInfoContainer nodeRef={nodeRef} sectionData={sectionData} sectionID={sectionID} labDropdownOptions={labDropdownOptions} />
                </CSSTransition>
              </div>
              <div style={{
      float: 'left',
      backgroundColor: 'gray',
      width: '38%',
      height: '35vh',
      borderRadius: '25px'
    }}></div>
          </div>;
}
  