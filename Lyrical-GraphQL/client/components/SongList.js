import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

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

const DELETE = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

const SongList = () => {
  //   const navigate = useNavigate();
  const [newSong, setNewSong] = useState("");
  const { loading, error, data } = useQuery(QUERY);
  const [addSong, { data: data2, loading: loading2, error: error2 }] =
    useMutation(MUTATION, {
      refetchQueries: [QUERY],
      onCompleted: (data) => {
        console.log("Completed:", data);
        setNewSong("");
        // window.location.href = "http://www.google.com";
      },
    });

  const [onSongDelete, { data: data3, loading: loading3, error: error3 }] =
    useMutation(DELETE, {
      refetchQueries: [QUERY],
    });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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
            {title}{" "}
            <i
              className="material-icons"
              onClick={() => {
                console.log(id);
                onSongDelete({ variables: { id } });
              }}
            >
              delete
            </i>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SongList;
