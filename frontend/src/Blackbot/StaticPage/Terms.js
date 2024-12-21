import React from 'react'
import { Header } from '../Header'
import Footer from '../Footer'


export const Terms = () => {
  return (
  <>
  <Header/>
  
<div className="bg-white text-black dark:bg-black dark:text-white ">
  <div className="max-w-7xl mx-auto  px-4 py-8">
    <div className="w-full flex">
      <h1 className="text-3xl font-bold mb-0 text-indigo-600">Terms and Conditions </h1>
    </div>
    <br />
    <p className="mb-4 text-base text-justify">
    To access Trade Hit and use our services, you must create an account with accurate and complete information. You are responsible for keeping your account details, including your password, secure. If you believe your account has been compromised, please contact us immediately. You agree not to share your account information with anyone and to follow the platform's security guidelines.

    </p>
    <br />
    {/* repeat this section for each section of terms */}
    <div className="pb-5">
      <h2 className="font-bold text-indigo-600 dark:text-orange-300">Trading and Transactions
      </h2>
      <br /> 
      <ul>
        <li className="list-disc">
          <p className="text-base text-justify">
          When using our platform to trade, you agree to follow all rules and guidelines related to trading. You are responsible for ensuring that all trades and transactions you make are accurate and authorized. Trade Hit is not liable for any errors in your trades or transactions, and we recommend you carefully review all information before confirming any actions. Please also be aware that some fees may apply to transactions.
          </p>
        </li>
        <br />
        
      </ul>
    </div>
    <div className="pb-5">
      <h2 className="font-bold text-indigo-600 dark:text-orange-300">Limitation of Liability
      </h2>
      <br /> 
      <ul>
        <li className="list-disc">
          <p className="text-base text-justify">
          While Trade Hit is committed to providing a secure and reliable trading experience, we are not responsible for any loss or damage, including loss of funds or data, that may occur from using the platform. We are not liable for any interruptions or errors in our services, and we encourage users to carefully monitor their trading activities and stay informed about market conditions.
          </p>
        </li>
        <br />
        
      </ul>
    </div>
  </div>
</div>

  <Footer/>
  </>
  )
}
