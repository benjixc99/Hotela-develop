import { useState } from "react";
import { Box, Button, TextInput, Title, Text } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { useResetPasswordMutation } from "../../Store/Slices/authenticationSlice";
import { notifications } from "@mantine/notifications";
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";

function ResetPassword() {
  const { id } = useParams();
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const isMobile = useMediaQuery("(max-width: 767px)"); // Adjusted for mobile view
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.currentTarget.value);
    if (error) {
      setError("");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.currentTarget.value);
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
      } else {
        setError("");
        await resetPassword({
          passwordToken: id,
          newPassword,
        }).unwrap();
        notifications.show({
          title: "Password changed successfully",
          radius: "lg",
          message: "",
          autoClose: 5000,
          color: "teal",
          icon: <IoMdCheckmarkCircle fontSize={18} />,
        });
        navigate("/");
      }
    } catch (err) {
      notifications.show({
        title: "Error",
        message: `${err.data}`,
        radius: "lg",
        color: "red",
        icon: <IoMdCloseCircle fontSize={18} />,
      });
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
          fontWeight: 600,
          textAlign: "center",
          margin: "0 auto",
          fontFamily: "Inter, sans-serif",
        }}>
        Reset your password
      </Title>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
        }}>
        <TextInput
          label='New Password'
          placeholder='Enter your new password'
          type='password'
          value={newPassword}
          onChange={handlePasswordChange}
          required
          withAsterisk={false}
          style={{ fontFamily: "Inter, sans-serif" }}
        />
        <TextInput
          label='Confirm Password'
          placeholder='Confirm your new password'
          type='password'
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
          withAsterisk={false}
          error={error ? "Passwords do not match" : null}
          style={{ fontFamily: "Inter, sans-serif" }}
          aria-invalid={!!error}
        />
        {error && (
          <Text
            color='red'
            size='sm'
            style={{ fontFamily: "Inter, sans-serif" }}>
            {error}
          </Text>
        )}
        <Button
          type='submit'
          loading={isLoading}
          style={{
            height: "50px",
            fontSize: "18px", // Adjusted font size for better balance
            borderRadius: "25px",
            backgroundColor: "#007BFF",
            color: "#fff",
            fontFamily: "Inter, sans-serif",
            transition: "background-color 0.3s, transform 0.3s",
            width: "100%", // Full width button
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#0056b3";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#007BFF";
            e.currentTarget.style.transform = "scale(1)";
          }}>
          Reset Password
        </Button>
      </form>
    </Box>
  );
}

export default ResetPassword;
