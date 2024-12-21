import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { addTopup, clearErrors, clearMessage } from "../redux/topupSlice";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserPlanConfirmation({ isclose, plan, user_id }) {
  const [open, setOpen] = useState(true);
  const [amount, setAmount] = useState();
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.alltopup);
  const allValues = {
    id: plan?.id,
    userby_id: user_id,
    userto_id: user_id,
    amount: amount,
  };
  useEffect(() => {
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
  }, [dispatch, error, message, clearErrors, clearMessage]);

  const handleSaveChanges = () => {
    if (amount < plan?.min || (plan?.max !== null && amount > plan?.max)) {
      alert(
        `Amount must be between ${plan?.min} and ${
          plan?.max ? plan?.max : "infinity"
        }.`
      );
      return;
    }
    dispatch(addTopup({ values: allValues }));
    isclose();
  };
  return (
    <Dialog open={open} onClose={isclose} className="relative z-10">
    <DialogBackdrop
      transition
      className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
    />

    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <DialogPanel
          transition
          className="relative transform overflow-hidden rounded-lg bg-black px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
        >
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckIcon aria-hidden="true" className="h-6 w-6 text-green-600" />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <DialogTitle
                as="h3"
                className="text-base font-semibold leading-6 text-gray-200"
              >
                Buy Plan?
              </DialogTitle>
              <div className="mt-2">
                <p className="text-sm text-gray-200">
                  Are You Sure? Want to buy this Plan..
                </p>
              </div>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault(); 
              if (amount) {
                handleSaveChanges();
              }
            }}
          >
            <div className="mb-4 w-full">
              <label className="block text-sm font-medium text-gray-200">
                Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="amount"
                value={amount}
                required
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block h-10 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter Amount.."
                step="50"
                min="100"
              />
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
              >
                Buy
              </button>
              <button
                type="button"
                onClick={isclose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              >
                Cancel
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
  
  );
}
