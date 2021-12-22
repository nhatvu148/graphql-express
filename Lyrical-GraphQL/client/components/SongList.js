import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

const QUERY = gql`
  {
    songs {
      id
      title
    }
  }
`;

const MUTATION = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

const SongList = () => {
  const [newSong, setNewSong] = useState("");
  const { loading, error, data } = useQuery(QUERY);
  const [addSong, { data: data2, loading: loading2, error: error2 }] =
    useMutation(MUTATION, {
      refetchQueries: [QUERY],
    });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return (
    <>
      <p>New title: </p>
      <input
        style={{ padding: 5 }}
        value={newSong}
        onChange={(input) => setNewSong(input.target.value)}
      />
      <button
        onClick={() => {
          addSong({ variables: { title: newSong } });
        }}
      >
        Add a song
      </button>
      <ul className="collection">
        {data.songs.map(({ id, title }) => (
          <li key={id} className="collection-item">
            Title: {title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SongList;
