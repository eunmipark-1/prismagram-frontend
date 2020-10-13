import React, {useState} from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import {CREATE_ACCOUNT, LOG_IN} from "./AuthQueries";
import { toast } from "react-toastify";


export default () => {
  const [action, setAction] = useState("logIn");
  const userName = useInput("");
  const firstName = useInput("");
  const lastname = useInput("");
  const email = useInput("test@test.com");
  const secret = useInput("");
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables : {email:email.value},
    //errorPolicy:'all'
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email:email.value,
      userName:userName.value,
      firstName: firstName.value,
      lastname: lastname.value
    }
  });

  const onSubmit = async(e) => {
    e.preventDefault();
    //console.log(action);
    if(action === "logIn") {
      if(email.value !== ""){
        try{
          const {data: {requestSecret}} = await requestSecretMutation(); 
          console.log(requestSecret);
          if(!requestSecret) {
            toast.error("You don't have an account. Create one~!");
            setTimeout(() => setAction("signUp"), 2000);
          }else{
            toast.success("Check your Inbox for Your Login Secret");
            setTimeout(() => setAction("confirm"), 2000);
          }
          
        }catch{
          toast.error("Can't requestScret. Try again.");
        }
        
      }else{
        toast.error("Email is required");
      }
    }else if(action === "signUp"){
      if(
        email.value !== "" &&
        userName.value !== "" &&
        firstName.value !== "" &&
        lastname.value !==""
      ){
        //console.log("signUp");
        try{
          const {data: {createAccount}} = await createAccountMutation();
          //console.log(createAccount);
          if(!createAccount){
            toast.error("Can't create account. Try again~");
          }else{
            toast.success("Account created. Log in now.");
            setTimeout(() => setAction("logIn"), 3000);
          }
        }catch (e){
          toast.error(e.message);
        }
        
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
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};