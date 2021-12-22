import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createMemoryHistory } from "history";
import { Router, Route, Routes } from "react-router-dom";
import SongList from "./components/SongList";
import HelloWorld from "./components/HelloWorld";
import "./style/style.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const Root = () => {
  const history = createMemoryHistory();
  return (
    <ApolloProvider client={client}>
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path="/" element={<SongList />} />
          <Route path="/helloworld" element={<HelloWorld />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
