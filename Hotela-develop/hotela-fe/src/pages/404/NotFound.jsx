import { Link } from "react-router-dom";
import { Box, Button, Center, Text, Title } from "@mantine/core";

function NotFound() {
  return (
    <Box
      h={"80vh"}
      ff={"Inter, sans-serif"}
      style={{
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        c="#000814"
        maw={"500px"}
        m={"0 20px"}
        ta={"center"}
        style={{
          borderRadius: "10px",
        }}
      >
        <Title order={1} style={{ fontSize: "6rem", marginBottom: "20px" }}>
          404
        </Title>
        <Title order={2} style={{ fontSize: "2rem", marginBottom: "20px" }}>
          Page Not Found
        </Title>
        <Text style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
          Sorry, the page you are looking for does not exist. How about booking
          a room instead?
        </Text>
        <Center>
          <Button
            component={Link}
            to="/"
            size="lg"
            style={{
              backgroundColor: "#007BFF",
              color: "#fff",
              borderRadius: "25px",
              height: "45px",
              fontSize: "1rem",
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
            }}
          >
            Go to Homepage
          </Button>
        </Center>
      </Box>
    </Box>
  );
}

export default NotFound;
