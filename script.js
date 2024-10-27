const students = [];

// Load student list from localStorage
const loadStudents = () => {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
        students.push(...JSON.parse(storedStudents));
    }
    renderStudentList();
};

// Render student list to the DOM
const renderStudentList = () => {
    const studentList = document.getElementById('student-list');
    studentList.innerHTML = '';
    students.forEach(student => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${student.name}</strong> Results: ${JSON.stringify(student.results)}`;
        studentList.appendChild(li);
    });
};

// Add new student
document.getElementById('student-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('student-name').value;
    const resultsString = document.getElementById('student-results').value;

    // Parse results from input
    const results = {};
    resultsString.split(',').forEach(result => {
        const [subject, score] = result.split(':');
        results[subject.trim()] = parseInt(score.trim());
    });

    const newStudent = { name, results };
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));
    renderStudentList();
    document.getElementById('student-form').reset();
});

// Load students on page load
document.addEventListener('DOMContentLoaded', loadStudents);
