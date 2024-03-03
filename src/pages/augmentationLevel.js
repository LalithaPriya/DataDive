import "./augmentationToggle.css";
import React, { useState, useEffect } from "react";
import { Input, Button, SearchField } from "@aws-amplify/ui-react";
import IconSelectorModal from "./iconselectorModal.js";

const augmentationLevel = [
  { id: 1, label: "1", selected: false },
  { id: 2, label: "2", selected: false },
  { id: 3, label: "3", selected: false },
  { id: 4, label: "4", selected: false },
  { id: 5, label: "5", selected: false },
];

const AugmentationLevel = ({ augmentations }) => {
  const [selectedAugmented, setSelectedAugmented] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const selectedAugmentations = augmentationLevel.map((aug) => ({
      ...aug,
      selected: augmentations.includes(aug.id),
    }));
    setSelectedAugmented(selectedAugmentations);
  }, [augmentations]);

  const handleIconSelect = (id) => {
    setSelectedAugmented((prevSelectedAugmented) => {
      const updatedAugmented = prevSelectedAugmented.map((aug) => {
        if (aug.id === id) {
          return {
            ...aug,
            selected: !aug.selected, // Toggle the selected state
          };
        }
        return aug;
      });
      return updatedAugmented;
    });
  };

  const handleSelectAll = () => {
    const allSelectedAug = augmentationLevel.map((aug) => ({
      ...aug,
      selected: true,
    }));
    setSelectedAugmented(allSelectedAug);
  };

  const handleReset = () => {
    setSelectedAugmented((prevSelectedAugmented) =>
      prevSelectedAugmented.map((aug) => ({
        ...aug,
        selected: false,
      }))
    );
  };
  

  return (
    <div>
      <Button
        className="modal-button mt15"
        onClick={() => setModalVisible(true)}
      >
        Augmentation Level
      </Button>
      {console.log("in the toggle level ", augmentations, selectedAugmented)}
      <IconSelectorModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedIcons={selectedAugmented}
        handleIconSelect={handleIconSelect}
        handleSelectAll={handleSelectAll}
        handleReset={handleReset}
        data={selectedAugmented}
      />
    </div>
  );
};

export default AugmentationLevel;
