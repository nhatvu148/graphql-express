import React from "react";
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  {
    songs {
      id
      title
    }
  }
`;

const SongList = () => {
  const { loading, error, data } = useQuery(QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return (
    <ul className="collection">
      {data.songs.map(({ id, title }) => (
        <li key={id} className="collection-item">
          Title: {title}
        </li>
      ))}
    </ul>
  );
};

export default SongList;
