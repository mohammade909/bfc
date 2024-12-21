// import React, { useState, useEffect } from "react";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import ErrorAlert from "../comman/ErrorAlert";
// import { loginUser, clearErrors } from "../../redux/authSlice";
// import { useSelector, useDispatch } from "react-redux";
// import Spinner from "../comman/Spinner";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Link } from "react-router-dom";

// export default function Login() {
//   const [showPass, setShowPass] = useState(false);
//   const { loading, error, auth } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const initialValues = {
//     email: "",
//     password: "",
//   };
//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Incorrect email").required("Email is required"),
//     password: Yup.string().required("Password is required"),
//   });

//   const formik = useFormik({
//     initialValues,
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       dispatch(loginUser(values));
//     },
//   });

//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         dispatch(clearErrors());
//       }, 2000);

//       return () => clearTimeout(timer);
//     }
//     if (auth) {
//       navigate(`/${auth?.role}/dashboard`);
//     }
//   }, [error, dispatch, auth]);

//   return (
//     <>
//       {/* <div className="md:flex regbg md:p-8 h-auto md:py-40 py-32 md:px-12">
//         <div className=" h-auto md:w-1/2 justify-center py-4 bg-gray-700 bg-opacity-10 rounded-2xl shadow-2xl">

//         <div className="sm:mx-auto sm:w-full sm:max-w-sm px-12 pt-4">
//           <img
//             className="mx-auto h-10 w-auto"
//             src="/Blackbot.png"
//             alt="Your Company"
//           />
//           <h2 className="mt-6 text-center text-2xl text-gray-700 font-bold leading-9 tracking-tight text-gray-700">
//             User Login
//           </h2>
//         </div>
//           <div className="sm:mx-auto sm:w-full px-12">
//             <form className="space-y-2 " onSubmit={formik.handleSubmit}>
//                 <div className="w-full">
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium leading-6 text-gray-700"
//                   >
//                     email
//                   </label>
//                   <div className="mt-2">
//                     <input
//                       id="email"
//                       name="email"
//                       value={formik.values.email}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       type="email"
//                       required
//                       className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                   </div>
//                   {formik.touched.email && formik.errors.email && (
//                     <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
//                       {formik.errors.email}*
//                     </p>
//                   )}
//                 </div>
               
//                 <div className="w-full">
//                   <div className="flex items-center justify-between">
//                     <label
//                       htmlFor="password"
//                       className="block text-sm font-medium leading-6 text-gray-700"
//                     >
//                       Password
//                     </label>
//                   </div>
//                   <div className="mt-2">
//                     <input
//                       id="password"
//                       name="password"
//                       value={formik.values.password}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       type={showPass ? "text" : "password"}
//                       autoComplete="current-password"
//                       required
//                       className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                     <span
//                       onClick={() => setShowPass(!showPass)}
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 cursor-pointer"
//                     >
//                     </span>
//                   </div>
//                   {formik.touched.password && formik.errors.password && (
//                     <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
//                       {formik.errors.password}*
//                     </p>
//                   )}
//                 </div>
//               {error && <ErrorAlert error={error} />}
//               <div>
//                 <button
//                   type="submit"
//                   className={`flex w-full uppercase tracking-widest justify-center rounded ${
//                     loading ? "bg-indigo-200" : "bg-indigo-600"
//                   } px-3 py-1.5 px-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
//                 >
//                   {loading ? <Spinner /> : "Login"}
//                 </button>
//               </div>
//             </form>

//             <p className="mt-4 text-center text-gray-700 text-sm ">
//               Not a member?{" "}
//               <Link
//                 to="/registration"
//                 className="font-semibold leading-6 text-gray-700"
//               >
//                 Register Here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div> */}

//       <div className="flex min-h-full flex-1 bg-black">
//         <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
//           <div className="mx-auto w-full max-w-sm lg:w-96">
//             <div className="sm:mx-auto sm:w-full sm:max-w-sm px-12 pt-4">
//             <Link
//                 to="/"><img
//                 className="cursor-pointer mx-auto h-10 w-auto"
//                 src="/logo.png"
//                 alt="Your Company"
//               /></Link>
//               <h2 className="mt-6 text-center text-2xl text-black font-bold leading-9 tracking-tight">
//                 User Login
//               </h2>
//             </div>

//             <div className="mt-10">
//               <div>
//                 <form className="space-y-2 " onSubmit={formik.handleSubmit}>
//                   <div className="w-full">
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium leading-6 text-black"
//                     >
//                       Email
//                     </label>
//                     <div className="mt-2">
//                       <input
//                         id="email"
//                         name="email"
//                         value={formik.values.email}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         type="email"
//                         required
//                         className="block w-full rounded-md border-0 py-1.5 px-4 text-black shadow-sm bg-gray-800 sm:text-sm sm:leading-6"
//                       />
//                     </div>
//                     {formik.touched.email && formik.errors.email && (
//                       <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
//                         {formik.errors.email}*
//                       </p>
//                     )}
//                   </div>

//                   <div className="w-full">
//                     <div className="flex items-center justify-between">
//                       <label
//                         htmlFor="password"
//                         className="block text-sm font-medium leading-6 text-black"
//                       >
//                         Password
//                       </label>
//                     </div>
//                     <div className="mt-2">
//                       <input
//                         id="password"
//                         name="password"
//                         value={formik.values.password}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         type={showPass ? "text" : "password"}
//                         autoComplete="current-password"
//                         required
//                         className="block w-full rounded-md border-0 py-1.5 px-4 text-black shadow-sm bg-gray-800 sm:text-sm sm:leading-6"
//                       />
//                       <span
//                         onClick={() => setShowPass(!showPass)}
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 cursor-pointer"
//                       ></span>
//                     </div>
//                     {formik.touched.password && formik.errors.password && (
//                       <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
//                         {formik.errors.password}*
//                       </p>
//                     )}
//                   </div>
//                   {error && <ErrorAlert error={error} />}
//                   <div>
//                     <button
//                       type="submit"
//                       className={`flex w-full uppercase tracking-widest justify-center rounded ${
//                         loading ? "bg-indigo-200" : "bg-indigo-600"
//                       } px-3 py-1.5 px-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
//                     >
//                       {loading ? <Spinner /> : "Login"}
//                     </button>
//                   </div>
//                 </form>

//                 <p className="mt-4 text-center text-black text-sm ">
//                   Not a member?{" "}
//                   <Link
//                     to="/registration"
//                     className="font-semibold leading-6 text-black"
//                   >
//                     Register Here
//                   </Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="relative hidden w-0 flex-1 lg:block">
//           <img
//             alt=""
//             src="/bot.png"
//             className="absolute inset-0 h-full w-full object-cover"
//           />
//         </div>
//       </div>
//     </>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import ErrorAlert from "../comman/ErrorAlert";
// import { loginUser, clearErrors } from "../../redux/authSlice";
// import { useSelector, useDispatch } from "react-redux";
// import Spinner from "../comman/Spinner";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Link } from "react-router-dom";

// export default function Login() {
//   const [showPass, setShowPass] = useState(false);
//   const { loading, error, auth } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const initialValues = {
//     email: "",
//     password: "",
//   };

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Incorrect email").required("Email is required"),
//     password: Yup.string().required("Password is required"),
//   });

//   const formik = useFormik({
//     initialValues,
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       dispatch(loginUser(values));
//     },
//   });

//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         dispatch(clearErrors());
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//     if (auth) {
//       navigate(`/${auth?.role}/dashboard`);
//     }
//   }, [error, dispatch, auth]);

//   return (
//     <div className="relative min-h-screen flex justify-center items-center">
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 h-full w-full bg-no-repeat bg-cover bg-center"
//         style={{ backgroundImage: `url(/bul.jpg)` }}  // Replace with your image path
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black opacity-40"></div>

//       {/* Form Container */}
//       <div className="relative z-10 bg-white bg-opacity-10 rounded-lg p-8 shadow-lg max-w-md w-full">
//         <div className="mx-auto w-full max-w-sm">
//           {/* Logo */}
//           <div className="text-center">
//             <Link to="/">
//               <img className="cursor-pointer mx-auto h-10 w-auto" src="/bfc.png" alt="Your Company" />
//             </Link>
//             <h2 className="mt-6 text-center text-3xl text-white font-bold leading-9 tracking-tight">
//               Login
//             </h2>
//             <p className="mt-2 text-center text-white">Have an account?</p>
//           </div>

//           {/* Form */}
//           <div className="mt-8">
//             <form className="space-y-4" onSubmit={formik.handleSubmit}>
//               <div className="w-full">
//                 <label htmlFor="email" className="block text-sm font-medium text-white">
//                   Email
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     id="email"
//                     name="email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     type="email"
//                     required
//                     className="block w-full rounded-full bg-white bg-opacity-10 text-white py-2 px-4 focus:outline-none sm:text-sm"
//                   />
//                 </div>
//                 {formik.touched.email && formik.errors.email && (
//                   <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
//                     {formik.errors.email}*
//                   </p>
//                 )}
//               </div>

//               <div className="w-full relative">
//                 <label htmlFor="password" className="block text-sm font-medium text-white">
//                   Password
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     id="password"
//                     name="password"
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     type={showPass ? "text" : "password"}
//                     required
//                     className="block w-full rounded-full bg-white bg-opacity-10 text-white py-2 px-4 focus:outline-none sm:text-sm"
//                   />
//                   <span
//                     onClick={() => setShowPass(!showPass)}
//                     className="absolute inset-y-0 right-0 top-[45px] transform -translate-y-1/2 pr-3 flex items-center text-black cursor-pointer"
//                   >
//                     {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
//                   </span>
//                 </div>
//                 {formik.touched.password && formik.errors.password && (
//                   <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
//                     {formik.errors.password}*
//                   </p>
//                 )}
//               </div>

//               {error && <ErrorAlert error={error} />}
//               <div className="flex justify-between items-center">
//                 <label className="flex items-center text-white">
//                   <input type="checkbox" className="form-checkbox rounded text-white" />
//                   <span className="ml-2">Remember Me</span>
//                 </label>
//                 <Link to="/forgot-password" className="text-white text-sm">
//                   Forgot Password
//                 </Link>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className={`w-full uppercase tracking-widest justify-center rounded-full ${
//                     loading ? "bg-[#ddaf26]" : "bg-[#ddaf26]"
//                   } px-6 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#b78e12] focus:outline-none`}
//                 >
//                   {loading ? <Spinner /> : "Sign In"}
//                 </button>
//               </div>
//             </form>

//             <p className="mt-4 text-center text-white text-sm">
//               Not a member?{" "}
//               <Link to="/registration" className="font-semibold leading-6 text-white">
//                 Register Here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../comman/ErrorAlert";
import { loginUser, clearErrors } from "../../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../comman/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Header } from "../../Blackbot/Header";
import Footer from "../../Blackbot/Footer";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const { loading, error, auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Incorrect email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (auth) {
      navigate(`/${auth?.role}/dashboard`);
    }
  }, [error, dispatch, auth]);

  return (
    <>
    <Header/>
    <div className="relative min-h-screen flex justify-start items-center pt-20 pb-6">
      {/* Background Image */}
      <div
        className="absolute inset-0 h-full w-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(https://img.freepik.com/free-photo/gold-bull-backgrounds-graphics-elements-related-financial-sector_23-2151807659.jpg?uid=R176823449&ga=GA1.1.1433286368.1718702777&semt=ais_hybrid)` }}  // Replace with your image path
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Form Container */}
      <div className="relative z-10 bg-black bg-opacity-50 rounded-lg p-8 shadow-lg max-w-md w-full">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo */}
          <div className="text-center">
            <Link to="/">
              <img className="cursor-pointer mx-auto  w-56" src="/JFC.png" alt="Your Company" />
            </Link>
            <h2 className="mt-6 text-center text-4xl text-indigo-600 font-bold leading-9 tracking-tight">
              Login
            </h2>
            <p className="mt-2 text-center text-white">Have an account?</p>
          </div>

          {/* Form */}
          <div className="mt-8">
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div className="w-full">
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="email"
                    required
                    className="block w-full rounded-full bg-white bg-opacity-10 text-white py-2 px-4 focus:outline-none sm:text-sm"
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
                    {formik.errors.email}*
                  </p>
                )}
              </div>

              <div className="w-full relative">
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type={showPass ? "text" : "password"}
                    required
                    className="block w-full rounded-full bg-white bg-opacity-10 text-white py-2 px-4 focus:outline-none sm:text-sm"
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute inset-y-0 right-0 top-[45px] transform -translate-y-1/2 pr-3 flex items-center text-black cursor-pointer"
                  >
                    {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
                    {formik.errors.password}*
                  </p>
                )}
              </div>

              {error && <ErrorAlert error={error} />}
              <div className="flex justify-between items-center">
                <label className="flex items-center text-white">
                  <input type="checkbox" className="form-checkbox rounded text-white" />
                  <span className="ml-2">Remember Me</span>
                </label>
                <Link to="/forgot-password" className="text-white text-sm">
                  Forgot Password
                </Link>
              </div>

              <div>
                <button
                  type="submit"
                  className={`w-full uppercase tracking-widest justify-center rounded-full ${
                    loading ? "bg-indigo-500" : "bg-indigo-500"
                  } px-6 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus:outline-none`}
                >
                  {loading ? <Spinner /> : "Sign In"}
                </button>
              </div>
            </form>

            <p className="mt-4 text-center text-white text-sm">
              Not a member?{" "}
              <Link to="/registration" className="font-semibold leading-6 text-blue-500 hover:text-blue-600 hover:underline">
                Register Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
