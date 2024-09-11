import { add } from "date-fns";
export const OTP = () => {
  return {
    value: Math.random().toString().substring(2, 7),
    expiresIn: add(new Date(), {
      minutes: 5, // OTP will expire in 5 minutes
    }),
  };
};
