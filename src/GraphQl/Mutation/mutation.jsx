import { gql } from '@apollo/client';

const addMessagesMutation = gql`
  mutation ($input: MessageInput!) {
    addMessage(input: $input) {
      id
      text
      from
    }
  }
`;

export { addMessagesMutation };
