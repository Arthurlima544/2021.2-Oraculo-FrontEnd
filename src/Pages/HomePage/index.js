import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import HeaderWithButtons from "../../Components/HeaderWithButtons";
import SearchBar from "../../Components/SearchBar";
import { getInfoUser } from "../../Services/Axios/profileService";
import { StyledBody, StyledOrganizeButtons, StyledBigButton } from "./styles";
import Process from "../../Components/Process";
import Pagination from "../../Components/Pagination/index";
import {
  getProcessTotalNumber,
  getProcessByPage,
} from "../../Services/Axios/processService";

const HomePage = () => {
  const [process, setProcess] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [processPerPage] = useState(4);
  const [allProcesses, setAllProcesses] = useState(0);
  const [section, setSection] = useState("");

  async function setAll() {
    const temp = await getProcessTotalNumber(toast);
    setAllProcesses(temp.count);
  }

  const fetchProcess = async () => {
    try {
      const user = await getInfoUser(toast);
      if (user === undefined) {
        window.location.reload();
      } else {
        setSection(user.sections[0].name);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(currentPage);
    const temp = await getProcessByPage(currentPage * processPerPage, toast);
    console.log(temp);
    setProcess(temp);
  };

  useEffect(() => {
    fetchProcess();
    console.log("Departamento:", section);
  }, [currentPage]);

  window.onload = function () {
    setAll();
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <HeaderWithButtons />
      <StyledBody>
        <h1>Pesquisar Registro</h1>
        <SearchBar></SearchBar>
        <h1>Departamento: {section}</h1>
        <StyledOrganizeButtons>
          <StyledBigButton>Nº de Registro</StyledBigButton>
          <StyledBigButton>Cidade</StyledBigButton>
          <StyledBigButton>UF</StyledBigButton>
          <StyledBigButton>Solicitante</StyledBigButton>
          <StyledBigButton>Inclusão</StyledBigButton>
          <StyledBigButton>Nº do SEI</StyledBigButton>
          <StyledBigButton>Tags</StyledBigButton>
          <StyledBigButton>...</StyledBigButton>
        </StyledOrganizeButtons>
        {process ? (
          <Process process={process} />
        ) : (
          <h1 class="zero-registros">
            Não há registros cadastrados no sistema
          </h1>
        )}
        <Pagination
          processPerPage={processPerPage}
          totalProcess={allProcesses}
          paginate={paginate}
        />
      </StyledBody>
    </>
  );
};

export default HomePage;
