import React, { useState } from "react";
import { Input, Button } from "@aws-amplify/ui-react";
import Modal from "react-modal";

const ExportDatasetModal = ({ modalVisible, setModalVisible, handleSelectAll }) => {
  const [providedName, setProvidedName] = useState('');


  return (
    <Modal
      className="modal"
      isOpen={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      contentLabel="Export Dataset Modal"
    >
      <h2>Export Dataset</h2>
      <Input
        type="text"
        placeholder="Give your export file a name..."
          value={providedName}
          onChange={(e) => setProvidedName(e.target.value)}
          onKeyPress={() => {}}
      />
      <Button className="btn1" onClick={() => handleSelectAll(providedName)} >Export </Button>
    </Modal>
  );
};

export default ExportDatasetModal;
