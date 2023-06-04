import { useState } from 'react'
import AutoSuggestTags from './components/AutoSuggestTags'

const App = () => {
  const School = {
    branches: [
      {
        id: 1,
        name: 'STI Global City',
        courses: [
          {
            course: 'BSIT',
            year: 'First',
            term: 'First',
            subjects: [
              'Computer programming 1',
              'Introduction to computing',
              'Euthenics 1',
              'The Contemporary World',
            ],
          },
          {
            course: 'BSIT',
            year: 'First',
            term: 'Second',
            subjects: [
              'Computer programming 2',
              'Discrete Structures 1',
              'Art Appreciation',
              'Physical Education 2',
            ],
          },
          {
            course: 'BSCPE',
            year: 'First',
            term: 'First',
            subjects: ['Programming Logic and Design', 'Calculus 1', 'Understanding the Self'],
          },
          {
            course: 'BSCPE',
            year: 'First',
            term: 'Second',
            subjects: [
              'Discrete Mathematics',
              'Database Management System',
              'Data Structures and Algorithms',
              'Physical Education 2',
            ],
          },
        ],
      },
      {
        id: 2,
        name: 'STI ORCA',
        courses: [
          {
            course: 'BSIT',
            year: 'First',
            term: 'First',
            subjects: [
              'Computer programming 1',
              'Introduction to computing',
              'Euthenics 1',
              'The Contemporary World',
            ],
          },
          {
            course: 'BSIT',
            year: 'First',
            term: 'Second',
            subjects: [
              'Computer programming 2',
              'Discrete Structures 1',
              'Art Appreciation',
              'Physical Education 2',
            ],
          },
          {
            course: 'BSTM',
            year: 'First',
            term: 'First',
            subjects: [
              'Macro Perspective of Tourism and Hospitality',
              'Physical Education 1',
              'Purposive Communication',
              'Readings in Philippine History',
            ],
          },
          {
            course: 'BSTM',
            year: 'First',
            term: 'Second',
            subjects: [
              'Micro Perspective of Tourism and Hospitality',
              'Philippine Tourism, Culture and Geography',
              'Global Tourism, Culture and Geography',
              'Physical Education 2',
            ],
          },
        ],
      },
      {
        id: 3,
        name: 'STI Calamba',
        courses: [
          {
            course: 'BSIT',
            year: 'First',
            term: 'First',
            subjects: [
              'Computer programming 1',
              'Introduction to computing',
              'Euthenics 1',
              'The Contemporary World',
            ],
          },
          {
            course: 'BSIT',
            year: 'First',
            term: 'Second',
            subjects: [
              'Computer programming 2',
              'Discrete Structures 1',
              'Art Appreciation',
              'Physical Education 2',
            ],
          },
          {
            course: 'BSHM',
            year: 'First',
            term: 'First',
            subjects: [
              'Understanding the Self',
              'Photoshop',
              'Operation Management',
              'Physical Education 1',
            ],
          },
          {
            course: 'BSHM',
            year: 'First',
            term: 'Second',
            subjects: [
              'Readings in Philippine History',
              'Multi-media system',
              'Physical Education 2',
              'Kitchen Essentials and Basic Food Preparation',
            ],
          },
        ],
      },
    ],
  }

  const [branch, setBranch] = useState('')
  const [sections, setSections] = useState(0)
  const [rooms, setRooms] = useState(0)
  const [courses, setCourses] = useState([])
  const [course, setCourse] = useState('')
  const [year, setYear] = useState('')
  const [term, setTerm] = useState('')
  const [subjects, setSubjects] = useState([])
  const [tags, setTags] = useState([])
  const [schedule, setSchedule] = useState([])
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const handleBranchChange = e => {
    const selectedBranch = e.target.value
    setBranch(e.target.value)

    const selectedCourses =
      School.branches.find(item => item.name === selectedBranch)?.courses || []
    const uniqueCourses = Array.from(new Set(selectedCourses.map(course => course.course)))
    setCourses(uniqueCourses)
  }

  const handleYearChange = e => {
    setYear(e.target.value)
  }

  const handleTermChange = e => {
    const selectedTerm = e.target.value
    setTerm(e.target.value)

    const selectedCourse = School.branches.find(item => item.name === branch)?.courses || []
    const offeredSubjs =
      selectedCourse.find(
        item => item.year === year && item.term === selectedTerm && item.course === course
      )?.subjects || []
    setTags(offeredSubjs)
    setSubjects(offeredSubjs)
  }

  const handleSectionsChange = e => {
    setSections(e.target.value)
  }

  const handleRoomsChange = e => {
    setRooms(e.target.value)
  }

  const handleCourseChange = e => {
    setCourse(e.target.value)
  }

  const generateSchedule = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const startTime = 7 * 60 // Start time in minutes (7:00 AM)
    const endTime = 20 * 60 // End time in minutes (8:00 PM)
    const timeSlotDuration = 90 // Time slot duration in minutes
    const totalSections = 10 // Number of sections
    const totalSubjects = 10 // Number of subjects
    const totalRooms = 5 // Number of rooms

    const newSchedule = []

    for (let section = 1; section <= totalSections; section++) {
      const sectionSchedule = {
        section: `Section ${section}`,
        schedule: [],
      }

      const scheduledSubjects = new Set()
      const scheduledRooms = new Set()

      for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
        const day = days[dayIndex]
        const daySchedule = {
          day,
          subjects: [],
        }

        let currentTime = startTime
        while (currentTime <= endTime) {
          const startHour = Math.floor(currentTime / 60)
          const startMinute = currentTime % 60
          const endHour = Math.floor((currentTime + timeSlotDuration) / 60)
          const endMinute = (currentTime + timeSlotDuration) % 60

          const timeSlot = {
            startHour,
            startMinute,
            endHour,
            endMinute,
          }

          let subject
          let room
          let isSubjectScheduled = false
          let isRoomScheduled = false
          let iteration = 0

          while ((!isSubjectScheduled || !isRoomScheduled) && iteration < 1000) {
            subject = `Subject ${Math.floor(Math.random() * totalSubjects) + 1}`
            room = `Room ${Math.floor(Math.random() * totalRooms) + 1}`

            isSubjectScheduled = !scheduledSubjects.has(subject)
            isRoomScheduled = !scheduledRooms.has(room)

            iteration++
          }

          daySchedule.subjects.push({
            subject,
            room,
            timeSlot,
          })

          scheduledSubjects.add(subject)
          scheduledRooms.add(room)

          currentTime += timeSlotDuration
        }

        sectionSchedule.schedule.push(daySchedule)
      }

      newSchedule.push(sectionSchedule)
    }

    setSchedule(newSchedule)
  }

  return (
    <div className='bg-slate-700 h-screen text-gray-300'>
      <h1 className='container mx-auto p-4'>Automatic Schedule Generator</h1>
      <div className='container mx-auto p-4'>
        <div className='mb-4'>
          <label className='block mb-2' htmlFor='branch'>
            Branch:
          </label>
          <select
            id='branch'
            className='text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={branch}
            onChange={handleBranchChange}
          >
            <option>Select a Branch</option>
            {School.branches.map((branch, index) => (
              <option value={branch.name} key={index}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-4'>
          <label className='block mb-2' htmlFor='branch'>
            Course:
          </label>
          <select
            id='course'
            className='text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={course}
            onChange={handleCourseChange}
          >
            <option value=''>Select Course</option>
            {courses?.map((course, index) => (
              <option value={course} key={index}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <div className='flex justify-around w-full mb-4 gap-4'>
          <div className='w-full'>
            <label htmlFor='year' className='block mb-2'>
              Year:
            </label>
            <select
              id='year'
              value={year}
              className='text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              onChange={handleYearChange}
            >
              <option value=''>Select Year</option>
              <option value='First'>First</option>
              <option value='Second'>Second</option>
              <option value='Third'>Third</option>
              <option value='Fourth'>Fourth</option>
            </select>
          </div>

          <div className='w-full'>
            <label htmlFor='term' className='block mb-2'>
              Term:
            </label>
            <select
              id='term'
              value={term}
              className='text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              onChange={handleTermChange}
            >
              <option value=''>Select Term</option>
              <option value='First'>First</option>
              <option value='Second'>Second</option>
              <option value='Third'>Third</option>
              <option value='Fourth'>Fourth</option>
            </select>
          </div>
        </div>

        <div className='mb-4'>
          <label className='block mb-2' htmlFor='sections'>
            Number of sections:
          </label>
          <input
            type='number'
            id='sections'
            className='text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={sections}
            onChange={handleSectionsChange}
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-2' htmlFor='rooms'>
            Number of rooms available:
          </label>
          <input
            type='number'
            id='rooms'
            className='text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={rooms}
            onChange={handleRoomsChange}
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-2' htmlFor='tags'>
            Subjects:
          </label>
          <AutoSuggestTags subjects={subjects} tags={tags} setTags={setTags} />
        </div>
        <button
          onClick={generateSchedule}
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
        >
          Generate Schedule
        </button>
      </div>

      <table className='border-collapse w-full h-full bg-slate-700'>
        <thead className='border'>
          <tr>
            <th className='border'>Section</th>
            {days.map(day => (
              <th className='border' key={day}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='border-collapse'>
          {schedule.map((sectionSchedule, index) => (
            <tr className='border' key={index}>
              <td className='border'>{sectionSchedule.section}</td>
              {sectionSchedule.schedule.map((daySchedule, subIndex) => (
                <td className='border' key={subIndex}>
                  <table className='border border-collapse'>
                    <tbody>
                      {daySchedule.subjects.map((subjectData, subSubIndex) => (
                        <tr className='border' key={subSubIndex}>
                          <td className='border'>
                            {subjectData.timeSlot.startHour}:
                            {subjectData.timeSlot.startMinute.toString().padStart(2, '0')} -{' '}
                            {subjectData.timeSlot.endHour}:
                            {subjectData.timeSlot.endMinute.toString().padStart(2, '0')}
                          </td>
                          <td className='border'>{subjectData.subject}</td>
                          <td className='border'>{subjectData.room}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
