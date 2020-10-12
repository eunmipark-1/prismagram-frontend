import React, {useState} from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import {LOG_IN, CREATE_ACCOUNT} from "./AuthQueries";
import {toast} from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const userName = useInput("");
  const firstName = useInput("");
  const lastname = useInput("");
  const email = useInput("test@test.com");
  const [requestSecret] = useMutation(LOG_IN, {
    update: (_, {data}) => {
      const {requestSecret} = data;
      if(!requestSecret) {
        toast.error("You dont have an account yet, Create One~!");
        setTimeout(() => setAction("signUp"), 3000);
      }
    },
    variables : {email:email.value},
    //errorPolicy:'all'
  });

  const createAccount = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      userName: userName.value,
      firstName: firstName.value,
      lastname: lastname.value
    }
  });

  const onSubmit = e => {
    e.preventDefault();
    if(action === "login") {
      if(email.value !== ""){
        requestSecret();
      }else{
        toast.error("Email is required");
      }
    }else if(action === "signUp"){
      if(
        email.value !== "" && 
        userName.value !== "" &&
        firstName.value !== "" &&
        lastname.value !== ""
      ){
        createAccount();
      }else{
        toast.error("All field are required");
      }
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
      onSubmit={onSubmit}
    />
  );
};