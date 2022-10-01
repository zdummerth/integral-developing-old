import React, { useState } from "react";
import { useForm } from "react-hook-form";
import callApi from "../../lib/callApi";

const ContactForm = ({ inputs }) => {
  // console.log({ inputs });
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
    console.log(values);
    // try {
    //   setSubmitState({ ...submitState, loading: true, error: false });
    //   await callApi("/api/form-submissions/create", {
    //     method: "POST",
    //     body: values,
    //   });
    //   setSubmitState({ ...submitState, submitted: true, loading: false });
    // } catch (error) {
    //   setSubmitState({ ...submitState, error, loading: false });
    // }
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
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      {inputs.map((input) => {
        switch (input.tag) {
          case "input": {
            return (
              <div key={JSON.stringify(input)}>
                <label htmlFor={input.props.id} className="block mt-2 mb-1">
                  {input.label}
                </label>
                <input
                  {...input.props}
                  {...register(input.props.id, {
                    required: input.required,
                  })}
                />
                <div className={`text-red-700`}>
                  {errors[input.props.id] && errors[input.props.id].message}
                </div>
              </div>
            );
          }
          case "textarea": {
            return (
              <div key={JSON.stringify(input)}>
                <label htmlFor={input.props.id} className="block mt-2 mb-1">
                  {input.label}
                </label>
                <textarea
                  {...input.props}
                  {...register(input.props.id, {
                    required: input.required,
                  })}
                />
              </div>
            );
          }
        }
      })}
      <div className="">
        {submitState.error &&
          "There was an error submitting your message. Please try again."}
      </div>
      <button
        type="submit"
        className="w-full p-1 rounded bg-emerald-700/75 my-2"
        disabled={submitState.loading}
      >
        {submitState.loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default ContactForm;
