

// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import Spinner from "../comman/Spinner";
// import { signupUser, clearErrors, clearMessage } from "../../redux/authSlice";
// import ErrorAlert from "../comman/ErrorAlert";
// import SuccessAlert from "../comman/SuccessAlert";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";

// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };

// export default function Registration() {
//   const [referralCode, setReferralCode] = useState(null);
//   const query = useQuery();

//   useEffect(() => {
//     const referral = query.get("referral");
//     if (referral) {
//       setReferralCode(referral);
//     }
//   }, [query]);

//   const [showPass, setShowPass] = useState(false);

//   const { loading, error, message } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const initialValues = {
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     referralBy: "",
//   };

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Incorrect email").required("Email is required"),
//     password: Yup.string()
//       .min(8, "Password must be at least 8 characters")
//       .required("Password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref('password'), null], 'Passwords must match')
//       .required("Confirm password is required"),
//     username: Yup.string().required("Username is required"),
//   });

//   const formik = useFormik({
//     initialValues,
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       if (referralCode) {
//         values.referralBy = referralCode;
//       }
//       dispatch(signupUser(values));
//     },
//   });

//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         dispatch(clearErrors());
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//     if (message) {
//       const timer = setTimeout(() => {
//         navigate("/");
//         dispatch(clearMessage());
//       }, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [error, dispatch, message, navigate]);

//   return (
//     <>
//       <div
//         className="relative min-h-screen flex items-center justify-end bg-cover bg-center"
//         style={{ backgroundImage: `url('/bul2.jpg')` }}
//       >
//         {/* Overlay for darkening the background */}
//         <div className="absolute inset-0 bg-black opacity-50"></div>

//         {/* Form container aligned to the right with right padding */}
//         <div className="relative bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-lg p-8 max-w-lg w-full mr-8">
//           <div className="text-left">
//             <Link to="/">
//               <img className="h-10 w-auto mb-4" src="/bfc.png" alt="Company Logo" />
//             </Link>
//             <h2 className="text-3xl font-bold text-white">Create your account</h2>
//             <p className="text-gray-200 mb-6">Start your journey with us today</p>
//           </div>

//           <form className="space-y-6" onSubmit={formik.handleSubmit}>
//             <div className="flex gap-4">
//               {/* Username */}
//               <div className="w-full">
//                 <label htmlFor="username" className="block text-sm font-medium text-white">Username</label>
//                 <input
//                   id="username"
//                   name="username"
//                   type="text"
//                   required
//                   value={formik.values.username}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="mt-2 block w-full bg-gray-700 text-gray-200 rounded-md py-2 px-4 placeholder-gray-400 border border-gray-500 focus:ring focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 {formik.touched.username && formik.errors.username && (
//                   <p className="text-red-500 text-xs mt-2">{formik.errors.username}</p>
//                 )}
//               </div>

//               {/* Email */}
//               <div className="w-full">
//                 <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   value={formik.values.email}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="mt-2 block w-full bg-gray-700 text-gray-200 rounded-md py-2 px-4 placeholder-gray-400 border border-gray-500 focus:ring focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 {formik.touched.email && formik.errors.email && (
//                   <p className="text-red-500 text-xs mt-2">{formik.errors.email}</p>
//                 )}
//               </div>
//             </div>

//             <div className="flex gap-4">
//               {/* Password */}
//               <div className="w-full">
//                 <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
//                 <div className="relative mt-2">
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPass ? "text" : "password"}
//                     required
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="block w-full bg-gray-700 text-gray-200 rounded-md py-2 px-4 placeholder-gray-400 border border-gray-500 focus:ring focus:ring-blue-500 focus:border-blue-500"
//                   />
//                   <span
//                     onClick={() => setShowPass(!showPass)}
//                     className="absolute right-4 top-3 cursor-pointer text-gray-300"
//                   >
//                     {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
//                   </span>
//                 </div>
//                 {formik.touched.password && formik.errors.password && (
//                   <p className="text-red-500 text-xs mt-2">{formik.errors.password}</p>
//                 )}
//               </div>

//               {/* Confirm Password */}
//               <div className="w-full">
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm Password</label>
//                 <div className="relative mt-2">
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type={showPass ? "text" : "password"}
//                     required
//                     value={formik.values.confirmPassword}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="block w-full bg-gray-700 text-gray-200 rounded-md py-2 px-4 placeholder-gray-400 border border-gray-500 focus:ring focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//                   <p className="text-red-500 text-xs mt-2">{formik.errors.confirmPassword}</p>
//                 )}
//               </div>
//             </div>

//             {/* Referral Code */}
//             <div>
//               <label htmlFor="referralBy" className="block text-sm font-medium text-white">Referral Code</label>
//               <input
//                 id="referralBy"
//                 name="referralBy"
//                 type="text"
//                 value={referralCode || formik.values.referralBy}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="mt-2 block w-full bg-gray-700 text-gray-200 rounded-md py-2 px-4 placeholder-gray-400 border border-gray-500 focus:ring focus:ring-blue-500 focus:border-blue-500"
//                 disabled={!!referralCode}
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
//               disabled={loading}
//             >
//               {loading ? <Spinner /> : "Sign Up"}
//             </button>
//           </form>

//           <p className="mt-6 text-left text-gray-300">
//             Already a member?{" "}
//             <Link to="/" className="text-blue-400 hover:text-blue-300">
//               Login Here
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* Error and Success Alerts */}
//       {error && <ErrorAlert error={error} />}
//       {message && <SuccessAlert message={message} />}
//     </>
//   );
// }


import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Spinner from "../comman/Spinner";
import { signupUser, clearErrors, clearMessage } from "../../redux/authSlice";
import ErrorAlert from "../comman/ErrorAlert";
import SuccessAlert from "../comman/SuccessAlert";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "../../Blackbot/Header";
import Footer from "../../Blackbot/Footer";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function Registration() {
  const [referralCode, setReferralCode] = useState(null);
  const query = useQuery();

  useEffect(() => {
    const referral = query.get("referral");
    if (referral) {
      setReferralCode(referral);
    }
  }, [query]);

  const [showPass, setShowPass] = useState(false);

  const { loading, error, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralBy: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Incorrect email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required("Confirm password is required"),
    username: Yup.string().required("Username is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (referralCode) {
        values.referralBy = referralCode;
      }
      dispatch(signupUser(values));
    },
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (message) {
      const timer = setTimeout(() => {
        navigate("/");
        dispatch(clearMessage());
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch, message, navigate]);

  return (
    <>
    <Header/>
      <div
        className="relative min-h-screen flex items-center justify-end bg-cover bg-center  py-8"
        style={{ backgroundImage: `url('https://img.freepik.com/free-photo/beautiful-cryptocurrency-hologram-design_23-2149250210.jpg?uid=R176823449&ga=GA1.1.1433286368.1718702777&semt=ais_hybrid')` }}
      >
        {/* Overlay for darkening the background */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Form container aligned to the right with right padding */}
        <div className="relative bg-white bg-opacity-10  backdrop-blur-lg shadow-lg rounded-lg p-8 max-w-lg w-full mr-8">
          <div className="text-left">
            <Link to="/">
              <img className="w-56 mb-4" src="/JFC.png" alt="Company Logo" />
            </Link>
            <h2 className="text-3xl font-bold text-indigo-600 capitalize ">Create your account</h2>
            <p className="text-gray-200 mb-6">Start your journey with us today</p>
          </div>

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className="flex gap-4">
              {/* Username */}
              <div className="w-full">
                <label htmlFor="username" className="block text-sm font-medium text-white">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter Username"
                  required
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-2 block w-full text-sm bg-gray-700 bg-opacity-10  backdrop-blur-lg text-gray-200 rounded-md py-2 px-4 placeholder-gray-400 border border-gray-500 focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.touched.username && formik.errors.username && (
                  <p className="text-red-500 text-xs mt-2">{formik.errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div className="w-full">
                <label htmlFor="email" className="block text-sm  font-medium text-white">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-2 block w-full text-sm bg-gray-700 text-gray-200 bg-opacity-10  backdrop-blur-lg rounded-md py-2 px-4 placeholder-gray-400 border border-gray-500 focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs mt-2">{formik.errors.email}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              {/* Password */}
              <div className="w-full">
                <label htmlFor="password" className="block text-sm font-medium text-white ">Password</label>
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    type={showPass ? "text" : "password"}
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full text-sm bg-gray-700 text-gray-200 rounded-md py-2 px-4 placeholder-gray-400 border border-gray-500 bg-opacity-10  backdrop-blur-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-3 cursor-pointer text-gray-300 "
                  >
                    {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-xs mt-2">{formik.errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="w-full">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white ">Confirm Password</label>
                <div className="relative mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    type={showPass ? "text" : "password"}
                    required
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full text-sm bg-gray-700 text-gray-200 rounded-md py-2 px-4 bg-opacity-10  backdrop-blur-lg placeholder-gray-400 border border-gray-500 focus:ring focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-2">{formik.errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Referral Code */}
            <div>
              <label htmlFor="referralBy" className="block text-sm font-medium text-white ">Referral Code</label>
              <input
                id="referralBy"
                name="referralBy"
                placeholder="Enter Referral Code"
                type="text"
                required
                value={referralCode || formik.values.referralBy}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-2 block w-full text-sm bg-gray-700 text-gray-200 rounded-md py-2 px-4 bg-opacity-10  backdrop-blur-lg placeholder-gray-400 border border-gray-500 focus:ring focus:ring-amber-500 focus:border-amber-500"
                disabled={!!referralCode}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white text-sm rounded-md py-2 px-4 hover:bg-green-600  focus:ring focus:ring-green-500 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-left text-gray-300">
            Already a member?{" "}
            <Link to="/user/login" className="text-white font-semibold hover:text-blue-600 hover:underline">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    <Footer/>
      {/* Error and Success Alerts */}
      {error && <ErrorAlert error={error} />}
      {message && <SuccessAlert message={message} />}
    </>
  );
}
