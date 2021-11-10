import React from "react";
import PocketDepartment from "../PocketDepartment";
import { StyledListGroup } from "./style";

const Departments = ({ departments, searchTerm }) => {
  return (
    <StyledListGroup>
      {departments
        .filter((val) => {
          if (val === "") {
            return val;
          } else if (
            val.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return val;
          }
        })
        .map((post) => (
          <PocketDepartment key={post.id} name={post.name} />
        ))}
    </StyledListGroup>
  );
};

export default Departments;
