import React, { useState, useEffect } from 'react';
import { Cache, useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { getMessages } from '../GraphQl/Queries/query';
import { addMessagesMutation } from '../GraphQl/Mutation/mutation';
const Home = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const {
    error: getMessageError,
    loading: getMessageLoading,
    data,
  } = useQuery(getMessages);
  const [addMessage, loading, error] = useMutation(addMessagesMutation);

  useEffect(() => {
    setMessages(data?.messages);
  }, [data]);

  // console.log(data?.messages, error, loading);
  if (getMessageLoading) return 'Loading...';
  if (getMessageError) return `Error! ${error.message}`;

  function Send() {
    addMessage({ variables: { input: { text: message } } }).then(
      ({ data: { addMessage } }) => {
        setMessages([...messages, addMessage]);
        setMessage('');
      }
    );
  }
  return (
    <div>
      {messages?.map((item, index) => (
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
