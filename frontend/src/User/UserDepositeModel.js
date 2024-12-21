import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQRCode } from "react-qrcode";
import { FaCopy } from "react-icons/fa";
import Spinner from "../BaseFile/comman/Spinner";
import { addDeposite, clearErrors, clearMessage } from "../redux/depositeSlice";
export default function UserDepositeModel({ openModel, modelClose }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { qr } = useSelector((state) => state.qr);
  const { loading, error, message } = useSelector((state) => state.alldeposite);
  const [file, setFile] = useState(null);
  const [fieldError, setFiledError] = useState(null);
  const [amount, setAmount] = useState("");
  const [hash, setHash] = useState("");
  const [beplink, setBeplink] = useState("");
  const [trclink, setTrclink] = useState("");
  const [data, setData] = useState("");
  const [currency, setCurrency] = useState("BEP");

  useEffect(() => {
    if (qr && currency) {
      setBeplink(qr?.BEB20);
      setTrclink(qr?.TRC20);
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
  }, [dispatch, error, message, qr]);

  let dataUrl1 = useQRCode(beplink);
  let dataUrl2 = useQRCode(trclink);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };
  const handleHashChange = (event) => {
    setHash(event.target.value);
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file == null) {
      window.alert("upload file");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("amount", amount);
    formData.append("user_id", auth?.id);
    formData.append("currency", currency);
    formData.append("hash", hash);

    dispatch(addDeposite(formData));
    modelClose();
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
                  <h2 className="text-xl font-semibold mb-5 text-gray-300 mb-2">
                    Deposite form
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
                <div className="">
                  <div className="w-full">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {currency == "BEP" ? (
                        <>
                          <div className="items-center flex justify-center mb-10">
                            {dataUrl1 && (
                              <img
                                className="w-48 h-48 object-cover"
                                src={dataUrl1 ? dataUrl1 : ""}
                                alt="QR Code"
                              />
                            )}
                          </div>
                          <div className="flex items-center justify-center space-x-2 text-white border rounded-sm ">
                            <span className="px-2 text-sm bg-gray-800 py-2">
                            Address </span>
                            <h1 className="text-sm truncate whitespace-nowrap overflow-hidden">
                              {qr?.BEB20}
                            </h1>
                            {/* Copy Icon (you can use any icon library, FontAwesome is used here as an example) */}
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(qr?.BEB20 || "");
                                alert("Copied to clipboard!"); // Optional: display a message when copied
                              }}
                              className="focus:outline-none text-white px-2 bg-gray-800 py-2"
                            >
                              <FaCopy />
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="items-center flex justify-center mb-10">
                            {dataUrl2 && (
                              <img
                                className="w-48 h-48 object-cover"
                                src={dataUrl2 ? dataUrl2 : ""}
                                alt="QR Code"
                              />
                            )}
                          </div>
                          <div className="flex items-center justify-center space-x-2 text-white border rounded-sm ">
                          <span className="px-2 text-sm bg-gray-800 py-2">
                          Address </span> 
                          <h1 className="text-sm truncate whitespace-nowrap overflow-hidden">
                            {qr?.TRC20}
                            </h1>
                            {/* Copy Icon (you can use any icon library, FontAwesome is used here as an example) */}
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(qr?.TRC20 || "");
                                alert("Copied to clipboard!"); // Optional: display a message when copied
                              }}
                              className="focus:outline-none text-white px-2 bg-gray-800 py-2"
                            >
                              <FaCopy />
                            </button>
                          </div>
                        </>
                      )}
                      <div className="flex w-full space-x-4">
                        <div className="w-full ">
                          <label
                            htmlFor="currency"
                            className="block text-sm font-medium text-gray-300"
                          >
                            Currency
                          </label>{" "}
                          <div className="">
                            <select
                              id="currency"
                              name="currency"
                              className="mt-1 block text-sm w-full border-gray-300 rounded-md bg-gray-800 text-gray-300 shadow-sm px-3 py-2  focus:ring-opacity-50"
                              value={currency}
                              onChange={handleCurrencyChange}
                            >
                              <option value="">Select Option</option>
                              <option value="BEP">USDT BEP20</option>
                              <option value="TRC">USDT TRC20</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-1  grid-cols-1">
                        <div className="mb-4">
                          <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-300"
                          >
                            Amount
                          </label>
                          <input
                            id="amount"
                            type="number"
                            name="amount"
                            className="mt-1 block  text-sm w-full border-gray-300 rounded-md px-3 py-2 shadow-sm bg-gray-800 focus:ring-opacity-50"
                            placeholder="Type user amount..."
                            value={amount}
                            onChange={handleAmountChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="hash"
                            className="block text-sm font-medium text-gray-300"
                          >
                            Transaction Hash
                          </label>
                          <input
                            id="hash"
                            type="text"
                            name="hash"
                            className="mt-1 block text-sm w-full border-gray-300 rounded-md px-3 py-2 shadow-sm bg-gray-800 focus:ring-opacity-50"
                            placeholder="Type Transaction Hash..."
                            value={hash}
                            onChange={handleHashChange}
                          />
                        </div>
                        <div className="">
                          <div className="relative">
                            <input
                              id="file"
                              type="file"
                              name="image"
                              onChange={handleFileChange}
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex w-full gap-4">
                        <button
                          type="button"
                          className="bg-blue-500 text-sm w-1/2 text-white px-4 py-2 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          onClick={() =>
                            document.getElementById("file").click()
                          }
                        >
                          Upload
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-sm bg-indigo-500 w-1/2 text-white rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                        >
                          {loading ? <Spinner /> : "Deposit"}
                        </button>
                      </div>
                      {fieldError && (
                        <div className="text-red-500">{fieldError}</div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
