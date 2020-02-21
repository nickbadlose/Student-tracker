import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Students from "./components/Students";
import { Router } from "@reach/router";
import BlockReview from "./components/BlockReview";
import StudentData from "./components/StudentData";

function App() {
  return (
    <main>
      <Header />
      <Router>
        <Homepage path="/" />
        <Students path="/students/*" />
        <BlockReview path="/blocks" />
        <StudentData path="/data" />
      </Router>
    </main>
  );
}

export default App;
