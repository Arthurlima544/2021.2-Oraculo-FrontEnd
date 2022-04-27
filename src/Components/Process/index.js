import React from "react";
import PocketDocument from "../PocketDocument";
import { StyledListGroup } from "./style";

const Process = ({ process }) => {
  // Set a limit to the visualization of some fields
  const charLimits = (text) => {
    if (text.search(" ") === -1) {
      return `${text.substring(0, 20)}...`;
    } else {
      return `${text.substring(0, 15)}...`;
    }
  };

  // Set a limit to the visualization of the seiNumber
  const seiNumberLimit = (seiNumber) => {
    if (seiNumber.length < 10) {
      return seiNumber;
    } else {
      return `${seiNumber.substring(0, 10)}...`;
    }
  };

  return process.length > 0 ? (
    <StyledListGroup>
      {process.map((post) => (
        <PocketDocument
          key={post.id}
          registerNumber={
            post.register_number === "" ? "-" : post.register_number
          }
          requester={post.requester === "" ? "-" : charLimits(post.requester)}
          inclusionDate={post.document_date === "" ? "-" : post.document_date}
          city={post.city === "" ? "-" : charLimits(post.city)}
          state={post.state === "" ? "-" : post.state}
          seiNumber={
            post.sei_number === "" ? "-" : seiNumberLimit(post.sei_number)
          }
          registerId={post.id}
          situation={post.situation}
          deadline={post.deadline}
        />
      ))}
    </StyledListGroup>
  ) : (
    <h1 class="zero-registros">Não há registros cadastrados no sistema</h1>
  );
};

export default Process;
