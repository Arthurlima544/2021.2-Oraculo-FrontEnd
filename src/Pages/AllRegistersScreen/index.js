import React, { useEffect, useState } from "react";
import { history } from "../../history";
import HeaderWithButtons from "../../Components/HeaderWithButtons";
import MainButton from "../../Components/MainButton";
import RenderFilters from "../../Components/Filters";
import DatePicker from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'
import 'react-datepicker/dist/react-datepicker.css'
import { exportRegisterTable } from "../../Services/exportRegisterTable";

import {
  StyledTitle,
  StyledBody,
  StyledOrganizeButtons,
  StyledBigButton,
  StyledTop,
  ButtonDiv,
  StyledSearchBarSize,
  StyledSearchBar,
  DateForm,
  StyledDatePicker, 
} from "./styles";

import Process from "../../Components/Process";
import Pagination from "../../Components/Pagination/index";
import {
  getProcessTotalNumber,
  getProcessByPage,
} from "../../Services/Axios/processService";
import toast from "react-hot-toast";

const AllRegistersScreen = () => {
  const [process, setProcess] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [processPerPage] = useState(30);
  const [allProcesses, setAllProcesses] = useState(0);
  const [dateStart, setDateStart] = useState(undefined)
  const [dateEnd, setDateEnd] = useState(undefined)
  // Acrescentando termo para busca
  const [where, setWhere] = useState({});

  async function setAll() {
    const temp = await getProcessTotalNumber(toast);
    setAllProcesses(temp.count);
  }

  function handleProcess() {
    history.push("/criar-registro");
    window.location.reload();
  }

  useEffect(() => {
    const fetchProcess = async () => {
      let dateStartString = undefined;
      let dateEndString = undefined;

      if(dateStart != undefined) 
        dateStartString = dateStart.toLocaleDateString('pt-br');
      if(dateEnd != undefined) 
        dateEndString = dateEnd.toLocaleDateString('pt-br');

      const temp = await getProcessByPage(currentPage, toast, { where },
        dateStartString, dateEndString);

      setProcess(temp);
    };
    fetchProcess();
  }, [currentPage, where, dateStart, dateEnd]);

  window.onload = function () {
    setAll();
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleExportTable = () => {
    exportRegisterTable(process)
  }

  return (
    <>
      <HeaderWithButtons />

      <StyledBody>
      <StyledTitle>Registros - Todos</StyledTitle>
      <DateForm>
      <div>
        <p>De:</p>
        <DatePicker
            id="documentDateInput"
            selected={dateStart}
            className="form-div"
            locale={pt}
            placeholderText="dd/mm/aaaa"
            disabledKeyboardNavigation
            dateFormat="dd/MM/yyyy"
            strictParsing
            maxDate={new Date()}
            onChange={(date) => {
              setDateStart(date)
            }}
            customInput={<StyledDatePicker lang={'pt-BR'} />}
            />
        </div>
        <div>
        <p>Até:</p>
        <DatePicker
          id="documentDateInput"
          selected={dateEnd}
          className="form-div"
          locale={pt}
          placeholderText="dd/mm/aaaa"
          disabledKeyboardNavigation
          dateFormat="dd/MM/yyyy"
          strictParsing
          maxDate={new Date()}
          onChange={(date) => {
            setDateEnd(date)
          }}
          customInput={<StyledDatePicker lang={'pt-BR'} />}
        />
        </div>
        </DateForm>
        <div className="flex-mt-2">
          <StyledTop>
            <StyledSearchBarSize>
              {/* área para procurar registros */}
              <RenderFilters handleWhere={{ where, setWhere }} />
            </StyledSearchBarSize>
            <ButtonDiv>
              <MainButton onClick={handleProcess} title={"Novo Registro"} />
            </ButtonDiv>
          </StyledTop>
          <div>
            <MainButton  onClick={handleExportTable} title={"Exportar tabela"} />
          </div>
          <StyledOrganizeButtons>
            <StyledBigButton>Nº do Registro</StyledBigButton>
            <StyledBigButton>Cidade</StyledBigButton>
            <StyledBigButton>UF</StyledBigButton>
            <StyledBigButton>Solicitante</StyledBigButton>
            <StyledBigButton>Inclusão</StyledBigButton>
            <StyledBigButton>Nº do SEI</StyledBigButton>
            <StyledBigButton>Tag</StyledBigButton>
            <StyledBigButton />
          </StyledOrganizeButtons>
          {/* Procurar registros com base no termo procurado*/}
          {process ? (
            <Process process={process} />
          ) : (
            <h1 class="zero-registros">
              Não há registros cadastrados no sistema
            </h1>
          )}
          {/* Paginação dos registros*/}
          <Pagination
            processPerPage={processPerPage}
            totalProcess={allProcesses}
            paginate={paginate}
          />
        </div>
      </StyledBody>
    </>
  );
};

export default AllRegistersScreen;
