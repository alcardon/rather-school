"use client"

import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import { useSupabase } from '@/components/common/supabase-provider';


export default function RelativesSelect({ studentRelatives, setStudentRelatives }) {
    const [students, setStudents] = useState([])
    const { supabase } = useSupabase()

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async () => {
        const { data, error } = await supabase.from("students").select("*")
        const options = data.map(item => ({
            value: item.student_id,
            label: `${item.first_name} ${item.last_name}`
        }));
        if (error) console.error('error', error)
        else setStudents(options)
    }


    return (<Select
        className="basic-single"
        classNamePrefix="select"
        options={ students }
        isMulti
        /*  value={ students.filter(function (option) {
             return option.value === studentRelatives;
         }) } */
        onChange={ option => setStudentRelatives(option) }
    />)


}