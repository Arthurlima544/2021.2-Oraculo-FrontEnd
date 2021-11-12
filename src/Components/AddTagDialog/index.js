import { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  CircleColor,
  StyledAlertDialog,
  StyledCreateTag,
  TagList,
} from "./styles";
import GenericBlueButton from "../GenericBlueButton";
import GenericWhiteButton from "../GenericWhiteButton";
import { Checkbox } from "antd";
import { FaPen } from "react-icons/fa";
import { getAllTags } from "../../Services/Axios/processService";
import { getInfoUser } from "../../Services/Axios/profileService";
import toast from "react-hot-toast";

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "30vw",
    height: "50vh",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "scroll",
  },
};

const TagModal = ({ onVisibleChanged }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [isAdmin, setAdmin] = useState(false);

  const [allModal, setAllModal] = useState(true);
  const [createModal, setCreateModal] = useState(false);

  async function fetchUserData() {
    try {
      const user = await getInfoUser(toast);
      const tags = await getAllTags();
      if (tags !== undefined) {
        //set tags
        // only if tags are not undefined
        setAllTags(tags.data);
      }
      if (user === undefined) {
        window.location.reload();
      } else {
        // if user is admin, show some things
        // only admins can see
        if (user?.levels[0].name === "admin") {
          setAdmin(true);
        }
      }
    } catch (err) {
      console.log("Erro ao carregar os dados do usuário!", err);
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
    onVisibleChanged(false);
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <Modal
        isOpen={allModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Selecione uma tag"
        style={modalStyle}
      >
        <StyledAlertDialog>
          <span>
            <h2>Escolha uma tag</h2>
            {isAdmin ? (
              <div className="headerDiv">
                <GenericBlueButton
                  onClick={() => {
                    setAllModal(false);
                    setCreateModal(true);
                  }}
                  title="Criar tag"
                />
              </div>
            ) : null}
          </span>
          {/* Add eacth tag list */}
          {/* Mapping all tags */}
          <TagList>
            {allTags.map((val) => (
              <div className="checkBoxDiv" key={val.id}>
                <Checkbox />
                <CircleColor style={{ backgroundColor: val.color }} />
                <p>{val.name}</p>
                <a>
                  <FaPen size="2rem" />
                </a>
              </div>
            ))}
          </TagList>
          <div className="endOfPageDiv">
            <GenericWhiteButton title="Cancelar" onClick={closeModal} />
            <GenericBlueButton title="Adicionar" />
          </div>
        </StyledAlertDialog>
      </Modal>
      <Modal isOpen={createModal} contentLabel="Nova tag" style={modalStyle}>
        <StyledCreateTag>
          <h1>Nova Tag</h1>
          <p>Nome:</p>
          <div className="input-section">
            <input type="text" />
            <div>
              <p>Cor:</p>
              <CircleColor onClick={() => {}} />
            </div>
          </div>
          <div className="endOfPageDiv">
            <GenericWhiteButton
              title="Cancelar"
              onClick={() => {
                setAllModal(true);
                setCreateModal(false);
              }}
            />
            <GenericBlueButton title="Adicionar" />
          </div>
        </StyledCreateTag>
      </Modal>
    </div>
  );
};

export { TagModal };
