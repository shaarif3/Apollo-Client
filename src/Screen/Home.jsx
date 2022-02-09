import React from 'react';
import { useQuery } from '@apollo/client';
import { getMessages } from '../GraphQl/Queries/query';

const Home = () => {
  let { error, loading, data } = useQuery(getMessages);

  //   console.log(error, 'err');
  //   console.log(data, 'data');

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return <div>Home</div>;
};

export default Home;
