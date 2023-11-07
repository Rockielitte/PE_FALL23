import { Box, Button, Sheet } from "@mui/joy";
import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
const NavBar = () => {
  const navLink = useMemo(
    () => [
      {
        name: "Home",
        linkTo: "/",
      },
      {
        name: "Dashboard",
        linkTo: "/dashboard",
      },
      {
        name: "Contact",
        linkTo: "/contact",
      },
      {
        name: "Add",
        linkTo: "/add",
      },
    ],
    []
  );

  return (
    <Box>
      <Sheet
        color={"success"}
        variant="soft"
        sx={(theme) => ({
          display: "flex",
          gap: "8px",
          alignItems: "center",
          py: "10px",
          px: "10px",
          boxShadow: theme.vars.shadow.lg,
        })}
      >
        {navLink.map((item) => (
          <Button
            variant="plain"
            color="success"
            key={item.name}
            component={RouterLink}
            to={item.linkTo}
          >
            {item.name}
          </Button>
        ))}
      </Sheet>
    </Box>
  );
};

export default NavBar;
