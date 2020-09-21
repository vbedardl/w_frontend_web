import React, { useState } from "react";
import "./App.css";
import Selector from "./Components/Selector";
import UsersModal from "./Components/Users/UsersModal";
import PackagesModal from "./Components/Packages/PackagesModal";
import { ApolloProvider } from "@apollo/client";

function App(props) {
  const [usersModalOpen, setUsersModalOpen] = useState(false);
  const [packagesModalOpen, setPackagesModalOpen] = useState(false);

  const openUsersModal = () => {
    setUsersModalOpen(true);
  };

  const closeUsersModal = () => {
    setUsersModalOpen(false);
  };

  const openPackagesModal = () => {
    setPackagesModalOpen(true);
  };
  const closePackagesModal = () => {
    setPackagesModalOpen(false);
  };
  return (
    <ApolloProvider client={props.client}>
      <div className="App">
        <h1>Web Admin</h1>
        <Selector
          openUsersModal={openUsersModal}
          openPackagesModal={openPackagesModal}
        />
        <UsersModal open={usersModalOpen} close={closeUsersModal} />
        <PackagesModal open={packagesModalOpen} close={closePackagesModal} />
      </div>
    </ApolloProvider>
  );
}

export default App;
