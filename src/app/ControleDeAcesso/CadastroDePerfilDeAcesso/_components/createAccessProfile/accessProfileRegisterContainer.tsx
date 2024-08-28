"use client";
import { AccessProfileRegister } from "./accessProfileRegister";
import { useAccessProfileForm } from "./useAccessProfileForm";

export default function AccessProfileRegisterContainer() {
  const { form, onSubmit, selectedFrameworks, setSelectedFrameworks } =
    useAccessProfileForm();

  return (
    <>
      <AccessProfileRegister
        form={form}
        onSubmit={onSubmit}
        selectedFrameworks={selectedFrameworks}
        setSelectedFrameworks={setSelectedFrameworks}
      />
    </>
  );
}
