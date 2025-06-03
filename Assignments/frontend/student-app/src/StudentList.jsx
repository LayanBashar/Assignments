import React from 'react';
import StudentCard from './StudentCard';

const StudentList = ({ students }) => {
  return (
    <div>
      {students.map(student => (
        <StudentCard 
          key={student.id} 
          name={student.name} 
          grade={student.grade} 
        />
      ))}
    </div>
  );
};

export default StudentList;
