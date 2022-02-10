import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { getMessages } from '../GraphQl/Queries/query';
import { addMessagesMutation } from '../GraphQl/Mutation/mutation';
const Home = () => {
  let [message, setMessage] = useState('');

  let { error, loading, data } = useQuery(getMessages);
  let [addMessage] = useMutation(addMessagesMutation);

  // console.log(data?.messages, error, loading);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  function Send() {
    addMessage({ variables: { input: { text: message } } });
  }
  return (
    <div>
      {data?.messages.map((item, index) => (
        <div key={index}>
          <p>Name : {item.from}</p>
          <p>
            {item.__typename} : {item.text}
          </p>
        </div>
      ))}
      <input
        type='text'
        placeholder='enter text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={Send}>Send</button>
    </div>
  );
};

export default Home;
