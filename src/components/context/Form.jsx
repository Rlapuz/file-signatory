"use client";

import { useRef } from "react";

import React from "react";

export const Form = ({ action, ...props }) => {
  const formRef = useRef();

  async function handleAction(formdata) {
    await action(formdata);
    formRef.current.reset();
  }

  return (
    <>
      <form
        {...props}
        ref={formRef}
        action={handleAction}
      />
    </>
  );
};
