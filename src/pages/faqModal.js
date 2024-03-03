import React from "react";
import { Text, Button } from "@aws-amplify/ui-react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const FAQModal = ({ modalVisible, setModalVisible }) => {
  const faqs = [
    {
      question: "What is dataDive?",
      answer:
        "dataDive is a web application designed for managing and exploring machine learning datasets. It allows users to organize, query, and visualize datasets with hierarchical relationships, particularly aimed at deep learning applications.",
    },
    {
      question: "How does dataDive work?",
      answer:
        "dataDive works by allowing users to customize their dataset through a series of steps:\n1. Users can search for images based on specific queries and further customize their dataset by adding class labels, corruption types, and corruption levels.\n2. Users can browse and view the loaded images based on their query, customize further, and visualize related images.\n3. Users can extract the database with their specified customization by providing a file name.",
    },
    {
      question: "Can you provide an example of Step 1?",
      answer:
        "Sure! Let's say a user wants to build a dataset for classifying dog breeds. They start by searching for images of dogs and then select specific class labels such as 'Golden Retriever,' 'Labrador Retriever,' and 'German Shepherd.' They can further customize by adding augmentation types and levels.",
    },
    {
      question: "How does Step 2 work?",
      answer:
        "In Step 2, users can see the images loaded based on their query. They can then customize further by deleting or adding specific images to their dataset. Additionally, they can browse related images of any given input image to refine their dataset.",
    },
    {
      question: "What happens in Step 3?",
      answer:
        "In Step 3, users provide a file name to extract the database with their specified customization. This extracted database can then be used for training or evaluating machine learning models.",
    },
    {
      question: "Can users visualize the results of their queries in dataDive?",
      answer:
        "Yes, dataDive provides a visual depiction of file contents, allowing users to preview images and navigate through the dataset. Additionally, the UI provides clear information regarding the lineage of individual files, helping users understand the relationships between images.",
    },
    {
      question: "Is dataDive suitable for deep learning applications?",
      answer:
        "Yes, dataDive is specifically designed for deep learning applications, allowing users to build datasets that are balanced and robust for deep learning. It facilitates the organization, querying, and visualization of datasets, making it easier for machine learning practitioners to work with large volumes of data.",
    },
  ];

  return (
    <Modal
      className="modal"
      isOpen={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <h2>FAQ</h2>
      {faqs.map((faq, index) => (
        <div key={index}>
          <Button
            onClick={() => {
              // Toggle visibility of answer
              const answer = document.getElementById(`faq-answer-${index}`);
              answer.style.display === "none"
                ? (answer.style.display = "block")
                : (answer.style.display = "none");
            }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              textAlign: "left",
              border: "none", // Remove border around the button
              borderBottom: "1px solid #000", // Add border only on the bottom
              borderRadius: "0", // Ensure no border radius
            }}
          >
            <span>
              {index + 1}. {faq.question}
            </span>

            <span>
              <FontAwesomeIcon icon={faAngleDown} />
            </span>
          </Button>

          <div
            id={`faq-answer-${index}`}
            style={{ display: "none", marginTop: "0.5rem" }}
          >
            <Text>{faq.answer}</Text>
          </div>
        </div>
      ))}
      <Button onClick={() => setModalVisible(false)} marginTop="10px">
        Close
      </Button>
    </Modal>
  );
};

export default FAQModal;
