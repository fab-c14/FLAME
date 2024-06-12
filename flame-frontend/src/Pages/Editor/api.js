import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";
import {BACKEND_URL} from '../../config';
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});
const API2 = axios.create({
  baseURL:BACKEND_URL,
})

export const executeCode = async (language, sourceCode,isQuestion,input) => {

  if (!isQuestion){
    console.log(isQuestion);
    const response = await API2.post(`${BACKEND_URL}/api/execute`,{input});
    console.log(response);
    return response;
  }else{
    const response = await API.post("/execute", {
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: sourceCode,
        },
      ],
    });
    return response.data;
  }
};


// src/routes/codeExecutorRoutes.js



