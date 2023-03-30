"use client";

import { useState, useEffect } from "react";
import cn from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

import { useSupabase } from "@/components/auth/supabase-provider";
import { useRouter } from "next/navigation";

export default function Page() {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { supabase } = useSupabase();
  const router = useRouter();

  const handleGitHubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  async function signIn(email: string, password: string) {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg(`Success Login ${data.session?.access_token}`);
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
      router.push("/dashboard");
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <>
      <div className="container mx-auto h-full px-4">
        <div className="flex h-full content-center items-center justify-center">
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 bg-blueGray-200 shadow-lg">
              <div className="mb-0 rounded-t px-6 py-6">
                <div className="mb-3 text-center">
                  <h6 className="text-sm font-bold text-blueGray-500">
                    Sign in with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="mb-1 mr-2 inline-flex items-center rounded bg-white px-4 py-2 text-xs font-normal font-bold uppercase text-blueGray-700 shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blueGray-50"
                    type="button"
                    onClick={handleGitHubLogin}
                  >
                    <img alt="..." className="mr-1 w-5" src="/img/github.svg" />
                    Github
                  </button>
                  <button
                    className="mb-1 mr-1 inline-flex items-center rounded bg-white px-4 py-2 text-xs font-normal font-bold uppercase text-blueGray-700 shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blueGray-50"
                    type="button"
                  >
                    <img alt="..." className="mr-1 w-5" src="/img/google.svg" />
                    Google
                  </button>
                </div>
                <hr className="border-b-1 mt-6 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                <div className="mb-3 text-center font-bold text-blueGray-400">
                  <small>Or sign in with credentials</small>
                </div>
                <form onSubmit={handleSubmit} method="POST">
                  <div className="relative mb-3 w-full">
                    <label
                      className="mb-2 block text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      placeholder="Email"
                      onChange={handleChange}
                      value={values.email}
                      type="email"
                    />
                    {errors.email && touched.email && (
                      <div className="text-sm text-red-600">{errors.email}</div>
                    )}
                  </div>
                  <div className="relative mb-3 w-full">
                    <label
                      className="mb-2 block text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    {errors.password && touched.password && (
                      <div className="text-red-600">{errors.password}</div>
                    )}
                  </div>
                  <div className="mt-6 text-center">
                    <button
                      className="mb-1 mr-1 w-full rounded bg-blueGray-800 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blueGray-600"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                  {errorMsg != "" && successMsg == "" && (
                    <div>
                      <small>{errorMsg}</small>
                    </div>
                  )}
                  {successMsg != "" && (
                    <div>
                      <small>{successMsg}</small>
                    </div>
                  )}
                </form>
              </div>
            </div>
            <div className="relative mt-6 flex flex-wrap">
              <div className="w-1/2">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
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
