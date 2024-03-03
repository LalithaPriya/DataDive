import "./augmentationToggle.css";
import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  SearchField,
  Text,
  Flex,
  Heading,
  View,
  Divider,
  ScrollView,
  Badge,
  Collection
} from "@aws-amplify/ui-react";
import IconSelectorModal from "./iconselectorModal.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

const AugmentationToggle = ({
  augmentations,
  setIdList,
  data,
  label,
  onUpdateAugmentations,
}) => {
  const [selectedAugmented, setSelectedAugmented] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const selectedAugmentations =
      data &&
      data.map((aug) => ({
        ...aug,
        selected: augmentations.includes(aug.id),
      }));
    setSelectedAugmented(selectedAugmentations);
  }, [augmentations]);

  const handleIconSelect = (id) => {
    setSelectedAugmented((prevSelectedAugmented) => {
      const updatedAugmented = prevSelectedAugmented.map((aug) => {
        if (aug.id === id) {
          const updatedAug = {
            ...aug,
            selected: !aug.selected,
          };
          const updatedAugmentations = aug.selected
            ? augmentations.filter((item) => item !== id)
            : [...augmentations, id];
          onUpdateAugmentations(updatedAugmentations);
          return updatedAug;
        }
        return aug;
      });
      return updatedAugmented;
    });
  };

  const handleSelectAll = () => {
    const allSelectedAug = data.map((aug) => ({
      ...aug,
      selected: true,
    }));
    setSelectedAugmented(allSelectedAug);
    const updatedAugmentations = data.map((aug) => aug.id);
    onUpdateAugmentations(updatedAugmentations);
  };

  const handleReset = () => {
    setSelectedAugmented((prevSelectedAugmented) =>
      prevSelectedAugmented.map((aug) => ({
        ...aug,
        selected: false,
      }))
    );
    onUpdateAugmentations([]);
  };

  const getLabelById = (mydata, id) => {
    const item = mydata.find((item) => item.id === id);
    return item ? item.label : null;
  };
  return (
    <Flex direction="row" alignItems="center">
      <div>
        <Button
          // className="modal-button mt15"
          className="minWidth"
          minWidth="200px"
          size="small"
          onClick={() => setModalVisible(true)}
        >
          {label} &nbsp;<FontAwesomeIcon icon={faAngleDoubleRight} />
        </Button>
        {console.log("in the toggle  ", augmentations, selectedAugmented, data)}
        <IconSelectorModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedIcons={selectedAugmented}
          handleIconSelect={handleIconSelect}
          handleSelectAll={handleSelectAll}
          handleReset={handleReset}
          data={selectedAugmented}
          title={label}
        />
      </div>
      <ScrollView
        className="scroll-view"
        width="100%"
        orientation="horizontal"
        showsIndicators={false}
      >
        <Collection
          items={augmentations}
          type="list"
          direction="row"
          gap="10px"
          wrap="nowrap"
          searchNoResultsFound={
            <div>
              <Badge>None Selected</Badge>
            </div>
          }
        >
          {(item, index) => (
            <Badge alignItems="center">{getLabelById(data, item)}</Badge>
          )}
        </Collection>
      </ScrollView>
    </Flex>
  );
};

export default AugmentationToggle;
