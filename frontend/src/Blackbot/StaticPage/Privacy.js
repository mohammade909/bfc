import React from "react";
import { Header } from "../Header";
import Footer from "../Footer";

export const Privacy = () => {
  return (
    <>
      <Header />
      <div className="bg-white py-12 ">
        <div className=" mx-auto max-w-7xl px-6">
          <div className="">
            {/* Header */}
            <h1 className="text-4xl font-extrabold text-gray-800  mb-6">
              <span className="text-indigo-500">Privacy Policy</span>
            </h1>
            {/* Section: Introduction */}
            <section className="text-base text-gray-600 mb-8 leading-relaxed">
              <p className="mb-4 ">
                Welcome to{" "}
                <span className="font-semibold text-indigo-500">
                  !At Trade Hit,
                </span>{" "}
                we care about your privacy.
              </p>
              <p>
                This policy explains how we collect, use, and protect your
                personal information when you use our services.
              </p>
            </section>
            {/* Divider */}
            <div className="border-b border-gray-300 my-6" />
            {/* Section: Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
               
                Information We Collect
              </h2>
              <ul className="list-inside list-disc text-gray-600 text-base pl-4 space-y-2">
                <li>
                  <strong>Personal Info:</strong> Your name, email, phone
                  number, and any details you give us when you create an account
                  or contact us.
                </li>
                <li>
                  <strong>Payment Info:</strong> Details about your payments
                  when you deposit or withdraw money.
                </li>
                <li>
                  <strong>Usage Info:</strong> Information about how you use our
                  website, like your IP address, browser type, and which pages
                  you visit.
                </li>
              </ul>
            </section>
            {/* Section: How We Use Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
               
                How We Use Your Information
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                We use your information to improve our services, communicate
                with you about your account and offers, process payments
                securely, and enhance our platform based on how you use it.
              </p>
            </section>
            {/* Section: Data Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
               
                How We Protect Your Information
              </h2>
              <p className="text-gray-600 mb-4 text-base">
                We take your security seriously and use strong measures to
                protect your personal and payment information. While we try our
                best to keep your data safe, please note that no online system
                is completely secure.
              </p>
            </section>
            {/* Section: Account Deletion */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
               
                Sharing Your Information
              </h2>
              <p className="text-gray-600 mb-4 text-base">
                We do not sell or rent your information to anyone. We may share
                your data in these cases:
              </p>
              <ol className="list-decimal list-inside text-base pl-4 text-gray-600 space-y-2">
                <li>
                  With trusted companies that help us run our platform, like
                  payment processors or hosting services.
                </li>
                <li>
                  If we are required to do so by law or to protect our rights.
                </li>
              </ol>
            </section>
            {/* Section: Contact Us */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
               
                Contact Us
              </h2>
              <p className="text-gray-600 mb-4 text-base">
                If you have any questions about this Privacy Policy, you can
                reach us at:
              </p>
              <ul className="list-none pl-0 text-base text-gray-600 space-y-2">
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@bongochat.com.bd"
                    className="text-indigo-500 hover:underline"
                  >
                    support@smartcation.com
                  </a>
                </li>
                <li>
                  <strong>Phone:</strong>+91 100099888
                </li>
              </ul>
            </section>
            {/* Section: Data Deletion Form */}
            <section className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                
                Changes to This Policy
              </h2>
              <p className="text-gray-600 mb-4 text-base">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with a new "Effective Date." Please
                check this page occasionally for updates.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
