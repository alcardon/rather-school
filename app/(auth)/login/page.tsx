"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useSupabase } from "@/components/common/supabase-provider";
import { useRouter } from "next/navigation";
import { notify } from "@/components/common/notify";



export default function Page() {

  const { supabase } = useSupabase();
  const router = useRouter();
  
  const handleGitHubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    router.refresh()
  };

  async function signIn(email: string, password: string) {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (data.session?.access_token) {
      notify("success", "Successful login")
    }

    if (error) {
      notify("error", "Error trying to login")

    }
  }

  const SignUpSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required").min(6),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    // Pass the Yup schema to validate the form
    validationSchema: SignUpSchema,

    // Handle form submission
    onSubmit: async ({ email, password }) => {
      await signIn(email, password);
      /* router.push("/dashboard"); */
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <>
      <div className="container h-full px-4 mx-auto">
        <div className="flex items-center content-center justify-center h-full">
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg bg-blueGray-200">
              <div className="px-6 py-6 mb-0 rounded-t">
                <div className="mb-3 text-center">
                  <h6 className="text-sm font-bold text-blueGray-500">
                    Sign in with
                  </h6>
                </div>
                <div className="text-center btn-wrapper">
                  <button
                    className="inline-flex items-center px-4 py-2 mb-1 mr-2 text-xs font-normal font-bold uppercase transition-all duration-150 ease-linear bg-white rounded shadow outline-none text-blueGray-700 hover:shadow-md focus:outline-none active:bg-blueGray-50"
                    type="button"
                    onClick={ handleGitHubLogin }
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/github.svg" />
                    Github
                  </button>
                  <button
                    className="inline-flex items-center px-4 py-2 mb-1 mr-1 text-xs font-normal font-bold uppercase transition-all duration-150 ease-linear bg-white rounded shadow outline-none text-blueGray-700 hover:shadow-md focus:outline-none active:bg-blueGray-50"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                <div className="mb-3 font-bold text-center text-blueGray-400">
                  <small>Or sign in with credentials</small>
                </div>
                <form onSubmit={ handleSubmit } method="POST">
                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow text-blueGray-600 placeholder-blueGray-300 focus:outline-none focus:ring"
                      placeholder="Email"
                      onChange={ handleChange }
                      value={ values.email }
                      type="email"
                    />
                    { errors.email && touched.email && (
                      <div className="text-sm text-red-600">{ errors.email }</div>
                    ) }
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow text-blueGray-600 placeholder-blueGray-300 focus:outline-none focus:ring"
                      placeholder="Password"
                      value={ values.password }
                      onChange={ handleChange }
                    />
                    { errors.password && touched.password && (
                      <div className="text-red-600">{ errors.password }</div>
                    ) }
                  </div>
                  <div className="mt-6 text-center">
                    <button
                      className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-blueGray-800 hover:shadow-lg focus:outline-none active:bg-blueGray-600"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="relative flex flex-wrap mt-6">
              <div className="w-1/2">
                <a
                  href="#"
                  onClick={ (e) => e.preventDefault() }
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link href="/register" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="card">
      <h2 className="w-full text-center">Sign In</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={signIn}
      >
        {({ errors, touched }) => (
          <Form className="w-full column">
            <label htmlFor="email">Email</label>
            <Field
              className={cn(
                "input",
                errors.email && touched.email && "bg-red-50"
              )}
              id="email"
              name="email"
              placeholder="jane@acme.com"
              type="email"
            />
            {errors.email && touched.email ? (
              <div className="text-red-600">{errors.email}</div>
            ) : null}

            <label htmlFor="email">Password</label>
            <Field
              className={cn(
                "input",
                errors.password && touched.password && "bg-red-50"
              )}
              id="password"
              name="password"
              type="password"
            />
            {errors.password && touched.password ? (
              <div className="text-red-600">{errors.password}</div>
            ) : null}

            <button
              className="w-full link"
              type="button"
              onClick={() => setView(VIEWS.FORGOTTEN_PASSWORD)}
            >
              Forgot your password?
            </button>

            <button className="w-full button-inverse" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
      {errorMsg && <div className="text-red-600">{errorMsg}</div>}
      <button
        className="w-full link"
        type="button"
        onClick={() => setView(VIEWS.SIGN_UP)}
      >
        Don&apos;t have an account? Sign Up.
      </button>

      <button className="w-full link" type="button" onClick={handleGitHubLogin}>
        Github SignIn.
      </button>
    </div> */
}
