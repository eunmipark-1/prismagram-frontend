import React, {useState} from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import {LOG_IN} from "./AuthQueries";


export default () => {
  const [action, setAction] = useState("logIn");
  const userName = useInput("");
  const firstName = useInput("");
  const lastname = useInput("");
  const email = useInput("");
  const [requestSecret] = useMutation(LOG_IN, {
    variables : {email:email.value},
    errorPolicy:'all'
  });

  const onLogin = e => {
    e.preventDefault();
    if(email.value !== ""){
      requestSecret(); 
    }
  };

  return (
    <AuthPresenter 
      setAction={setAction}
      action ={action}
      userName={userName}
      firstName={firstName}
      lastname = {lastname}
      email ={email}
      onLogin={onLogin}
    />
  );
};