import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../Modals/modalSlice";
import {
  selectLoggedInUser,
  loginAsync,
  selectLoginStatus,
  selectLoginError,
  clearLoginError,
  resetLoginStatus,
  signupAsync,
  selectSignupStatus,
  selectSignupError,
  clearSignupError,
  resetSignupStatus,
} from "../../auth/AuthSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function LoginModal() {
  const { isOpen, type } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Signup state
  const status2 = useSelector(selectSignupStatus);
  const error2 = useSelector(selectSignupError);

  // Signin state
  const status = useSelector(selectLoginStatus);
  const error = useSelector(selectLoginError);
  const loggedInUser = useSelector(selectLoggedInUser);

  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "", // Added phone number field
  });
  const [message, setMessage] = useState("");

  // Signup effects
  useEffect(() => {
    if (loggedInUser && !loggedInUser?.isVerified) {
      navigate("/verify-otp");
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (error2) {
      toast.error(error2.message);
    }
  }, [error2]);

  useEffect(() => {
    if (status2 === "fulfilled") {
      toast("Welcome! Verify your email to start shopping on mern-ecommerce.");
    }
    return () => {
      dispatch(clearSignupError());
      dispatch(resetSignupStatus());
    };
  }, [status2]);

  // Signin effects
  useEffect(() => {
    if (loggedInUser && loggedInUser?.isVerified) {
      closeDrawer();
    } else if (loggedInUser && !loggedInUser?.isVerified) {
      navigate("/verify-otp");
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (status === "fulfilled" && loggedInUser?.isVerified === true) {
      toast(`Login successful`);
      closeDrawer();
    }
    return () => {
      dispatch(clearLoginError());
      dispatch(resetLoginStatus());
    };
  }, [status]);

  const closeDrawer = () => {
    dispatch(closeModal());
    setIsSignUp(false);
    setIsForgotPassword(false);
    setFormData({ name: "", email: "", password: "", phone: "" }); // Reset phone field
    setMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginSubmit = () => {
    const cred = { phone: formData.phone, password: formData.password };
    dispatch(loginAsync(cred));
    closeDrawer();
  };

  const handleSignupSubmit = () => {
    // Validate phone number
    const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number regex
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    const cred = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone, // Include phone number in credentials
    };
    dispatch(signupAsync(cred));
    closeDrawer();
  };

  const handleForgotPasswordSubmit = () => {
    setMessage(
      "A link has been sent to your email for resetting your password."
    );
  };

  return (
    <>
      <Dialog
        size="xs"
        open={isOpen && type === "login"}
        handler={closeDrawer}
        className="bg-primary shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem] bg-primary">
          <CardBody className="flex flex-col gap-4">
            {message ? (
              <Typography variant="h6" color="black" className="text-center">
                {message}
              </Typography>
            ) : isForgotPassword ? (
              <>
                <Typography variant="h4" color="black">
                  Forgot Password
                </Typography>
                <Typography
                  className="mb-3 font-normal text-black"
                  variant="paragraph"
                >
                  Enter your email to receive a password reset link.
                </Typography>
                <Typography className="-mb-2 text-black" variant="h6">
                  Your Email
                </Typography>
                <Input
                  label="Email"
                  size="lg"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </>
            ) : (
              <>
                <Typography variant="h4" color="black">
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Typography>
                <Typography
                  className="mb-3 font-normal text-black"
                  variant="paragraph"
                >
                  {isSignUp
                    ? "Enter your details to create an account."
                    : "Enter your email and password to Sign In."}
                </Typography>
                {isSignUp && (
                  <>
                    <Typography className="-mb-2 text-black" variant="h6">
                      Your Name
                    </Typography>
                    <Input
                      label="Name"
                      size="lg"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </>
                )}
                <Typography className="-mb-2 text-black" variant="h6">
                  Your Phone Number
                </Typography>
                <Input
                  label="Phone Number"
                  size="lg"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {isSignUp && (
                  <>
                    <Typography className="-mb-2 text-black" variant="h6">
                      Your Email
                    </Typography>
                    <Input
                      label="Email"
                      size="lg"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </>
                )}
                <Typography className="-mb-2 text-black" variant="h6">
                  Your Password
                </Typography>
                <Input
                  label="Password"
                  size="lg"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            {!message && (
              <>
                <Button
                  loading={status === "pending" || status2 === "pending"}
                  type="submit"
                  onClick={
                    isForgotPassword
                      ? handleForgotPasswordSubmit
                      : isSignUp
                      ? handleSignupSubmit
                      : handleLoginSubmit
                  }
                  fullWidth
                  className="bg-ternary"
                >
                  {isForgotPassword
                    ? "Send Reset Link"
                    : isSignUp
                    ? "Sign Up"
                    : "Sign In"}
                </Button>
                {!isForgotPassword && (
                  <Typography
                    variant="small"
                    className="mt-4 flex justify-center text-black"
                  >
                    {isSignUp
                      ? "Already have an account?"
                      : "Don't have an account?"}
                    <Typography
                      as="a"
                      href="#toggle"
                      variant="small"
                      className="ml-1 font-bold cursor-pointer text-ternary hover-underline-animation-black"
                      onClick={() => setIsSignUp(!isSignUp)}
                    >
                      {isSignUp ? "Sign in" : "Sign up"}
                    </Typography>
                  </Typography>
                )}
                {!isSignUp && (
                  <Typography
                    as="a"
                    href="#forgot-password"
                    variant="small"
                    className="mt-2 flex font-bold text-center w-full justify-center text-ternary cursor-pointer"
                    onClick={() => setIsForgotPassword(true)}
                  >
                    <p className="hover-underline-animation-black">
                      Forgot Password?
                    </p>
                  </Typography>
                )}
              </>
            )}
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
