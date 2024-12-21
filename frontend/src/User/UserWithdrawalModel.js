import { sendOTP, verifyOTP ,clearOtpErrors,clearOtpMessage} from "../redux/otpSlice"; // Assume you have actions for OTP handling
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../BaseFile/comman/Spinner";
import { getUser } from "../redux/userSlice";
import {
  addWithdrawal,
  clearErrors,
  clearMessage,
} from "../redux/withdrawalSlice";

export default function UserWithdrawalModel({ openModel, modelClose }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);

  const {loading, success ,error:otpErr,message} = useSelector((state) => state.otp);
  const { singleuser } = useSelector((state) => state.allusers);
  const [values, setValues] = useState({});
  const [isOTPRequested, setIsOTPRequested] = useState(false);
  const [otp, setOtp] = useState("");
  const [check, setCheck] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  useEffect(() => {
    dispatch(getUser(auth?.id));
   
    if (otpErr) {
      const errorInterval = setInterval(() => {
        dispatch(clearOtpErrors());
      }, 3000);
      return () => clearInterval(errorInterval);
    }
 
    if (success) {
      const messageInterval = setInterval(() => {
        dispatch(clearOtpMessage());
      }, 3000);
      return () => clearInterval(messageInterval);
    }
  }, [dispatch,otpErr,success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };

  const requestOTP = async () => {
    if(values.amount > maxAmount){
     return window.alert("Amount exceed Maximum Amount")
    }
    if(values.amount < 25){
      return window.alert("Amount should be greater than 24")
     }
    dispatch(sendOTP({ userId: auth?.id, email: singleuser?.email }));
    setIsOTPRequested(true);
  };

  const verifyAndSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(verifyOTP({ userId: auth?.id, otp }));
      if (response?.payload?.success) {
        console.log("Verification succeeded");
        const allValues = {
          ...values,
          user_id: auth?.id,
          check: check,
        };
        await dispatch(addWithdrawal({ values: allValues }));
        modelClose();
      } else {
        console.log("Verification failed");
      }
    } catch (error) {
      console.error("An error occurred during verification:", error);
    }
  };
  

  useEffect(() => {
    const activationDate = new Date(singleuser?.activation_date); // Parse the activation date
    const currentDate = new Date();
    const sixMonthsLater = new Date(
      activationDate.getFullYear(),
      activationDate.getMonth() + 6,
      activationDate.getDate()
    );
    if (currentDate >= sixMonthsLater) {
      setCheck(true); 
      setMaxAmount(
        singleuser?.wallet - singleuser?.roi_income + singleuser?.active_plan
      );
    } else {
      setCheck(false);
      setMaxAmount(
        singleuser?.wallet - singleuser?.roi_income
      ); 
    }
  }, [singleuser?.activation_date]);

  return (
    <Dialog open={openModel} onClose={modelClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-black px-4 pb-4 pt-5 text-left shadow-xl sm:w-full sm:max-w-lg sm:p-6">
            <div>
              <div className="p-5 ">
                <div className="flex justify-between mb-3">
                  <h2 className="text-xl font-semibold mb-5 text-gray-300">
                    {check ? (
                      <>
                        <span className="block"> Withdrawal Form</span>{" "}
                        <span className="text-xs">
                          {" "}
                          (Your Wallet:{" "}
                          {(maxAmount)?.toFixed(2)}
                          )
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="block"> Withdrawal Form</span>{" "}
                        <span className="text-xs">
                          {" "}
                          (Your Wallet:{" "}
                          {(maxAmount)?.toFixed(2)}
                          )
                        </span>
                      </>
                    )}
                  </h2>
                  <button onClick={modelClose}>
                    <div class="group flex  cursor-pointer items-center justify-center mb-2 ">
                      <div class="space-y-2">
                        <span class="block h-1 w-10 origin-center rounded-full bg-slate-500 transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
                        <span class="block h-1 w-8 origin-center rounded-full bg-orange-500 transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
                      </div>
                    </div>
                  </button>
                </div>
                <form>
                  {!isOTPRequested ? (
                    <>
                      <div className="relative w-full">
                        <label
                          htmlFor="amount"
                          className="absolute -top-2 left-2 bg-black px-1 text-xs font-medium text-gray-300"
                        >
                          Amount
                        </label>
                        <input
                          id="amount"
                          type="number"
                          name="amount"
                          placeholder="Amount"
                          onChange={handleChange}
                          required
                          min="25"
                          max={maxAmount}
                          className="block w-full p-4 rounded-md border-0 text-gray-300 bg-black shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>
                      <p className="text-gray-200 text-xs mt-2">
                        Minimum withdrawal: $25. Admin fee: 10%. Processing
                        time: 72 hours.
                      </p>
                      <button
                        type="button"
                        disabled={values.amount ? false : true}
                        className="w-full mt-4 p-2 bg-gray-800 hover:bg-gray-900 text-white rounded"
                        onClick={requestOTP}
                      >
                        Request OTP
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="relative w-full">
                        <label
                          htmlFor="otp"
                          className="absolute -top-2 left-2 bg-black px-1 text-xs font-medium text-gray-300"
                        >
                          OTP
                        </label>
                        <input
                          id="otp"
                          type="text"
                          name="otp"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={handleOTPChange}
                          required
                          className="block w-full p-4 rounded-md border-0 text-gray-300 bg-black shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={otp.length==6 ? false : true }
                        className="w-full mt-4 p-2 bg-gray-800 hover:bg-gray-900 text-white rounded "
                        onClick={verifyAndSubmit}
                      >
                        {loading ? <Spinner /> : "Submit Withdrawal"}
                      </button>

                    </>
                  )}
                </form>
                <p className="text-red-600 text-2xl">{otpErr}</p>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
