import React from 'react';
import Link from './Link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

// const linksToRender = [
//   {
//     id: '1',
//     description: 'Prisma turns your database into a GraphQL API 😎',
//     url: 'https://www.prismagraphql.com',
//   },
//   {
//     id: '2',
//     description: 'The best GraphQL client',
//     url: 'https://www.apollographql.com/docs/react/',
//   },
// ];
const LinkList = () => {
  const { loading, error, data } = useQuery(FEED_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return `Error ! ${error.message}`;
  const linksToRender = data.feed.links;
  return (
    <div>
      {linksToRender &&
        linksToRender.map((link) => <Link key={link.id} link={link} />)}
    </div>
  );
};

export default LinkList;
