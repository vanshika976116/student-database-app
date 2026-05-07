function App(){

    const [activeMenu,setActiveMenu] =
    React.useState('Dashboard')

    const [students,setStudents] =
    React.useState([])

    const [search,setSearch] =
    React.useState('')

    const [selectedStudent,setSelectedStudent] =
    React.useState(null)

    const [selectedClass,setSelectedClass] =
    React.useState('All')

    const [form,setForm] =
    React.useState({

        name:'',
        className:'',
        section:'',

        subjects:[
            {
                subject:'',
                marks:''
            }
        ]

    })

    // Add Subject Field

    function addSubjectField(){

        setForm({

            ...form,

            subjects:[

                ...form.subjects,

                {
                    subject:'',
                    marks:''
                }

            ]

        })

    }

    // Handle Subject Change

    function handleSubjectChange(
        index,
        field,
        value
    ){

        const updatedSubjects =
        [...form.subjects]

        updatedSubjects[index][field] =
        value

        setForm({

            ...form,

            subjects:updatedSubjects

        })

    }

    // Calculate CGPA

    function calculateCGPA(subjects){

        let total = 0

        subjects.forEach(sub => {

            total += Number(sub.marks)

        })

        const percentage =
        total / subjects.length

        return (
            percentage / 9.5
        ).toFixed(2)

    }

    // Add Student

    function addStudent(){

        if(
            form.name === '' ||
            form.className === '' ||
            form.section === ''
        ){

            alert('Please fill all fields')

            return

        }

        const total =
        form.subjects.reduce(

            (sum,sub)=>

            sum + Number(sub.marks),

            0

        )

        const percentage =
        (
            total / form.subjects.length
        ).toFixed(2)

        const cgpa =
        calculateCGPA(form.subjects)

        const newStudent = {

            id:Date.now(),

            name:form.name,

            className:form.className,

            section:form.section,

            subjects:form.subjects,

            total,

            percentage,

            cgpa

        }

        setStudents([
            ...students,
            newStudent
        ])

        alert('Student Added Successfully')

        setForm({

            name:'',
            className:'',
            section:'',

            subjects:[
                {
                    subject:'',
                    marks:''
                }
            ]

        })

    }

    // Delete Student

    function deleteStudent(id){

        const updatedStudents =
        students.filter(
            student => student.id !== id
        )

        setStudents(updatedStudents)

    }

    // Search + Class Filter

    const filteredStudents =
    students.filter(student => {

        const searchMatch =
        student.name.toLowerCase().includes(
            search.toLowerCase()
        )

        const classMatch =

            selectedClass === 'All'

            ||

            student.className === selectedClass

        return searchMatch && classMatch

    })

    return(

        <div className="container">

            <Sidebar
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
            />

            <div className="main">

                {/* DASHBOARD */}

                {
                    activeMenu === 'Dashboard' && (

                        <>

                            <div className="header">

                                <div>

                                    <h1>
                                        Dashboard
                                    </h1>

                                    <p>
                                        Student Result Management
                                    </p>

                                </div>

                            </div>

                            {/* CARDS */}

                            <div className="cards">

                                <div className="card">

                                    <p>
                                        Total Students
                                    </p>

                                    <h2>
                                        {students.length}
                                    </h2>

                                </div>

                                <div className="card">

                                    <p>
                                        Results
                                    </p>

                                    <h2>
                                        {students.length}
                                    </h2>

                                </div>

                                <div className="card">

                                    <p>
                                        Average CGPA
                                    </p>

                                    <h2>

                                        {
                                            students.length > 0

                                            ?

                                            (

                                                students.reduce(

                                                    (sum,s)=>

                                                    sum + Number(s.cgpa),

                                                    0

                                                ) / students.length

                                            ).toFixed(2)

                                            :

                                            0
                                        }

                                    </h2>

                                </div>

                                <div className="card">

                                    <p>
                                        Classes
                                    </p>

                                    <h2>
                                        1-12
                                    </h2>

                                </div>

                            </div>

                            {/* RECENT RESULTS */}

                            <div className="table-box">

                                <h2>
                                    Recent Results
                                </h2>

                                <br/>

                                <table>

                                    <thead>

                                        <tr>

                                            <th>
                                                Name
                                            </th>

                                            <th>
                                                Class
                                            </th>

                                            <th>
                                                Section
                                            </th>

                                            <th>
                                                CGPA
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {
                                            students.slice(-5).map(student=>(

                                                <tr key={student.id}>

                                                    <td>
                                                        {student.name}
                                                    </td>

                                                    <td>
                                                        {student.className}
                                                    </td>

                                                    <td>
                                                        {student.section}
                                                    </td>

                                                    <td className="cgpa">
                                                        {student.cgpa}
                                                    </td>

                                                </tr>

                                            ))
                                        }

                                    </tbody>

                                </table>

                            </div>

                        </>

                    )
                }

                {/* STUDENTS */}

                {
                    activeMenu === 'Students' && (

                        <div className="table-box">

                            <h2>
                                Add Student Result
                            </h2>

                            <br/>

                            <input
                                type="text"
                                placeholder="Student Name"

                                value={form.name}

                                onChange={(e)=>

                                    setForm({

                                        ...form,

                                        name:e.target.value

                                    })

                                }
                            />

                            <input
                                type="text"
                                placeholder="Class (1-12)"

                                value={form.className}

                                onChange={(e)=>

                                    setForm({

                                        ...form,

                                        className:e.target.value

                                    })

                                }
                            />

                            <input
                                type="text"
                                placeholder="Section (A/B/C)"

                                value={form.section}

                                onChange={(e)=>

                                    setForm({

                                        ...form,

                                        section:e.target.value

                                    })

                                }
                            />

                            <h3>
                                Subjects & Marks
                            </h3>

                            <br/>

                            {
                                form.subjects.map(

                                    (sub,index)=>(

                                    <div
                                        className="subject-grid"
                                        key={index}
                                    >

                                        <input
                                            type="text"
                                            placeholder="Subject"

                                            value={sub.subject}

                                            onChange={(e)=>

                                                handleSubjectChange(

                                                    index,

                                                    'subject',

                                                    e.target.value

                                                )

                                            }
                                        />

                                        <input
                                            type="number"
                                            placeholder="Marks"

                                            value={sub.marks}

                                            onChange={(e)=>

                                                handleSubjectChange(

                                                    index,

                                                    'marks',

                                                    e.target.value

                                                )

                                            }
                                        />

                                    </div>

                                ))
                            }

                            <button
                                className="add-btn"

                                onClick={addSubjectField}
                            >
                                Add Subject
                            </button>

                            <br/><br/>

                            <button
                                className="add-btn"

                                onClick={addStudent}
                            >
                                Save Student
                            </button>

                        </div>

                    )
                }

                {/* RESULTS */}

                {
                    activeMenu === 'Results' && (

                        <div className="table-box">

                            <div
                                style={{
                                    display:'flex',
                                    gap:'20px',
                                    marginBottom:'20px'
                                }}
                            >

                                <input
                                    type="text"
                                    placeholder="Search Student"

                                    value={search}

                                    onChange={(e)=>
                                        setSearch(
                                            e.target.value
                                        )
                                    }
                                />

                                {/* CLASS DROPDOWN */}

                                <select

                                    value={selectedClass}

                                    onChange={(e)=>

                                        setSelectedClass(
                                            e.target.value
                                        )

                                    }
                                >

                                    <option value="All">
                                        All Classes
                                    </option>

                                    {
                                        Array.from(
                                            {length:12},
                                            (_,index)=>(

                                                <option

                                                    key={index + 1}

                                                    value={
                                                        String(index + 1)
                                                    }
                                                >

                                                    Class {index + 1}

                                                </option>

                                            )
                                        )
                                    }

                                </select>

                            </div>

                            {/* RESULT TABLE */}

                            <table>

                                <thead>

                                    <tr>

                                        <th>Name</th>
                                        <th>Class</th>
                                        <th>Section</th>
                                        <th>CGPA</th>
                                        <th>Action</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        filteredStudents.map(student=>(

                                            <tr key={student.id}>

                                                <td>
                                                    {student.name}
                                                </td>

                                                <td>
                                                    {student.className}
                                                </td>

                                                <td>
                                                    {student.section}
                                                </td>

                                                <td className="cgpa">
                                                    {student.cgpa}
                                                </td>

                                                <td>

                                                    <button
                                                        className="add-btn"

                                                        onClick={()=>
                                                            setSelectedStudent(student)
                                                        }
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        className="delete-btn"

                                                        onClick={()=>
                                                            deleteStudent(student.id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        ))
                                    }

                                </tbody>

                            </table>

                            {/* RESULT DETAILS */}

                            {
                                selectedStudent && (

                                    <div className="table-box">

                                        <h2>
                                            Result Details
                                        </h2>

                                        <br/>

                                        <p>

                                            <strong>
                                                Name :
                                            </strong>

                                            {' '}

                                            {selectedStudent.name}

                                        </p>

                                        <br/>

                                        <p>

                                            <strong>
                                                Class :
                                            </strong>

                                            {' '}

                                            {selectedStudent.className}

                                        </p>

                                        <br/>

                                        <p>

                                            <strong>
                                                Section :
                                            </strong>

                                            {' '}

                                            {selectedStudent.section}

                                        </p>

                                        <br/>

                                        <table>

                                            <thead>

                                                <tr>

                                                    <th>
                                                        Subject
                                                    </th>

                                                    <th>
                                                        Marks
                                                    </th>

                                                </tr>

                                            </thead>

                                            <tbody>

                                                {
                                                    selectedStudent.subjects.map(

                                                        (sub,index)=>(

                                                        <tr key={index}>

                                                            <td>
                                                                {sub.subject}
                                                            </td>

                                                            <td>
                                                                {sub.marks}
                                                            </td>

                                                        </tr>

                                                    ))
                                                }

                                            </tbody>

                                        </table>

                                        <br/>

                                        <h3>

                                            Total :

                                            {' '}

                                            {
                                                selectedStudent.total
                                            }

                                        </h3>

                                        <br/>

                                        <h3>

                                            Percentage :

                                            {' '}

                                            {
                                                selectedStudent.percentage
                                            }%

                                        </h3>

                                        <br/>

                                        <h3>

                                            CGPA :

                                            {' '}

                                            {
                                                selectedStudent.cgpa
                                            }

                                        </h3>

                                    </div>

                                )
                            }

                        </div>

                    )
                }

                {/* ANALYTICS */}

                {
                    activeMenu === 'Analytics' && (

                        <div className="table-box">

                            <h1>
                                Analytics Dashboard
                            </h1>

                            <br/>

                            <div className="cards">

                                <div className="card">

                                    <p>
                                        Total Students
                                    </p>

                                    <h2>
                                        {students.length}
                                    </h2>

                                </div>

                                <div className="card">

                                    <p>
                                        Average CGPA
                                    </p>

                                    <h2>

                                        {
                                            students.length > 0

                                            ?

                                            (

                                                students.reduce(

                                                    (sum,s)=>

                                                    sum + Number(s.cgpa),

                                                    0

                                                ) / students.length

                                            ).toFixed(2)

                                            :

                                            0

                                        }

                                    </h2>

                                </div>

                            </div>

                            <br/>

                            <h2>
                                Class Wise Student Count
                            </h2>

                            <br/>

                            <table>

                                <thead>

                                    <tr>

                                        <th>
                                            Class
                                        </th>

                                        <th>
                                            Total Students
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        Array.from(

                                            {length:12},

                                            (_,index)=>{

                                                const classNumber =
                                                String(index + 1)

                                                const totalStudents =

                                                students.filter(

                                                    student =>

                                                    student.className === classNumber

                                                ).length

                                                return(

                                                    <tr key={classNumber}>

                                                        <td>
                                                            Class {classNumber}
                                                        </td>

                                                        <td>
                                                            {totalStudents}
                                                        </td>

                                                    </tr>

                                                )

                                            }

                                        )
                                    }

                                </tbody>

                            </table>

                        </div>

                    )
                }

            </div>

        </div>

    )

}

const root =
ReactDOM.createRoot(
    document.getElementById('root')
)

root.render(<App />)