import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Students from "./components/Students";
import { Router } from "@reach/router";
import StudentInformation from "./components/StudentInformation";

function App() {
  return (
    <main>
      <Header />
      <Router>
        <Homepage path="/" />
        <Students path="/students" />
        <StudentInformation path="/students/:student_id" />
      </Router>
    </main>
  );
}

export default App;
