import {gql} from "apollo-boost";

export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email:$email)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $userName:String!
    $email: String!
    $firstName:String
    $lastname:String
  ) {
    createAccount(
      userName:$userName
      email:$email
      firstName: $firstName
      lastname: $lastname
    )
  }
`;