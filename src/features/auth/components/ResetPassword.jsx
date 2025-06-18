import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearResetPasswordError,
  clearResetPasswordSuccessMessage,
  resetPasswordAsync,
  resetResetPasswordStatus,
  selectResetPasswordError,
  selectResetPasswordStatus,
  selectResetPasswordSuccessMessage,
} from '../AuthSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MotionConfig, motion } from 'framer-motion';
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from '@material-tailwind/react';

export const ResetPassword = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const status = useSelector(selectResetPasswordStatus);
  const error = useSelector(selectResetPasswordError);
  const successMessage = useSelector(selectResetPasswordSuccessMessage);
  const { userId, passwordResetToken } = useParams();
  const navigate = useNavigate();

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    return () => {
      dispatch(clearResetPasswordError());
    };
  }, [error]);

  // Handle success
  useEffect(() => {
    if (status === 'fullfilled') {
      toast(successMessage?.message);
      navigate('/login');
    }
    return () => {
      dispatch(clearResetPasswordSuccessMessage());
    };
  }, [status]);

  // Reset status on unmount
  useEffect(() => {
    return () => {
      dispatch(resetResetPasswordStatus());
    };
  }, []);

  const handleResetPassword = async (data) => {
    const cred = { ...data, userId: userId, token: passwordResetToken };
    delete cred.confirmPassword;
    dispatch(resetPasswordAsync(cred));
    reset();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardBody>
          <form
            onSubmit={handleSubmit(handleResetPassword)}
            noValidate
            className="flex flex-col gap-6"
          >
            {/* Header */}
            <div className="flex flex-col gap-1">
              <Typography variant="h4" className="font-bold">
                Reset Password
              </Typography>
              <Typography className="text-gray-600 text-sm">
                Please enter and confirm your new password
              </Typography>
            </div>

            {/* Password Fields */}
            <MotionConfig whileHover={{ y: -2 }}>
              <motion.div>
                <Input
                  type="password"
                  {...register('password', {
                    required: 'Please enter a password',
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                      message:
                        'At least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters.',
                    },
                  })}
                  label="New Password"
                  error={!!errors.password}
                  variant="outlined"
                />
                {errors.password && (
                  <Typography className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </Typography>
                )}
              </motion.div>

              <motion.div>
                <Input
                  type="password"
                  {...register('confirmPassword', {
                    required: 'Please confirm the password',
                    validate: (value, formValues) =>
                      value === formValues.password ||
                      "Passwords don't match",
                  })}
                  label="Confirm New Password"
                  error={!!errors.confirmPassword}
                  variant="outlined"
                />
                {errors.confirmPassword && (
                  <Typography className="text-sm text-red-500 mt-1">
                    {errors.confirmPassword.message}
                  </Typography>
                )}
              </motion.div>
            </MotionConfig>

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
              <Button
                type="submit"
                fullWidth
                disabled={status === 'pending'}
                className="h-12"
              >
                {status === 'pending' ? 'Processing...' : 'Reset Password'}
              </Button>
            </motion.div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
