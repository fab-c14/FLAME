// CodeEditor.js
import { useRef, useState } from "react";
import { Box, HStack, Input } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = ({ question, userId, name }) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [inputValue, setInputValue] = useState(""); // Add state for input value

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="70%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
          {/* <Input
            placeholder="Enter input values here"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            mt={4}
          /> */}
        </Box>
        <Output
          editorRef={editorRef}
          language={language}
          question={question}
          userId={userId}
          name={name}
          inputValue={inputValue} // Pass input value to Output
        />
      </HStack>
    </Box>
  );
};

export default CodeEditor;
