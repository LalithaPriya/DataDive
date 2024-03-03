import React, { useState } from "react";
import {
  Button,
  Flex,
  Grid,
  Badge,
  View,
  Icon,
  Label
} from "@aws-amplify/ui-react";
import { fetchImages } from './fetchImages.js';
import { IdToClassName } from "../../data.js";
import RelationModal from './relationModal.js';

const ImageViewer = ({ classLabels, augmentationTypes, augLevels, handleImagePathupdates }) => {
  const [imagePaths, setImagePaths] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageDetails, setSelectedImageDetails] = useState(null);
  // Handling image deletion
  const onDelete = (imageId) => {
    setImagePaths(prevPaths => prevPaths.filter(path => path.image_id !== imageId));
    handleImagePathupdates(imagePaths);
  };

  const handleImageClick = (image) => {
    setSelectedImageDetails(image);
    setIsModalOpen(true);
  };
  // Handling click event to load images
  const handleLoadImages = async () => {
    setIsLoading(true);
    try {
      const paths = await fetchImages(classLabels, augmentationTypes, augLevels);
      setImagePaths(paths);
      handleImagePathupdates(paths);

    } catch (error) {
      console.error("Failed to fetch images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const idToLabels = {
    0: "Origl",
    1: "G-Noise",
    2: "S-Noise",
    3: "G-Blur",
    4: "D-Blur",
    5: "Brigh",
    6: "Pixel",
    7: "Contr",
    8: "JpegC"
  };
  
  return (
    <div>
      <Flex direction="column" gap="1rem">
        <Button onClick={handleLoadImages} isLoading={isLoading} marginTop='0.5rem'>
          Load Images
        </Button>
        <Grid templateColumns="repeat(10, 1fr)" gap="1rem">
          {imagePaths.map((image, index) => (
            <View key={index} position="relative">
              <img
                src={`/dataset/${image.filePath}`}
                alt={`Image ${index}`}
                style={{ width: "100%", aspectRatio: '1', objectFit: 'cover' }}
                loading="lazy"
                onClick={() => handleImageClick(image)} // Add this line
              />
              <Button
                onClick={() => onDelete(image.image_id)}
                color="error"
                size="small"
                variation="link"
                ariaLabel="Delete image"
                style={{
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                  padding: '0',
                  minWidth: 'auto'
                }}
              >
                <Icon
                  pathData="M286.559,107.182c-5.839-5.877-15.336-5.908-21.214-0.069l-66.539,66.106l-66.572-66.572 c-5.857-5.858-15.355-5.858-21.213,0c-5.858,5.858-5.858,15.355,0,21.213l66.502,66.503l-65.968,65.539 c-5.877,5.839-5.907,15.336-0.069,21.213c2.933,2.952,6.786,4.428,10.642,4.428c3.822,0,7.646-1.452,10.572-4.359l66.037-65.608 l66.073,66.073c2.929,2.929,6.768,4.394,10.606,4.394c3.838,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213 l-66.004-66.004l66.47-66.038C292.366,122.556,292.396,113.059,286.559,107.182z"
                  viewBox={{ width: 400, height: 400 }}
                  ariaLabel="Delete"
                />
              </Button>
              <Flex direction="column" alignItems="center" gap="5px" marginTop="5px">
                <Label>{`${IdToClassName[image.classId]}`}</Label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Badge variation="info">{`${['train','val','test'][image.setting_id]}`}</Badge>
                  <Badge variation="success">{`${idToLabels[image.augId]} x ${image.aug_level}`}</Badge>
                  {/* <Badge variation="warning">{``}</Badge> */}
                </div>
              </Flex>
            </View>
          ))}
        </Grid>
      </Flex>
      {/* Assuming modal is imported */}
        <RelationModal
        modalVisible={isModalOpen}
        setModalVisible={() => setIsModalOpen(false)}
        image={selectedImageDetails}
        onSelectionComplete={(newimages) => {setImagePaths(prevPaths => [...new Set([...prevPaths ,...newimages])]); handleImagePathupdates(imagePaths);} }
        />
    </div>
    
  );
};

export default ImageViewer;