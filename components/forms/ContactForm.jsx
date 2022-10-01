import React, { useState } from "react";
import { useForm } from "react-hook-form";
import callApi from "../../lib/callApi";

const ContactForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [submitState, setSubmitState] = useState({
    loading: false,
    submitted: false,
    error: false,
  });
  const onSubmit = async (values) => {
    try {
      setSubmitState({ ...submitState, loading: true, error: false });
      await callApi("/api/form-submissions/create", {
        method: "POST",
        body: values,
      });
      setSubmitState({ ...submitState, submitted: true, loading: false });
    } catch (error) {
      setSubmitState({ ...submitState, error, loading: false });
    }
  };

  const handleReset = () => {
    reset();
    setSubmitState({ ...submitState, submitted: false, error: false });
  };

  if (submitState.submitted) {
    return (
      <div className="flex-col fai-c">
        <div>Thank you for your message. We'll get back to you soon.</div>
        <div className="mt-l border std-div">
          <button onClick={handleReset}>Reset Form</button>
        </div>
      </div>
    );
  }

  return (
    <form className="w-full max-w-[300px]" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name" className="block">
        Name
      </label>
      <input
        type="text"
        className="w-full"
        id="name"
        {...register("name", {
          required: "Required",
        })}
      />
      <label htmlFor="email" className="block">
        Email
      </label>

      <input
        type="email"
        className="w-full"
        id="email"
        {...register("email", {
          required: "Required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address",
          },
        })}
      />
      <div className={``}>{errors.email && errors.email.message}</div>

      <label htmlFor="message" className="block">
        Message
      </label>
      <textarea
        id="message"
        className="w-full bg-black rounded p-2"
        rows="8"
        {...register("message", {
          // validate: value => value !== "admin" || "Nice try!"
        })}
      />
      {errors.message && errors.message.message}

      <div className="">
        {submitState.error &&
          "There was an error submitting your message. Please try again."}
      </div>
      <button
        type="submit"
        className="border w-full p-1 rounded bg-emerald-700/75 my-2"
        disabled={submitState.loading}
      >
        {submitState.loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default ContactForm;
