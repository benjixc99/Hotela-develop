/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { Select } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

function CustomSelect({
  label,
  value,
  placeholder,
  data,
  showBorder,
  onChange,
}) {
  const icon = <></>;
  const isMobile = useMediaQuery("(max-width: 767px)"); // Adjusted for mobile view

  return (
    <Select
      variant="unstyled"
      rightSection={icon}
      onChange={onChange}
      label={label}
      value={value}
      placeholder={placeholder}
      data={data}
      comboboxProps={{
        transitionProps: { transition: "pop", duration: 200 },
      }}
      searchable
      limit={5}
      nothingFoundMessage="Nothing found..."
      clearable
      allowDeselect={false}
      p={{ base: 2, sm: 0 }}
      styles={(theme) => ({
        root: {
          borderRight: !isMobile && showBorder ? `1px solid #d1d1d1` : "", // Add right border on non-mobile
          height: isMobile ? "auto" : "50px", // Set height for non-mobile
          display: "flex",
          flexDirection: "column",
          width: isMobile && "100%", // Ensure the root element takes full width
          border: isMobile ? `1px solid ${theme.colors.gray[6]}` : "none", // Add blue border on mobile
        },
        input: {
          border: isMobile ? `1px solid ${theme.colors.blue[6]}` : "none", // Add blue border on mobile
          boxShadow: "none", // Remove shadow
          padding: 0, // Remove padding
          fontWeight: 500,
          marginTop: !isMobile && -7,
          width: "100%",
        },
        label: {
          textAlign: "start", // Align label to start
          marginBottom: 0, // Space between label and input
          alignSelf: !isMobile && "flex-start", // Ensure the label aligns at the start
          color: "#000814", // Label color
        },
        placeholder: {
          color: theme.colors.gray[6], // Placeholder text color
          textAlign: "start", // Align placeholder text to start
        },
        dropdown: {
          borderRadius: "12px",
        },
        option: {
          padding: "10px",
        },
      })}
    />
  );
}

CustomSelect.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  showBorder: PropTypes.bool,
};

export default CustomSelect;
