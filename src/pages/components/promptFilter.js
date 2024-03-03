// eval.js
import React, { useState } from "react";
import OpenAI from "openai";
import gptPrompt from "../gptprompt.js";
import {
  Loader,
  View,
  Button,
  Flex,
  Heading,
  Divider,
  Tabs,
  Input
} from "@aws-amplify/ui-react";

// import '../datadive.css';

const PromptFilter = ({ handleFilter }) => {
  const [classNames, setClassNames] = useState([]);
  const [filterContent, setFilterContent] = useState(""); // New state for handling the input box value
  const [isPromptLoading, setIsPromptLoading] = useState(false); 
  const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  const parseAndFilter = (jsonString) =>{
    try {
      // Find the start and end indices of the JSON object
      const startIndex = jsonString.indexOf("{");
      const endIndex = jsonString.lastIndexOf("}") + 1;

      // Extract the JSON object
      const jsonObject = JSON.parse(jsonString.substring(startIndex, endIndex));

      // Extract lists
      let classList = jsonObject.classList.filter(
        (num) => num >= 1 && num <= 200
      );
      let AugmentationList = jsonObject.AugmentationList.filter(
        (num) => num >= 0 && num <= 8
      );
      let CorruptionLevelList = jsonObject.CorruptionLevelList.filter(
        (num) => num >= 1 && num <= 5
      );

      // Check if lists are empty and fill them with all possible values in their ranges
      if (classList.length === 0) {
        classList = Array.from({ length: 200 }, (_, i) => i + 1);
      }
      if (AugmentationList.length === 0) {
        AugmentationList = Array.from({ length: 9 }, (_, i) => i);
      }
      if (CorruptionLevelList.length === 0) {
        CorruptionLevelList = Array.from({ length: 5 }, (_, i) => i + 1);
      }

      return { classList, AugmentationList, CorruptionLevelList };
    } catch (error) {
      return null; // Return null if parsing fails
    }
  }
  const handlePrompt = async () => {
    try {
      setIsPromptLoading(true);
      let prompt = gptPrompt + `"${filterContent}"`;
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
        seed: 32138,
      });
      console.log(completion.choices);
      console.log("data--->  ", completion.choices[0].message.content);
      let filterLists = parseAndFilter(completion.choices[0].message.content);
      console.log(filterLists);
      handleFilter && handleFilter(filterLists);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsPromptLoading(false); // Indicate loading has finished
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handlePrompt(filterContent);
    }
  };

  return (
  // <View padding="1rem">
    <Flex direction="row" alignItems="left" justifyContent="space-between" marginBottom="1rem">
    <div style={{ flex: 1 }}>
        <Input
          type="text"
          placeholder="filter using Natural Language Prompt"
          value={filterContent}
          onChange={(e) => setFilterContent(e.target.value)}
          onKeyPress={handleKeyPress}
          isDisabled={isPromptLoading}
        />
        
    </div>
    <Flex direction="column" alignItems="top">
      <Button  colorTheme="overlay" onClick={() => handlePrompt(filterContent)} maxWidth="200px" style={{ backgroundColor: 'rgb(4, 125, 149)', color: 'white' }} >
      {isPromptLoading ? <Loader size="large"/>: "Soft Query"}
        </Button>
    </Flex>
  </Flex>
    // </View>
  );
};

export default PromptFilter;
