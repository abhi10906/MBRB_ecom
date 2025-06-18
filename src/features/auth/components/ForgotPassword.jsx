import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  clearForgotPasswordError,
  clearForgotPasswordSuccessMessage,
  forgotPasswordAsync,
  resetForgotPasswordStatus,
  selectForgotPasswordError,
  selectForgotPasswordStatus,
  selectForgotPasswordSuccessMessage,
} from "../AuthSlice";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const status = useSelector(selectForgotPasswordStatus);
  const error = useSelector(selectForgotPasswordError);
  const successMessage = useSelector(selectForgotPasswordSuccessMessage);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error?.message);
    }
    return () => {
      dispatch(clearForgotPasswordError());
    };
  }, [error]);

  // Handle success
  useEffect(() => {
    if (status === "fullfilled") {
      toast(successMessage?.message);
    }
    return () => {
      dispatch(clearForgotPasswordSuccessMessage());
    };
  }, [status]);

  // Reset status on unmount
  useEffect(() => {
    return () => {
      dispatch(resetForgotPasswordStatus());
    };
  }, []);

  const handleForgotPassword = async (data) => {
    dispatch(forgotPasswordAsync(data));
    reset();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <Card className="w-full max-w-sm">
          <CardBody>
            <form
              onSubmit={handleSubmit(handleForgotPassword)}
              noValidate
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <Typography variant="h5" className="font-semibold">
                  {status === "fullfilled"
                    ? "Email has been sent!"
                    : "Forgot Your Password?"}
                </Typography>
                <Typography className="text-gray-600 text-sm">
                  {status === "fullfilled"
                    ? "Please check your inbox and click on the received link to reset your password"
                    : "Enter your registered email below to receive a password reset link"}
                </Typography>
              </div>

              {status !== "fullfilled" && (
                <>
                  {/* Email Input */}
                  <motion.div whileHover={{ y: -2 }}>
                    <Input
                      {...register("email", {
                        required: "Please enter an email",
                        pattern: {
                          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                          message: "Enter a valid email",
                        },
                      })}
                      label="Enter Email"
                      error={!!errors.email}
                      variant="outlined"
                      className=""
                    />
                    {errors.email && (
                      <Typography className="text-sm text-red-500 mt-1">
                        {errors.email.message}
                      </Typography>
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 1 }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      disabled={status === "pending"}
                      className="h-10"
                    >
                      {status === "pending"
                        ? "Sending..."
                        : "Send Password Reset Link"}
                    </Button>
                  </motion.div>
                </>
              )}
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
