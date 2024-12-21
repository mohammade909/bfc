import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../BaseFile/comman/Spinner";
import { getUserbyemail } from "../redux/userSlice";
import { addTopup,  clearErrors, clearMessage,} from "../redux/topupSlice";
export default function UserTopupModel({ openModel, modelClose }) {
  const dispatch = useDispatch();
  const { allplans } = useSelector((state) => state.allplans);
  const { emailuser } = useSelector((state) => state.allusers);
  const { auth } = useSelector((state) => state.auth);
  const { loading, error, message } = useSelector((state) => state.alltopup);
  const [investment_amount, setInvestment_amount] = useState(null);
  const [amount, setAmount] = useState();
  const [plan, setPlan] = useState();
  const [userby, setUserby] = useState();

  useEffect(() => {
      if (userby && userby !== auth?.email) {
        dispatch(getUserbyemail(userby));
      }
    if (error) {
      const errorInterval = setInterval(() => {
        dispatch(clearErrors());
      }, 3000);
      return () => clearInterval(errorInterval);
    }
    if (message) {
      const messageInterval = setInterval(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearInterval(messageInterval);
    }
}, [dispatch, error, message ,auth?.id,userby]);


  const handleSaveChanges = (e) => {
    if (amount < plan?.min || (plan?.max !== null && amount > plan?.max)) {
      alert(`Amount must be between ${plan?.min} and ${plan?.max ? plan?.max : 'infinity'}.`);
      return;
    }
    e.preventDefault();
    const form = e.target.closest("form");
    if (form.checkValidity()) {
      const allValues = {
        userby_id: auth?.id,
        userto_id: emailuser?.id,
        investment_amount:investment_amount,
        id:plan?.id,
        amount:amount
      };
      dispatch(addTopup({ values: allValues }));
      modelClose()
    } else {
      form.reportValidity();
    }
  };

  return (
    <Dialog open={openModel} onClose={modelClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-black border px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="p-5">
                <div className="py-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold mb-5 text-gray-300 ">
                    Top-Up form
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
                <form className="">
              <div className=" w-full ">
                <div className="mb-4 ">
                  <label className="block text-sm font-medium text-gray-300">
                    User
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-gray-300 bg-gray-800 px-3 py-2"
                    placeholder="type user E-Mail . . ."
                    onChange={(e) => setUserby(e.target.value)}
                  />
                  <p
                    className={
                      emailuser?.username ? "text-green-500" : "text-red-500"
                    }
                  >
                    {emailuser?.username
                      ? emailuser.username
                      : "Provide user email"}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Plan
                  </label>

                  {emailuser?.is_active === "active" ? (
                    <input
                      type="number"
                      name="investment_amount"
                      min="200"
                      step="50"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-gray-300 bg-gray-800 px-3 py-2"
                      placeholder="Enter investment amount (multiple of 100, minimum 200)"
                      onChange={(e)=>setInvestment_amount(e.target.value)}
                      required
                    />
                  ) : (
                    <select
                    name="id"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-gray-300 bg-gray-800 px-3 py-2"
                    onChange={(e) => {
                      const selectedPlan = allplans[e.target.selectedIndex - 1];
                      setPlan(selectedPlan);
                    }}
                    required
                  >
                    <option value="">Select a plan</option>
                    {allplans?.map((plan, index) => (
                      <option key={index} value={plan.id}> 
                        {plan.name} - ${plan.monthly_price} Activation Plan
                      </option>
                    ))}
                  </select>
                  
                  )}
                </div>
                {emailuser?.is_active === "active" ? (
                null):(
                <div className="mb-4 ">
                  <label className="block text-sm font-medium text-gray-300">
                    Amount
                  </label>
                  <input
                    type="text"
                    name="amount"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-gray-300 bg-gray-800 px-3 py-2"
                    placeholder="Type user E-Mail . . ."
                    onChange={(e)=>setAmount(e.target.value)}

                  />
                </div>)}
                <div className=" flex justify-center items-center pb-4 ">
                  <button
                    type="submit"
                    disabled={!emailuser} // Disable if emailuser is falsy
                    onClick={handleSaveChanges}
                    className={`px-4 py-2 rounded text-white focus:outline-none w-full mt-3 border bg-gray-800 hover:bg-gray-900 ${
                      emailuser
                        ? "bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600 " // Styles for the enabled state
                        : "bg-gray-400 cursor-not-allowed" // Styles for the disabled state
                    }`}
                  >
                    {loading ? <Spinner /> : "TopUp"}
                  </button>
                </div>
              </div>
            </form>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
