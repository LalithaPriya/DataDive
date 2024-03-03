import "./iconselectorModal.css";
import React from "react";
import { Button, Flex } from "@aws-amplify/ui-react";
import Modal from "react-modal";

const IconSelectorModal = ({
  modalVisible,
  setModalVisible,
  selectedIcons,
  handleIconSelect,
  handleSelectAll,
  handleReset,
  data,
  title,
}) => {
  return (
    <Modal
      isOpen={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      contentLabel="Select Icons"
      className="modal"
      appElement={document.getElementById("app")}
    >
      {console.log("in modal, ", data)}
      <h2 style={{ marginLeft: "4px", marginBottom: "5px" }}>{title}</h2>
      <Flex
        direction="row"
        alignItems="left"
        justifyContent="space-between"
        marginBottom="1rem"
      >
        <div style={{ flex: 1 }}>
          <Button className="btn" onClick={handleSelectAll}>
            Select All
          </Button>
          <Button className="btn" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </Flex>
      <div className="icon-container">
        {data.map((item) => (
          <div
            key={item.id}
            className={item.selected ? "icon selected" : "icon"}
            onClick={() => handleIconSelect(item.id)}
          >
            {/* <img src={icon.imageUrl} alt={icon.label} /> */}
            {item.label}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default IconSelectorModal;
