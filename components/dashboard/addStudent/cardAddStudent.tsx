"use client"

import { useState, useEffect } from 'react'
import { Database } from '@/lib/database.types'
import { useSupabase } from "@/components/common/supabase-provider";
import { Students, Courses, Profiles } from '@/lib/types';
import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from './avatar';
import SelectCoursesTable from './selectCourseTable';
import RelativesSelect from './relativesSelect';
import { notify } from '@/components/common/notify';




export default function CardAddStudent({ serverCourses,
}: {
  serverCourses: Courses[];
}) {


  const [loading, setLoading] = useState(true)
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)
  const [courses, setCourses] = useState(serverCourses);
  const [selectedCourses, setSelectedCourses] = useState([])
  const [studentRelatives, setstudentRelatives] = useState([])
  const { supabase } = useSupabase();


  useEffect(() => {
    setCourses(serverCourses);
  }, [serverCourses]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "courses" },
        (payload) => setCourses([...courses, payload.new as Courses])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setCourses, courses]);

  const SignUpSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required").min(6),
  });




  const formik = useFormik({
    initialValues: {
      first_name: "Lucky",
      last_name: "Jesse",
      occupation: "Software Developer",
      gender: "male",
      preferred_lang: "English",
      home_address: "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09",
      email_address: "lucky@ratherSchool.com",
      current_residence_country: "USA",
      phone_number: 15564168516,
      prefered_coms_chanel: "Email",
      learning_goals: "Learn about blockchain interoperability",
      course_id: 1

    },

    /*  // Pass the Yup schema to validate the form
     validationSchema: SignUpSchema, */

    // Handle form submission
    onSubmit: async ({ first_name, last_name, occupation,
      gender, preferred_lang, email_address, home_address,
      current_residence_country, phone_number, prefered_coms_chanel,
      learning_goals }) => {

      createStudent({
        first_name, last_name, occupation, gender,
        preferred_lang, email_address, home_address,
        current_residence_country, phone_number,
        prefered_coms_chanel, learning_goals
      })
      /* router.push("/dashboard"); */
    },
  });

  async function createStudent({
    first_name, last_name, occupation, gender, preferred_lang,
    email_address, home_address, current_residence_country,
    phone_number, prefered_coms_chanel, learning_goals,
  }: {
    first_name: Students["first_name"],
    last_name: Students["last_name"],
    occupation: Students["occupation"],
    gender: Students["occupation"],
    preferred_lang: Students["preferred_lang"],
    email_address: Students["email_address"],
    home_address: Students["home_address"],
    current_residence_country: Students["current_residence_country"],
    phone_number: Students["phone_number"],
    prefered_coms_chanel: Students["prefered_coms_chanel"],
    learning_goals: Students["learning_goals"]

    /*  avatar_url: Profiles['avatar_url'] */
  }) {

    setLoading(true)

    const newStudent = {
      first_name, last_name, occupation, gender, preferred_lang,
      email_address, home_address, current_residence_country,
      phone_number, prefered_coms_chanel, learning_goals
    }


    let newStudentId = ""


    { /*  Create student in students table */ }

    try {
      let { data, error } = await supabase.from('students').insert(newStudent).select()
      // @ts-ignore
      newStudentId = (data[0]?.student_id)
      notify("success", "Student created")
    } catch (error) {
      notify("error", "Error creating Student")
    }


    { /*  Create student enrollment in student_enrollment_grade table */ }
    if (selectedCourses.length > 0) {
      try {

        selectedCourses.map(async (course_id: String) => {

          let { error } = await supabase.from('student_enrollment_grade').insert({ student_id: newStudentId, course_id })
        })
        notify("success", "Enrollment created")
      } catch (error) {
        notify("error", "Error creating Enrollment")

      }
    }

    { /*  Create student relation in sibling_relationships table */ }

    if (studentRelatives) {
      try {
        const siblingsIds = studentRelatives.map(student => student.value);
        //@ ts-ignore
        siblingsIds.map(async (sibling_id) => {
          //insert a row per each student
          await supabase.from('sibling_relationships').insert({ student_id: newStudentId, sibling_id })
          await supabase.from('sibling_relationships').insert({ student_id: sibling_id, sibling_id: newStudentId })
        })
        notify("success", "Sibling relation created")
      } catch (error) {
        notify("error", "Error creating Student")

      }
    }

  }




  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <> <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg bg-blueGray-100">
      <div className="px-6 py-6 mb-0 bg-white rounded-t">
        <div className="flex justify-between text-center">
          <h6 className="text-xl font-bold text-blueGray-700">Add Student</h6>

        </div>
      </div>
      <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
        <form onSubmit={ handleSubmit } method="POST">
          <h6 className="mt-3 mb-6 text-sm font-bold uppercase text-blueGray-400">
            Student Information
          </h6>
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
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                      id="first_name"
                      name="first_name"
                      onChange={ handleChange }
                      value={ values.first_name }
                    />
                  </div>
                </div>
                <div className="w-full px-4 lg:w-6/12">
                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                      id="last_name"
                      name="last_name"
                      onChange={ handleChange }
                      value={ values.last_name }
                    />
                  </div>
                </div>
                <div className="w-full px-4 lg:w-4/12">
                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Occupation
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"

                      id="occupation"
                      name="occupation"
                      onChange={ handleChange }
                      value={ values.occupation }
                    />
                  </div>
                </div>


                <div className="w-full px-4 lg:w-4/12">
                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Gender
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"

                      id="gender"
                      name="gender"
                      onChange={ handleChange }
                      value={ values.gender }
                    />
                  </div>
                </div>
                <div className="w-full px-4 lg:w-4/12">
                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Native Language
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                      id="preferred_lang"
                      name="preferred_lang"
                      onChange={ handleChange }
                      value={ values.preferred_lang }
                    />
                  </div>
                </div>
              </div>
            </div>


          </div>


          <hr className="mt-6 border-b-1 border-blueGray-300" />

          <h6 className="mt-3 mb-6 text-sm font-bold uppercase text-blueGray-400">
            Contact Information
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full px-4 lg:w-6/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                  htmlFor="grid-password"
                >
                  Address
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                  id="home_address"
                  name="home_address"
                  onChange={ handleChange }
                  value={ values.home_address }
                />
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                  htmlFor="grid-password"
                >
                  Email address
                </label>
                <input
                  id="email_address"
                  onChange={ handleChange }
                  value={ values.email_address }
                  type="email_address"
                  name="email_address"
                  className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                />
              </div>
            </div>

            <div className="w-full px-4 lg:w-4/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                  htmlFor="grid-password"
                >
                  Country
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                  id="current_residence_country"
                  name="current_residence_country"
                  onChange={ handleChange }
                  value={ values.current_residence_country }
                />
              </div>
            </div>
            <div className="w-full px-4 lg:w-4/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                  htmlFor="grid-password"
                >
                  Contact number
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                  id="phone_number"
                  name="phone_number"
                  onChange={ handleChange }
                  value={ values.phone_number }
                />
              </div>
            </div>
            <div className="w-full px-4 lg:w-4/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                  htmlFor="grid-password"
                >
                  Prefered contact method
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                  id="prefered_coms_chanel"
                  name="prefered_coms_chanel"
                  onChange={ handleChange }
                  value={ values.prefered_coms_chanel }
                />
              </div>
            </div>
          </div>

          <hr className="mt-6 border-b-1 border-blueGray-300" />

          <h6 className="mt-3 mb-6 text-sm font-bold uppercase text-blueGray-400">
            Relatives Information
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full px-4 lg:w-6/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                  htmlFor="grid-password"
                >
                  relatives
                </label>
                <RelativesSelect studentRelatives={ studentRelatives } setStudentRelatives={ setstudentRelatives } />
              </div>

            </div>
          </div>

          <hr className="mt-6 border-b-1 border-blueGray-300" />

          <h6 className="mt-3 mb-6 text-sm font-bold uppercase text-blueGray-400">
            Course Selection
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full px-4 lg:w-12/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                  htmlFor="grid-password"
                >
                  Learning goals
                </label>

                <textarea
                  className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                  id="learning_goals"
                  name="learning_goals"
                  onChange={ handleChange }
                  value={ values.learning_goals }

                ></textarea>
              </div>
              <div className="w-full lg:w-12/12"> <SelectCoursesTable color='light' data={ courses } selectedCourses={ selectedCourses } setSelectedCourses={ setSelectedCourses } /></div>
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