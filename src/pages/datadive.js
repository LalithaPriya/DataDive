// import "./datadive.css";
import React, { useState } from "react";
import AugmentationToggle from "./augmentationToggle.js";
import ExportDatasetModal from "./exportDatasetModal.js";
import FAQModal from "./faqModal.js";
import {
  Text,
  Flex,
  Heading,
  View,
  Input,
  Button,
  Divider,
  SearchField,
  ScrollView,
  Badge,
  Collection,
  Loader,
  Tabs,
} from "@aws-amplify/ui-react";
import Modal from "react-modal";
import PromptFilter from "./components/promptFilter.js";
import ImageViewer from "./components/imageViewer.js";
import { IdToClassName } from "../data.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.css";
import "@aws-amplify/ui-react/styles.css";
const axios = require('axios');


const iconData = Array.from({ length: 201 }, (_, i) => ({
  id: i,
  label: IdToClassName[i],
  selected: false,
  // imageUrl: "../../public/logo512.png",
}));

const augmentationData = [
  { id: 0, label: "Original", selected: false },
  { id: 1, label: "Guassian Noise", selected: false },
  { id: 2, label: "Speckle Noise", selected: false },
  { id: 3, label: "Guassian Blur", selected: false },
  { id: 4, label: "Defocus Blur", selected: false },
  { id: 5, label: "Brightness", selected: false },
  { id: 6, label: "Pixelate", selected: false },
  { id: 7, label: "Contrast", selected: false },
  { id: 8, label: "Jpeg Compression", selected: false },
];

const augmentationLevel = [
  { id: 1, label: "1", selected: false },
  { id: 2, label: "2", selected: false },
  { id: 3, label: "3", selected: false },
  { id: 4, label: "4", selected: false },
  { id: 5, label: "5", selected: false },
];

const DataDive = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [augmentations, setAugmentations] = useState([]);
  const [augmentationLevels, setAugmentationLevels] = useState([]);
  const [isPromptLoading, setIsPromptLoading] = useState(false);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [faqModalVisible, setFaqModalVisible] = useState(false);

  const [imagePaths, setImagePaths] = useState([]);

  const handleFilter = (filterLists) => {
    console.log("in datadive", filterLists);
    setAugmentations(filterLists.AugmentationList);
    setSelectedIcons(filterLists.classList);
    setAugmentationLevels(filterLists.CorruptionLevelList);
  };

  const handleImagePathupdates = (updatedImagePaths) => {
    setImagePaths(updatedImagePaths);
  };
  const handleUpdateSelectedIcons = (updatedAugmentations) => {
    setSelectedIcons(updatedAugmentations);
  };
  const handleUpdateAugmentations = (updatedAugmentations) => {
    setAugmentations(updatedAugmentations);
  };
  const handleUpdateAugmentationLevels = (updatedAugmentations) => {
    setAugmentationLevels(updatedAugmentations);
  };

  const handleExportDataset = () => {
    // Add logic here to handle exporting dataset
    // For now, just open the modal
    setExportModalVisible(true);
  };

  const exportCallback = (fileName) => {
    
    const data = {
      file_paths: imagePaths.map(md => md.filePath),
      provided_name: fileName
    };
    fetch('http://localhost:5000/organize_and_zip', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => {
    if (response.ok) {
        return response.json();
    }
    throw new Error('Network response was not ok.');
})
.then(data => {
    // Assuming the response contains the zip_path
    const zipPath = data.zip_path;

    // Create a link element
    const link = document.createElement('a');
    link.href = zipPath;
    
    // Set the download attribute and trigger the click event to download the file
    link.setAttribute('download', 'downloaded_file.zip');
    document.body.appendChild(link);
    link.click();

    // Remove the link element from the DOM
    document.body.removeChild(link);
})
.catch(error => {
    console.error('Error:', error);
});

  };
  // return (
  //   <View padding="1rem">
  //     <div>
  //       <Flex
  //         direction="row"
  //         justifyContent="space-between"
  //         alignItems="center"
  //       >
  //         <Heading level={1}>DataDive</Heading>
  //         <div>
  //           <Flex direction="row" alignItems="center">
  //             <Flex
  //               direction="column"
  //               style={{ padding: "3px 10px" }}
  //               onClick={() => setFaqModalVisible(true)}
  //             >
  //               <FontAwesomeIcon
  //                 icon={faQuestionCircle}
  //                 size="lg"
  //                 style={{ marginBottom: "0" }}
  //               />
  //               <Text
  //                 style={{
  //                   fontSize: "12px",
  //                   textAlign: "center",
  //                   marginTop: "-14px",
  //                 }}
  //               >
  //                 FAQ
  //               </Text>
  //             </Flex>
  //             <FAQModal
  //               modalVisible={faqModalVisible}
  //               setModalVisible={setFaqModalVisible}
  //             />
  //           </Flex>
  //         </div>
  //         <Flex direction="column">
  //           <Button
  //             colorTheme="overlay"
  //             onClick={handleExportDataset}
  //             maxWidth="200px"
  //             style={{
  //               backgroundColor: "rgb(4, 125, 149)",
  //               color: "white",
  //               marginRight: "10px",
  //             }}
  //           >
  //             Export Dataset
  //           </Button>
  //           <ExportDatasetModal
  //             modalVisible={exportModalVisible}
  //             setModalVisible={setExportModalVisible}
  //           />
  //         </Flex>
  //       </Flex>

  //       {/* <Modal
  //           className="modal"
  //           isOpen={exportModalVisible}
  //           onRequestClose={() => setExportModalVisible(false)}
  //           contentLabel="Export Dataset Modal"
  //         >
  //           <h2>Export Dataset</h2>
  //           <p>Modal content goes here...</p>
  //         </Modal> */}
  //       {/* </Flex> */}
  //       <Flex direction="row" marginLeft="20px">
  //         <Divider orientation="vertical" />
  //         <Text variation="secondary">
  //           a powerful dataset customization tool
  //         </Text>
  //       </Flex>
  //       <Divider marginTop="1rem" marginBottom="1rem" />
  //       <View padding="1rem">
  //         <PromptFilter handleFilter={handleFilter} />

  //         <Flex direction="column">
  //           <AugmentationToggle
  //             augmentations={selectedIcons}
  //             onUpdateAugmentations={handleUpdateSelectedIcons}
  //             data={iconData}
  //             label={"Class label"}
  //           />
  //           <AugmentationToggle
  //             augmentations={augmentations}
  //             onUpdateAugmentations={handleUpdateAugmentations}
  //             data={augmentationData}
  //             label={"Corruption type"}
  //           />
  //           <AugmentationToggle
  //             augmentations={augmentationLevels}
  //             onUpdateAugmentations={handleUpdateAugmentationLevels}
  //             data={augmentationLevel}
  //             label={"Corruption level"}
  //           />
  //         </Flex>

  //         <ImageViewer
  //           classLabels={selectedIcons}
  //           augmentationTypes={augmentations}
  //           augLevels={augmentationLevels}
  //         ></ImageViewer>
  //       </View>
  //       <div>
  //         <h2>Results</h2>
  //         <p>
  //           all animal images with DIGITAL augmentations with level corruption
  //           level 4
  //         </p>
  //         <ul>
  //           {selectedIcons.map((icon) => (
  //             <li key={icon.id}>{icon.label}</li>
  //           ))}
  //         </ul>
  //       </div>
  //     </div>
  //   </View>
  // );

  return (
    <View padding="1rem">
      <div>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading level={1}>DataDive</Heading>
          <div>
            <Flex direction="row" alignItems="center">
              <Flex
                direction="column"
                style={{
                  padding: "3px 10px",
                  position: "absolute",
                  top: "27px",
                  right: "241px",
                }}
                onClick={() => setFaqModalVisible(true)}
              >
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  size="lg"
                  style={{ marginBottom: "0" }}
                />
                <Text
                  style={{
                    fontSize: "12px",
                    textAlign: "center",
                    marginTop: "-14px",
                  }}
                >
                  FAQ
                </Text>
              </Flex>
              <FAQModal
                modalVisible={faqModalVisible}
                setModalVisible={setFaqModalVisible}
              />
            </Flex>
          </div>
          <Flex direction="column">
            <Button
              colorTheme="overlay"
              onClick={handleExportDataset}
              maxWidth="200px"
              style={{
                backgroundColor: "rgb(4, 125, 149)",
                color: "white",
                marginRight: "10px",
              }}
            >
              Export Dataset
            </Button>
            <ExportDatasetModal
              modalVisible={exportModalVisible}
              setModalVisible={setExportModalVisible}
              handleSelectAll={exportCallback}
            />
          </Flex>
        </Flex>
        <Flex direction="row" marginLeft="20px" marginBottom="15px">
          <Divider orientation="vertical" />
          <Text variation="secondary">
            a powerful dataset customization tool
          </Text>
        </Flex>
        {/* <Divider marginTop="1rem" marginBottom="1rem" /> */}
        <Tabs
          defaultValue={"Tab 1"}
          items={[
            {
              label: "Customize",
              value: "Tab 1",
              content: (
                <>
                  {/* <Divider marginTop="1rem" marginBottom="1rem" /> */}
                  <View padding="0rem 1rem ">
                  <Text variation="info" left = "15px" marginBottom= "5px">Step 1:</Text>
                    {/* <Heading level={6}> Step 1:</Heading> */}
                    <PromptFilter handleFilter={handleFilter} />
                    <Flex direction="column" marginBottom = "10px">
                      <AugmentationToggle
                        augmentations={selectedIcons}
                        onUpdateAugmentations={handleUpdateSelectedIcons}
                        data={iconData}
                        label={"Class label"}
                      />
                      <AugmentationToggle
                        augmentations={augmentations}
                        onUpdateAugmentations={handleUpdateAugmentations}
                        data={augmentationData}
                        label={"Corruption type"}
                      />
                      <AugmentationToggle
                        augmentations={augmentationLevels}
                        onUpdateAugmentations={handleUpdateAugmentationLevels}
                        data={augmentationLevel}
                        label={"Corruption level"}
                      />
                    </Flex>
                    <Text variation="info" left = "10px">Step 2:</Text>
                    <ImageViewer marginTop = "-4px"
                      classLabels={selectedIcons}
                      augmentationTypes={augmentations}
                      augLevels={augmentationLevels}
                      handleImagePathupdates={handleImagePathupdates}
                    ></ImageViewer>
                  </View>
                  <div>
                    {/* <ul>
                      {selectedIcons.map((icon) => (
                        <li key={icon.id}>{icon.label}</li>
                      ))}
                    </ul> */}
                  </div>
                </>
              ),
            },
            { label: "Evaluate", value: "Tab 2", content: "Tab content #2" },
          ]}
        />
      </div>
    </View>
  );
};

export default DataDive;
