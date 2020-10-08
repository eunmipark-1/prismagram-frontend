import {gql} from "apollo-boost";

export cont LOG_IN = gql`
  mutation requestSecret($email:Strng!) {
    requestSecret(email: $email)
  }
`;