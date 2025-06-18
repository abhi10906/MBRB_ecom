import React, { useEffect } from "react";
import {
  Card,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearOtpVerificationError,
  clearResendOtpError,
  clearResendOtpSuccessMessage,
  resendOtpAsync,
  resetOtpVerificationStatus,
  resetResendOtpStatus,
  selectLoggedInUser,
  selectOtpVerificationError,
  selectOtpVerificationStatus,
  selectResendOtpError,
  selectResendOtpStatus,
  selectResendOtpSuccessMessage,
  verifyOtpAsync,
} from "../AuthSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const OtpVerfication = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const resendOtpStatus = useSelector(selectResendOtpStatus);
  const resendOtpError = useSelector(selectResendOtpError);
  const resendOtpSuccessMessage = useSelector(selectResendOtpSuccessMessage);
  const otpVerificationStatus = useSelector(selectOtpVerificationStatus);
  const otpVerificationError = useSelector(selectOtpVerificationError);

  // Redirect logic
  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    } else if (loggedInUser?.isVerified) {
      navigate("/");
    }
  }, [loggedInUser]);

  const handleSendOtp = () => {
    const data = { user: loggedInUser?._id };
    dispatch(resendOtpAsync(data));
  };

  const handleVerifyOtp = (data) => {
    const cred = { ...data, userId: loggedInUser?._id };
    dispatch(verifyOtpAsync(cred));
  };

  // Resend OTP error handler
  useEffect(() => {
    if (resendOtpError) {
      toast.error(resendOtpError.message);
    }
    return () => {
      dispatch(clearResendOtpError());
    };
  }, [resendOtpError]);

  // Resend OTP success handler
  useEffect(() => {
    if (resendOtpSuccessMessage) {
      toast(resendOtpSuccessMessage.message);
    }
    return () => {
      dispatch(clearResendOtpSuccessMessage());
    };
  }, [resendOtpSuccessMessage]);

  // OTP verification error handler
  useEffect(() => {
    if (otpVerificationError) {
      toast.error(otpVerificationError.message);
    }
    return () => {
      dispatch(clearOtpVerificationError());
    };
  }, [otpVerificationError]);

  // OTP verification status handler
  useEffect(() => {
    if (otpVerificationStatus === "fullfilled") {
      toast("Email verified! We are happy to have you here");
      dispatch(resetResendOtpStatus());
    }
    return () => {
      dispatch(resetOtpVerificationStatus());
    };
  }, [otpVerificationStatus]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Card shadow={true} className="p-8 space-y-6 w-full max-w-md">
        <Typography variant="h5" className="font-semibold text-center">
          Verify Your Email Address
        </Typography>

        {resendOtpStatus === "fullfilled" ? (
          <form
            onSubmit={handleSubmit(handleVerifyOtp)}
            className="space-y-4 w-full"
          >
            <div>
              <Typography className="text-gray-600 text-center">
                Enter the 4-digit OTP sent to
              </Typography>
              <Typography className="font-semibold text-gray-600 text-center">
                {loggedInUser?.email}
              </Typography>
            </div>
            <div className="space-y-1">
              <Input
                {...register("otp", {
                  required: "OTP is required",
                  minLength: { value: 4, message: "Enter a 4-digit OTP" },
                })}
                type="number"
                size="lg"
                error={!!errors?.otp}
                label="OTP"
              />
              {errors?.otp && (
                <Typography className="text-red-500 text-sm">
                  {errors.otp.message}
                </Typography>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={otpVerificationStatus === "pending"}
            >
              {otpVerificationStatus === "pending" ? "Verifying..." : "Verify"}
            </Button>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <Typography className="text-gray-600">
              We will send you an OTP to
            </Typography>
            <Typography className="font-semibold text-gray-600">
              {loggedInUser?.email}
            </Typography>
            <Button
              onClick={handleSendOtp}
              className="w-full"
              disabled={resendOtpStatus === "pending"}
            >
              {resendOtpStatus === "pending" ? "Sending..." : "Get OTP"}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
