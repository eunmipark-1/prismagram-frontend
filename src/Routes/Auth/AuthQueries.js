import {gql} from "apollo-boost";

export const LOG_IN = gql`
  mutation requestSecret($email:Strng!) {
    requestSecret(email: $email)
  }
`;