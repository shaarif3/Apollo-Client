import { gql } from '@apollo/client';

const getMessages = gql`
  query {
    messages {
      id
      from
      text
    }
  }
`;
export { getMessages };
