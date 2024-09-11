import { Box, Button, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useResendOTPMutation } from "../../Store/Slices/authenticationSlice";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [resendOTP, { isLoading }] = useResendOTPMutation();
  const isMobile = useMediaQuery("(max-width: 767px)"); // Adjusted for mobile view
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.currentTarget.value);
    if (error) {
      setError("");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!validateEmail(email)) {
        setError("Invalid email address");
      } else {
        setError("");
        // Proceed to the next step or close the modal
        await resendOTP({ email }).unwrap();
        navigate("/ResetPasswordOTP");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: !isMobile && "0 4px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        width: "100%",
      }}>
      <Title
        order={2}
        style={{
          marginBottom: "10px",
        }}>
        Forgot Password
      </Title>

      <Text style={{ marginBottom: "10px" }}>
        Enter your email to reset your password
      </Text>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <TextInput
          label='Email Address'
          placeholder='Enter your email address'
          value={email}
          onChange={handleEmailChange}
          error={error ? error : null}
          required
          aria-invalid={!!error}
          withAsterisk={false}
        />

        <Button
          type='submit'
          loading={isLoading}
          style={{
            height: "50px",
            fontSize: "20px",
            borderRadius: "25px",
            backgroundColor: "#007BFF",
            color: "#fff",
            fontFamily: "Inter, sans-serif",
            transition: "background-color 0.3s, transform 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#0056b3";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#007BFF";
            e.currentTarget.style.transform = "scale(1)";
          }}>
          Continue
        </Button>
      </form>
    </Box>
  );
}

export default ForgotPassword;
