import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Group, Modal, TextInput } from "@mantine/core";

function CreateNewListModal({ openedCreateNewList, onClose, onSave }) {
  const [inputValue, setInputValue] = useState("");
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
      opened={openedCreateNewList}
      onClose={onClose}
      title={`Create new list`}
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
          placeholder="Enter a list name"
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
            Create list
          </Button>
        </Group>
      </form>
    </Modal>
  );
}

CreateNewListModal.propTypes = {
  openedCreateNewList: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedName: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired, // Ensure onSave is required
};

export default CreateNewListModal;
