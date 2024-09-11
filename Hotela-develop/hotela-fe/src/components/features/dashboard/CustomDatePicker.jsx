import PropTypes from "prop-types";
import { DatePickerInput } from "@mantine/dates";
import { Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

function CustomDatePicker({
  label,
  value,
  placeholder,
  onChange,
  checkInData,
}) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  // Add one day to checkInData for the minDate of the Check Out
  const nextDay = new Date(checkInData);
  if (checkInData) {
    nextDay.setDate(checkInData.getDate() + 1);
  }

  console.log(checkInData);

  return (
    <Flex
      w={{ base: "100%", sm: 110 }}
      p={{ base: 2, sm: 0 }}
      style={(theme) => ({
        borderRight: !isMobile && `1px solid ${theme.colors.blue[6]}`,
        height: isMobile ? "auto" : "50px",
        flexDirection: "column",
        border: isMobile ? `1px solid ${theme.colors.blue[6]}` : "",
      })}
    >
      <DatePickerInput
        value={value}
        onChange={onChange}
        label={label}
        minDate={label === "Check In" ? new Date() : nextDay}
        valueFormat="YYYY MMM DD"
        placeholder={placeholder}
        variant="unstyled"
        disabled={
          label === "Check out" &&
          (checkInData === null || checkInData === undefined)
        }
        styles={(theme) => ({
          input: {
            boxShadow: "none",
            padding: 0,
            marginTop: !isMobile && -7,
            fontWeight: 500,
            width: "100%",
            border: isMobile ? `1px solid ${theme.colors.blue[6]}` : "none",
          },
          label: {
            textAlign: "start",
            marginBottom: 0,
            alignSelf: "flex-start",
            width: "100%",
            color: "#000814",
          },
          placeholder: {
            color: theme.colors.gray[5],
            textAlign: "start",
          },
        })}
      />
    </Flex>
  );
}

CustomDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  checkInData: PropTypes.instanceOf(Date),
};

export default CustomDatePicker;
