import React from "react";
import { useForm } from "react-hook-form";
import { axiosi } from "../config/axios.js";
import { toast } from "react-toastify";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosi.post("users/contact", data);

      if (res.status === 200) {
        toast.success("Your message has been sent successfully!");
        reset();
      } else {
        toast.error("Failed to send your message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);

      if (error.response) {
        toast.error(
          error.response.data?.message || "An error occurred. Please try again."
        );
      } else if (error.request) {
        toast.error(
          "No response from the server. Please check your connection."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <section className="text-gray-600 body-font relative bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side: Contact Information */}
          <div className="lg:w-1/3 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-6">
              We'd love to hear from you! Whether you have a question, feedback,
              or just want to say hello, feel free to reach out.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase">
                  Address
                </h3>
                <p className="text-gray-600">
                  GVM Road ,Girdhar Market, Near Bus Stand Sardarshaher ,Churu,
                  Rajasthan, India, 331403
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase">
                  Email
                </h3>
                <a
                  className="text-indigo-500 hover:text-indigo-600"
                >
                  enquiry@mbrb.in , Helpdesk@mbrb.in
                </a>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase">
                  Phone
                </h3>
                <p className="text-gray-600">6350127930 , 01564-4456395</p>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:w-2/3 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className="mt-1 p-2 block w-full rounded-md border-teranary shadow-sm bg-ternary/10 sm:text-sm"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="mt-1 p-2 block w-full rounded-md border-teranary shadow-sm bg-ternary/10 sm:text-sm"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register("subject", { required: "Subject is required" })}
                  className="mt-1 p-2 block w-full rounded-md border-teranary shadow-sm bg-ternary/10 sm:text-sm"
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  {...register("message", { required: "Message is required" })}
                  className="mt-1 p-2 block w-full rounded-md border-teranary shadow-sm bg-ternary/10 sm:text-sm"
                  rows="4"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-ternary text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
