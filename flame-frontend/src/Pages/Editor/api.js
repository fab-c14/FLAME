import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";
import { BACKEND_URL } from '../../config';
import {useDispatch} from 'react-redux';
import { submitAnswer } from "../../actions/answerActions";
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

const API2 = axios.create({
  baseURL: BACKEND_URL,
});


export const executeCode = async (language, sourceCode, action, input,name,questionId,dispatch,userId) => {
  if (action === 'test' || action === 'submit') {
    // if(action==='submit'){
    //   dispatch(submitAnswer(userId,sourceCode,language,name,questionId));
    // }
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
