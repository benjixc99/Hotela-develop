import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function AppLayout() {
  return (
    <>
      <AppShell
        px={{ base: 10, sm: 80 }}
        styles={{
          main: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <AppShell.Header
          px={{ base: 10 }}
          bd={0}
          mx="auto"
          style={{ width: "100%", maxWidth: "1200px" }}
        >
          <Header />
        </AppShell.Header>

        <AppShell.Main
          mt={70}
          mx="auto"
          style={{ width: "100%", maxWidth: "1200px" }}
        >
          <Outlet />
        </AppShell.Main>
      </AppShell>

      <Footer />
    </>
  );
}

export default AppLayout;
