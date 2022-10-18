import "./styles.css";
import { useMultistepForm } from "./xhooks/useMultistepForm";
import { UserForm } from "./components/form/UseForm";
import { AddressForm } from "./components/form/AdressForm";
import { AccountForm } from "./components/form/AccountForm";
import { useForm } from "react-hook-form";
import { useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
};

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: ""
};

export default function App() {
  const [state, setState] = useState<FormData>(INITIAL_DATA);

  const { handleSubmit } = useForm({ defaultValues: INITIAL_DATA });

  const updateFields = (fields: Partial<FormData>) => {
    setState((st) => {
      return { ...st, ...fields };
    });
  };

  const {
    steps,
    step,
    isFirstStep,
    isLastStep,
    currentStepIndex,
    back,
    next
  } = useMultistepForm([
    <UserForm {...state} updateFields={updateFields} />,
    <AddressForm {...state} updateFields={updateFields} />,
    <AccountForm {...state} updateFields={updateFields} />
  ]);

  const onHandleSubmit = async () => {
    if (!isLastStep && next) return next();
    console.log(state);
  };
  return (
    <div
      style={{
        position: "relative",
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: ".5rem",
        fontFamily: "Arial",
        maxWidth: "max-content"
      }}
    >
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
          {currentStepIndex + 1}/{steps.length}
        </div>
        {step}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifyContent: "flex-end"
          }}
        >
          {!isFirstStep && (
            <button type="button" onClick={back}>
              {" "}
              back{" "}
            </button>
          )}
          <button type="submit">{!isLastStep ? "next" : "finish"}</button>
        </div>
      </form>
    </div>
  );
}
