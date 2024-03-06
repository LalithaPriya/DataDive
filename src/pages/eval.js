// eval.js
import React, { useState } from 'react';
import OpenAI from "openai";
import myprompt from './gptprompt'
import { View, Button, Flex, Heading, Divider, Tabs, Input } from '@aws-amplify/ui-react';


function Eval(handleFilter) { 
  const [classNames, setClassNames] = useState([]);
  const [filterContent, setFilterContent] = useState(''); // New state for handling the input box value

  const openai = new OpenAI({ apiKey: 'PROVIDE API KEY', dangerouslyAllowBrowser: true  });

  function parseAndFilter(jsonString) {
      try {
          // Find the start and end indices of the JSON object
          const startIndex = jsonString.indexOf('{');
          const endIndex = jsonString.lastIndexOf('}') + 1;
          
          // Extract the JSON object
          const jsonObject = JSON.parse(jsonString.substring(startIndex, endIndex));

          // Extract lists
          let classList = jsonObject.classList.filter(num => num >= 1 && num <= 200);
          let AugmentationList = jsonObject.AugmentationList.filter(num => num >= 0 && num <= 8);
          let CorruptionLevelList = jsonObject.CorruptionLevelList.filter(num => num >= 1 && num <= 5);

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
      prompt = myprompt + `"${filterContent}"`
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt}],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
        seed: 321938
      });
      console.log(completion.choices);
      console.log(completion.choices[0].message.content);
      let filterLists = parseAndFilter(completion.choices[0].message.content)
      console.log(filterLists);
      handleFilter && handleFilter(filterLists);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handlePrompt(event.target.value);
    }
  };


   return (
    <View padding="1rem">
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react-modal/3.14.3/react-modal.min.js"
             integrity="sha512-MY2jfK3DBnVzdS2V8MXo5lRtr0mNRroUI9hoLVv2/yL3vrJTam3VzASuKQ96fLEpyYIT4a8o7YgtUs5lPjiLVQ=="
             crossOrigin="anonymous"
             referrerPolicy="no-referrer"></script>
             <script src="https://unpkg.com/packery@2.1/dist/packery.pkgd.js"></script>


            <Heading level={1}>Filter</Heading>
            <Divider marginBottom="1rem" />
                        
            <Flex direction="row" alignItems="left" justifyContent="space-between" marginBottom="1rem">
                    <Input
                      type="text"
                      placeholder="Filter sites with text, source, or tags"
                      value={filterContent}
                      onChange={(e) => setFilterContent(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
            </Flex>
    </View>
  );
}

export default Eval;
