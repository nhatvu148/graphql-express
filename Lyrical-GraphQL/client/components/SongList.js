import React from "react";
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  {
    songs {
      title
    }
  }
`;

const SongList = () => {
  const { loading, error, data } = useQuery(QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return data.songs.map(({ title }) => (
    <div key={title}>
      <p>Title: {title}</p>
    </div>
  ));
};

export default SongList;
