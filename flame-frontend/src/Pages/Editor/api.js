import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";
import { BACKEND_URL } from '../../config';

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

const API2 = axios.create({
  baseURL: BACKEND_URL,
});

export const executeCode = async (language, sourceCode, action, input) => {
  if (action === 'test' || action === 'submit') {
    const response = await API2.post("/api/execute", { input });
    return response.data.tests;
  } else if (action === 'run') {
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
