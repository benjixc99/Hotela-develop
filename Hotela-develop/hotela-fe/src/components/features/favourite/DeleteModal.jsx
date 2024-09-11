import PropTypes from "prop-types";
import { Button, Group, Modal, Text } from "@mantine/core";

function DeleteModal({ openedDelete, onClose, selectedName, onDelete }) {
  return (
    <Modal
      opened={openedDelete}
      onClose={onClose}
      title={`Delete ${selectedName}`}
      maw={600}
      centered
    >
      <Text fz={13} ta={"center"}>
        Deleting this list will also delete all the stays you have saved to this
        list.
      </Text>

      <Group gap="xs" grow mt={15}>
        <Button radius="xl" onClick={onClose} variant="default">
          Cancel
        </Button>
        <Button radius="xl" onClick={onDelete} bg={"red"}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
}

DeleteModal.propTypes = {
  openedDelete: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedName: PropTypes.string.isRequired,
  onDelete: PropTypes.string.isRequired,
};

export default DeleteModal;
