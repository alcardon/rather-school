"use client";

import { useState } from "react";
import cn from "classnames";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { useSupabase } from "../common/supabase-provider";

const UpdatePasswordSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
});

const UpdatePassword = () => {
  const [errorMsg, setErrorMsg] = useState("");

  async function updatePassword(formData: { password: string }) {
    const { supabase } = useSupabase();
    const { error } = await supabase.auth.updateUser({
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <div className="card">
      <h2 className="w-full text-center">Update Password</h2>
      <Formik
        initialValues={ {
          password: "",
        } }
        validationSchema={ UpdatePasswordSchema }
        onSubmit={ updatePassword }
      >
        { ({ errors, touched }) => (
          <Form className="column w-full">
            <label htmlFor="email">New Password</label>
            <Field
              className={ cn(
                "input",
                errors.password && touched.password && "bg-red-50"
              ) }
              id="password"
              name="password"
              type="password"
            />
            { errors.password && touched.password ? (
              <div className="text-red-600">{ errors.password }</div>
            ) : null }
            <button className="button-inverse w-full" type="submit">
              Update Password
            </button>
          </Form>
        ) }
      </Formik>
      { errorMsg && <div className="text-red-600">{ errorMsg }</div> }
    </div>
  );
};

export default UpdatePassword;
