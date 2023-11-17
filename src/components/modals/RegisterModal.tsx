"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import {
  FieldValues,
  FieldError,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";

const RegisterModal = () => {
  // use the register modal from the useRegisterModal hook
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  // set loading state
  const [isloading, setIsLoading] = useState(false);

  // register form data
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // submit handler
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // send the register request
    axios
      .post("/api/register", data)
      .then((res) => {
        toast.success("Account created successfully!");
        // close the modal on success
        registerModal.onClose();
        // open the login modal
        loginModal.onOpen();
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="create an account!" />
      <Input
        id="email"
        label="Email"
        disabled={isloading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="name"
        label="Name"
        disabled={isloading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isloading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const githubRegister = useCallback(() => {
    signIn("github");
  }, []);

  const googleRegister = useCallback(() => {
    signIn("google");
  }, []);

  const loginPush = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => googleRegister()}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => githubRegister()}
      />
      <div className="text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={loginPush}
            className="cursor-pointer hover:underline text-neutral-800"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isloading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
