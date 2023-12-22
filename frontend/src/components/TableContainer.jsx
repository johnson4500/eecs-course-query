import React from "react";
export function TableContainer({
  filteredData,
  showCourseModal
}) {
  return <div className='table-container'>
            <table className="data-table">
              <thead>
                <tr className="top-row">
                  <th className="top-row">Subject</th>
                  <th className="top-row">Course Name</th>
                </tr>
              </thead>
              <tbody>
              {filteredData.map((element, index) => <tr onClick={showCourseModal} className="data-row" key={index} id={index}>
                  <td id={element.course_subject.split(" ")[1]} className="left">{element.course_subject}</td>
                  <td id={element.course_subject.split(" ")[1]} className="right">{element.course_name}</td>
                </tr>)}
              </tbody>
            </table>
          </div>;
}
  