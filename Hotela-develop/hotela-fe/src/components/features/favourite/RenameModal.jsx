import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Group, Modal, TextInput } from "@mantine/core";

function RenameModal({ openedRename, onClose, selectedName, onSave }) {
  const [inputValue, setInputValue] = useState(selectedName);
  console.log(inputValue);
  const [error, setError] = useState("");

  const handleSave = () => {
    if (inputValue.trim() === "") {
      setError("Name cannot be empty.");
    } else {
      setError("");
      if (onSave) onSave(inputValue); // Pass the new name to onSave
      onClose(); // Close the modal after saving
    }
  };

  return (
    <Modal
      opened={openedRename}
      onClose={onClose}
      title={`Rename ${selectedName}`}
      maw={600}
      centered
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <TextInput
          label="Name your list"
          placeholder="Enter name"
          defaultValue={selectedName}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError(false);
          }}
          error={error} // Display error message
        />
        <Group gap="xs" grow mt={15}>
          <Button variant="default" radius="xl" onClick={onClose}>
            Cancel
          </Button>
          <Button radius="xl" type="submit">
            Save
          </Button>
        </Group>
      </form>
    </Modal>
  );
}

RenameModal.propTypes = {
  openedRename: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedName: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired, // Ensure onSave is required
};

export default RenameModal;
