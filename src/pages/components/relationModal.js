import React, { useEffect, useState } from "react";
import { ScrollView, Flex, Button, Image, View } from "@aws-amplify/ui-react";
import Modal from "react-modal";
import { fetchOriginalClassImages, fetchDifferentAugVariantsOfCurrentImage, fetchDifferentAugLevelVariantsOfCurrentImage } from './fetchImages.js';
import { Label, Badge, Heading } from "@aws-amplify/ui-react"; // Assuming these are imported correctly
import { IdToClassName } from "../../data.js"; // Ensure this is the correct path to your data file

const idToLabels = {
  0: "Origl", 1: "G-Noise", 2: "S-Noise", 3: "G-Blur", 4: "D-Blur", 5: "Brigh", 6: "Pixel", 7: "Contr", 8: "JpegC"
};

const RelationModal = ({
  modalVisible, setModalVisible, image, onSelectionComplete
}) => {
  const [originalClassImages, setOriginalClassImages] = useState([]);
  const [augVariants, setAugVariants] = useState([]);
  const [augLevelVariants, setAugLevelVariants] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    if (image) {
      setOriginalClassImages(fetchOriginalClassImages(image));
      setAugVariants(fetchDifferentAugVariantsOfCurrentImage(image));
      setAugLevelVariants(fetchDifferentAugLevelVariantsOfCurrentImage(image));
    }
  }, [image]);

  const handleImageClick = (img) => {
    setSelectedImages((prevSelected) => {
      const isSelected = prevSelected.find(selectedImg => selectedImg.filePath === img.filePath);
      if (isSelected) {
        return prevSelected.filter(selectedImg => selectedImg.filePath !== img.filePath);
      } else {
        return [...prevSelected, img];
      }
    });
  };

  const handleAddToSet = () => {
    onSelectionComplete(selectedImages);
    setModalVisible(false);
  };

  const isSelectedImage = (img) => {
    return selectedImages.some(selectedImg => selectedImg.filePath === img.filePath);
  };

  if (!image) {
    return <div></div>;
  }

const renderImageView = (img, index) => {
  const isSelected = isSelectedImage(img);
  return (
    <View key={index} position="relative" onClick={() => handleImageClick(img)}>
      <img src={`/dataset/${img.filePath}`} alt={`Image ${index}`} loading="lazy" 
        style={{ 
           width: "100%", 
           height: "200px", 
           objectFit: 'cover', 
           borderRadius: '5px', 
           border: isSelected ? '5px solid blue' : 'none' // Conditional border style based on selection
        }} 
      />
      <Flex direction="column" alignItems="center" gap="5px" marginTop="5px">
        <Label>{`${IdToClassName[img.classId]}`}</Label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge variation="info">{`${['train','val','test'][img.setting_id]}`}</Badge>
          <Badge variation="success">{`${idToLabels[img.augId]} x ${img.aug_level}`}</Badge>
        </div>
      </Flex>
    </View>
  );
};

  return (
    <Modal
      isOpen={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      contentLabel="Relationship Explorer"
      className="modal bigmodal"
      appElement={document.getElementById("app") || document.body}
      style={{
            'min-height':'80vh!important',
            'min-width':'80vw!important'
      }}
    >
      <h2 style={{'position':'absolute', 'top':'30px', 'left':'30px'}}>{"Relationship Explorer"}</h2>
      <Flex direction="row" justifyContent="center" alignItems="start" gap="small">
        <View width="300px" height="300px" padding="small">
          <Image src={'/dataset/' + image.filePath} alt={`Input Image`} minHeight='350px' minWidth='350px' position='absolute' left='45px' top='215px' />
        </View>
        <Flex direction="row" gap="small"> {/* Encapsulate each segment (Heading + ScrollView) in a Flex container */}
          
          <View> {/* Class members segment */}
            <Heading marginBottom='10px'>Class members</Heading>
            <ScrollView orientation='vertical' style={{ maxHeight: '580px' }} width='200px' className="scroll-view">
              <Flex direction="column" gap="small">
                {originalClassImages.map(renderImageView)}
              </Flex>
            </ScrollView>
          </View>

          <View> {/* Augmentation Level Variants segment */}
            <Heading marginBottom='10px'>Augmentation Level Variants</Heading>
            <ScrollView orientation='vertical' style={{ maxHeight: '580px' }} width='200px' className="scroll-view">
              <Flex direction="column" gap="small">
                {augLevelVariants.map(renderImageView)}
              </Flex>
            </ScrollView>
          </View>

          <View> {/* Augmentation Variants segment */}
            <Heading marginBottom='10px'>Augmentation Variants</Heading>
            <ScrollView orientation='vertical' style={{ maxHeight: '580px' }} width='200px' className="scroll-view">
              <Flex direction="column" gap="small">
                {augVariants.map(renderImageView)}
              </Flex>
            </ScrollView>
          </View>

        </Flex>
      </Flex>
      <Button onClick={handleAddToSet} marginRight='10px'>Add to Set</Button>
      <Button onClick={() => setModalVisible(false)}>Close</Button>
    </Modal>
  );
};

export default RelationModal;