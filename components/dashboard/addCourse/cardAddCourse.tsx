"use client"

import { useState, useEffect } from 'react'
import { useSupabase } from "@/components/common/supabase-provider";
import { Students, Courses, Profiles } from '@/lib/types';
import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from './avatar';
import SelectStudentTable from './selectStudentsTable';
import { notify } from '@/components/common/notify';



export default function CardAddCourse({ serverStudents,
}: {
  serverStudents: Students[];
}) {


  const [loading, setLoading] = useState(true)
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)
  const [students, setStudents] = useState(serverStudents);
  const [selectedStudents, setSelectedStudents] = useState([])

  const { supabase } = useSupabase();


  useEffect(() => {
    setStudents(serverStudents);
  }, [serverStudents]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Courses" },
        (payload) => setStudents([...students, payload.new as Students])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setStudents, students]);

  const SignUpSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required").min(6),
  });




  const formik = useFormik({
    initialValues: {
      course_subject: "Blockchain",
      schedule: "Mon-Wed-Fri 10:00-12:00",
      min_students: 10,
      max_students: 30,
      course_title: "Solidity: Smart Contract Development",
      course_description: "This course is designed for students who have a strong understanding of smart contracts and are interested in learning advanced topics in smart contract development. The course covers various aspects of smart contract development, including writing complex contracts, debugging, and testing. Students will work on a project to design and implement a real-world smart contract application.",
      course_duration: "6 weeks",
      course_language: "English",
      course_level: "Intermediate",
    },

    /*  // Pass the Yup schema to validate the form
     validationSchema: SignUpSchema, */

    // Handle form submission
    onSubmit: async ({
      course_subject,
      schedule,
      min_students,
      max_students,
      course_title,
      course_description,
      course_duration,
      course_language,
      course_level }) => {

      updateProfile({
        course_subject,
        schedule,
        min_students,
        max_students,
        course_title,
        course_description,
        course_duration,
        course_language,
        course_level
      })
      /* router.push("/dashboard"); */
    },
  });

  async function updateProfile({
    course_subject,
    schedule,
    min_students,
    max_students,
    course_title,
    course_description,
    course_duration,
    course_language,
    course_level
  }: {
    course_subject: Courses["course_subject"],
    schedule: Courses["schedule"],
    min_students: Courses["min_students"],
    max_students: Courses["max_students"],
    course_title: Courses["course_title"],
    course_description: Courses["course_description"],
    course_duration: Courses["course_duration"],
    course_language: Courses["course_language"],
    course_level: Courses["course_level"],


    /*  avatar_url: Profiles['avatar_url'] */
  }) {

    setLoading(true)

    const newCourse = {
      course_subject,
      schedule,
      min_students,
      max_students,
      course_title,
      course_description,
      course_duration,
      course_language,
      course_level
    }


    let newCourseId = ""


    { /*  Create course in courses table */ }

    try {
      let { data, error } = await supabase.from('courses').insert(newCourse).select()
      // @ts-ignore
      newCourseId = (data[0]?.course_id)
      notify("success", "Course created")
    } catch (error) {
      notify("error", `Error creating course ${error}`)
      console.log(error)
    }


    { /*  Create student enrollment in student_enrollment_grade table */ }
    if (selectedStudents.length > 0) {
      try {

        selectedStudents.map(async (student_id: String) => {

          let { error } = await supabase.from('student_enrollment_grade').insert({ student_id, course_id: newCourseId })
        })
        notify("success", "Enrollment created")
      } catch (error) {
        notify("error", "Error creating Enrollment")
        console.log(error)

      }
    }

  }




  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <> <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg bg-blueGray-100">
      <div className="px-6 py-6 mb-0 bg-white rounded-t">
        <div className="flex justify-between text-center">
          <h6 className="text-xl font-bold text-blueGray-700">Add Course</h6>

        </div>
      </div>
      <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
        <form onSubmit={ handleSubmit } method="POST">
          <h6 className="mt-3 mb-6 text-sm font-bold uppercase text-blueGray-400">
            Course Information          </h6>
          <div className="flex flex-wrap">
            <div className="w-full px-4 lg:w-2/12">
              {/*  <Avatar

                url={ avatar_url }
                size={ 150 }
                onUpload={ (url) => {
                  setAvatarUrl(url)
                } }
              /> */}
            </div>
            <div className="w-full lg:w-10/12">
              <div className="flex flex-wrap w-full">
                <div className="w-full px-4 lg:w-6/12">
                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Course title
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                      id="course_title"
                      name="course_title"
                      onChange={ handleChange }
                      value={ values.course_title }
                    />
                  </div>
                </div>
                <div className="w-full px-4 lg:w-6/12">
                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                      id="course_subject"
                      name="course_subject"
                      onChange={ handleChange }
                      value={ values.course_subject }
                    />
                  </div>
                </div>
                <div className="w-full px-4 lg:w-4/12">
                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Duration
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                      id="course_duration"
                      name="course_duration"
                      onChange={ handleChange }
                      value={ values.course_duration }
                    />
                  </div>
                </div>


                <div className="w-full px-4 lg:w-4/12">
                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >

                      Language
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"

                      id="course_language"
                      name="course_language"
                      onChange={ handleChange }
                      value={ values.course_language }
                    />
                  </div>
                </div>
                <div className="w-full px-4 lg:w-4/12">
                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Dificulty level
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                      id="course_level"
                      name="course_level"
                      onChange={ handleChange }
                      value={ values.course_level }
                    />
                  </div>
                </div>
              </div>
            </div>


          </div>



          <div className="flex flex-wrap">
            <div className="w-full px-4 lg:w-3/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                  htmlFor="grid-password"
                >
                  Min students per course
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                  id="min_students"
                  name="min_students"
                  onChange={ handleChange }
                  value={ values.min_students }
                />
              </div>
            </div>
            <div className="w-full px-4 lg:w-3/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                  htmlFor="grid-password"
                >
                  Max students per course
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                  id="max_students"
                  name="max_students"
                  onChange={ handleChange }
                  value={ values.max_students }
                />
              </div>
            </div>
            <div className="w-full px-4 lg:w-3/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                  htmlFor="grid-password"
                >
                  Schedule
                </label>
                <input
                  id="schedule"
                  name="schedule"
                  onChange={ handleChange }
                  value={ values.schedule }
                  className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                />
              </div>
            </div>
            <div className="w-full px-4 lg:w-3/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                  htmlFor="grid-password"
                >
                  Duration
                </label>
                <input
                  id="course_duration"
                  name="course_duration"
                  onChange={ handleChange }
                  value={ values.course_duration }
                  className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                />
              </div>
            </div>

          </div>
          <div className="flex flex-wrap">
            <div className="w-full px-4 lg:w-12/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                  htmlFor="grid-password"
                >
                  Description
                </label>
                <textarea
                  /* rows={ 7 } */
                  className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                  id="course_description"
                  name="course_description"
                  onChange={ handleChange }
                  value={ values.course_description }
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full px-4 lg:w-12/12">
              <div className="w-full lg:w-12/12"> <SelectStudentTable color='light' data={ students } selectedStudents={ selectedStudents } setSelectedStudents={ setSelectedStudents } /></div>
            </div>
          </div>

          <div className='flex justify-end w-full pr-3'>
            <button type="submit" className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none">
              Save
            </button></div>

        </form>
      </div>

    </div></>
  )
}