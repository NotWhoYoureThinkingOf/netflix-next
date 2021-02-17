import React, { useState, useEffect } from "react";
import Row from "./Row";

const Rows = ({ movies }) => {
  return (
    <div>
      <h1>This is the Rows section</h1>
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
    </div>
  );
};

export default Rows;
