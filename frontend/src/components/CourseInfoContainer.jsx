import React from "react";

    export function CourseInfoContainer({nodeRef, sectionData, sectionID, labDropdownOptions}) {
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
        <h2 ref={nodeRef}>Your prof is: {sectionData[sectionID][0].prof_name.replace(/([a-z])([A-Z])/g, '$1 $2')}</h2>
        {parseInt(sectionData[sectionID][0].time.substring(0, 2)) > 12 ? <h2 ref={nodeRef}>Your lecture is at {parseInt(sectionData[sectionID][0].time.substring(0, 2)) > 20 ? parseInt(sectionData[sectionID][0].time.substring(0, 2)) - 10 : parseInt(sectionData[sectionID][0].time.substring(0, 2)) - 10 + sectionData[sectionID][0].time.substring(2, 5)} PM</h2> : <h2 ref={nodeRef}>Your lecture is at {sectionData[sectionID][0].time} AM</h2>}
        <h2 ref={nodeRef}>Your lecture room is: {sectionData[sectionID][0].classroom}</h2>
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
  
  