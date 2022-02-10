import { gql } from '@apollo/client';

const addMessagesSubscription = gql`
  subscription {
    OnmessageAdded {
      id
      from
      text
    }
  }
`;

export { addMessagesSubscription };
