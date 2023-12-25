import React from "react";
import Select from "react-select";
import { useState } from "react";

    export function CourseInfoContainer({nodeRef, sectionData, sectionID, labDropdownOptions, changeID}) {

      return (
      <div 
      style = {{
        width: "100%",
        fontSize: "1.2vh"
      }}
      ref={nodeRef} 
      className='expanding-container'>
                
      {sectionID.length > 1 ? <>
        {
          /* <h2 ref = {nodeRef}>The class type is: {sectionData[sectionID][0].class_type}</h2> */
        }
        
        {labDropdownOptions.length > 0 ? <>
        <h2 style={{
          fontSize: '1.25vw',
          marginBottom: 0
        }}>Select a lab/tutorial!
        </h2>
        <Select ref={nodeRef} styles={{
          option: (provided, state) => ({ ...provided,
            fontWeight: 'bold',
            color: state.isSelected ? 'black' : 'black',
            backgroundColor: 'darkgray',
            fontSize: '1.25vw',
            height: 40
          }),
          singleValue: (provided, state) => ({ ...provided,
            color: 'black',
            fontSize: '1.5vw',
            fontWeight: 'bold'
          }),
          container: provided => ({ ...provided,
            width: '90%'
          })
        }} 
        options={labDropdownOptions}
        defaultValue='Select'
        onChange={changeID} 
        isSearchable={false}/>
        </> : <>
          <h2 style={{
            fontSize: '1.75vw',
            marginBottom: 0
          }}>No labs available.</h2>
        </>}
              
                {
      /* {sectionData[sectionID].map((element) => (
       <h2>{element.class_type}</h2>
      ))}  */
    }
    </> : null}
     </div>);
    }
  
  