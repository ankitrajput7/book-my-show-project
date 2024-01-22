import React from "react";
import { useParams } from "react-router-dom";

function TvSerialCard() {
  const { id } = useParams();

  return <div>TvSerial {id}</div>;
}

export default TvSerialCard;
