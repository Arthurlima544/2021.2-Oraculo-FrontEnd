import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FaPlus, FaRegFileAlt } from 'react-icons/fa'
import HeaderWithButtons from '../../Components/HeaderWithButtons'
import { history } from '../../history'
import { editRecord, getProcessByID } from '../../Services/Axios/processService'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import pt from 'date-fns/locale/pt-BR'
import { federativeUnits } from '../../Constants/federativeUnits'
import { useParams } from 'react-router'
import { getInfoUser } from '../../Services/Axios/profileService'
import {
  StyledBlueRectangle,
  StyledButtonsDiv,
  StyledCancelButton,
  StyledCreateButton,
  StyledDatePicker,
  StyledForms,
  StyledProcess,
  StyledProcessDiv,
  StyledTitle,
  StyledWhiteRectangle,
} from '../CreateRecord/styles'
import { getRecordTagColors } from '../../Services/Axios/tagsService'
import { TagModal } from '../../Components/AddTagDialog'

const EditRecord = () => {
  useEffect(() => {
    // if user is not logged, go back to login screen
    async function getUser() {
      const user = await getInfoUser(toast)
      if (!user) {
        history.push('/login')
      }
    }
    getUser()
  }, [])

  // Convert dd/mm/yyyy para Date()
  const convertDate = (dateBR) => {
    const dateUS = dateBR.split('/')
    return new Date(dateUS[2], dateUS[1] - 1, dateUS[0])
  }

  const { id } = useParams()
  const [inclusionDate, setInclusionDate] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [requester, setRequester] = useState('')
  const [documentType, setDocumentType] = useState('')
  const [documentNumber, setDocumentNumber] = useState('')
  const [documentDate, setDocumentDate] = useState('')
  const [documentDescription, setDocumentDescription] = useState('')
  const [seiNumber, setSeiNumber] = useState('')
  const [receiptForm, setReceiptForm] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [tags, setTags] = useState({})
  const [showTagModal, setShowTagModal] = useState(false)
  const [link, setLink] = useState('')
  const [keyWord, setKeyWord] = useState('')
  const [physicalObject, setPhysicalObject] = useState(false)

  window.onload = async function () {
    const originalRecord = await getProcessByID(id, toast)
    console.log(originalRecord)
    const getTagsApi = await getRecordTagColors(id)

    const newTags = {}
    if (getTagsApi[0] === 200) {
      console.log(getTagsApi)
      getTagsApi[1].forEach((t) => {
        newTags[t.id] = { color: t.color, checked: true }
      })
      setTags(newTags)
    }

    setInclusionDate(originalRecord.inclusion_date)

    originalRecord.city ? setCity(originalRecord.city) : setCity('-')
    originalRecord.state ? setState(originalRecord.state) : setState('-')
    originalRecord.requester
      ? setRequester(originalRecord.requester)
      : setRequester('-')
    originalRecord.document_type
      ? setDocumentType(originalRecord.document_type)
      : setDocumentType('-')
    originalRecord.document_number
      ? setDocumentNumber(originalRecord.document_number)
      : setDocumentNumber('-')
    originalRecord.document_date
      ? setDocumentDate(convertDate(originalRecord.document_date))
      : setDocumentDate('-')
    originalRecord.description
      ? setDocumentDescription(originalRecord.description)
      : setDocumentDescription('-')
    originalRecord.sei_number
      ? setSeiNumber(originalRecord.sei_number)
      : setSeiNumber('-')
    originalRecord.receipt_form
      ? setReceiptForm(originalRecord.receipt_form)
      : setReceiptForm('-')
    originalRecord.contact_info
      ? setContactInfo(originalRecord.contact_info)
      : setContactInfo('-')
    originalRecord.link ? setLink(originalRecord.link) : setLink('')
    originalRecord.key_words ? setKeyWord(originalRecord.key_words) : setKeyWord('')

    setPhysicalObject(originalRecord.have_physical_object)
  }

  async function handleClick(event) {
    const record = {
      inclusion_date: inclusionDate,
      city: city,
      state: state,
      requester: requester,
      document_type: documentType,
      document_number: documentNumber,
      // Convert Date() to dd/mm/yyyy
      document_date: documentDate.toLocaleDateString(),
      description: documentDescription,
      sei_number: seiNumber,
      receipt_form: receiptForm,
      contact_info: contactInfo,
      tags: Object.entries(tags)
        .filter(([key, value]) => value.checked)
        .map(([key, value]) => key),
      link: link,
      have_physical_object: physicalObject,
    }

    await editRecord(record, id, toast)
  }

  return (
    <>
      {showTagModal && (
        <TagModal
          onVisibleChanged={setShowTagModal}
          addTags={setTags}
          tagsObj={tags}
        />
      )}
      <HeaderWithButtons />
      <div>
        <StyledTitle>
          <p>Editar Registro</p>
        </StyledTitle>

        <StyledProcess>
          <StyledProcessDiv>
            <StyledBlueRectangle>
              <FaRegFileAlt size="20rem" color="white" />
            </StyledBlueRectangle>

            <StyledWhiteRectangle>
              <StyledForms>
                <form onSubmit={(event) => handleClick(event.preventDefault())}>
                  <div class="form-div">
                    <h1>Cidade</h1>
                    <input
                      required
                      id="cityInput"
                      type="text"
                      placeholder="Cidade (Obrigatório)"
                      onChange={(event) => setCity(event.target.value)}
                      value={city}
                    />
                  </div>
                  <div class="form-div">
                    <h1>Estado</h1>
                    <select
                      id="stateInput"
                      placeholder="Selecione o estado"
                      onChange={(event) => setState(event.target.value)}
                    >
                      <>
                        <option selected required>
                          {state}
                        </option>
                        {federativeUnits.map((uf) => (
                          <option value={uf}>{uf}</option>
                        ))}
                      </>
                    </select>
                  </div>
                  <div class="form-div">
                    <h1>Solicitante</h1>
                    <input
                      required
                      id="requesterInput"
                      type="text"
                      placeholder="Solicitante (Obrigatório)"
                      onChange={(event) => setRequester(event.target.value)}
                      value={requester}
                    />
                  </div>
                  <div class="form-div">
                    <h1>Tipo de documento</h1>
                    <input
                      required
                      id="documentTypeInput"
                      type="text"
                      placeholder="Oficio, Despacho ..."
                      onChange={(event) => setDocumentType(event.target.value)}
                      value={documentType}
                    />
                  </div>
                  <div class="form-div">
                    <h1>Nº do documento </h1>
                    <input
                      required
                      id="documentNumberInput"
                      type="text"
                      placeholder="Numero do Documento"
                      onChange={(event) =>
                        setDocumentNumber(event.target.value)
                      }
                      value={documentNumber}
                    />
                  </div>
                  <div class="form-div">
                    <h1>Data do documento</h1>
                  </div>

                  <DatePicker
                    id="documentDateInput"
                    selected={documentDate}
                    class="form-div"
                    locale={pt}
                    placeholderText="dd/mm/aaaa"
                    strictParsing
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    onChange={(event) => {
                      setDocumentDate(event)
                    }}
                    customInput={<StyledDatePicker />}
                  />
                  <div class="form-div">
                    <h1>Descrição do documento</h1>
                    <input
                      required
                      id="documentDescriptionInput"
                      type="text"
                      placeholder="Ex: Solicita antecedentes ... (Obrigatório)"
                      onChange={(event) =>
                        setDocumentDescription(event.target.value)
                      }
                      value={documentDescription}
                    />
                  </div>
                  <div class="form-div">
                    <h1>Nº do SEI</h1>
                    <input
                      required
                      id="seiNumberInput"
                      type="text"
                      placeholder="Nº do SEI"
                      onChange={(event) => setSeiNumber(event.target.value)}
                      value={seiNumber}
                    />
                  </div>
                  <div class="form-div">
                    <h1>Recebido via</h1>
                    <input
                      required
                      id="receiptFormInput"
                      type="text"
                      placeholder="Física, E-mail, SEI (Obrigatório)"
                      onChange={(event) => setReceiptForm(event.target.value)}
                      value={receiptForm}
                    />
                  </div>
                  <div class="form-div">
                    <h1>Informação de contato</h1>
                    <input
                      required
                      id="contactInfoInput"
                      type="text"
                      placeholder="contato@email.com"
                      onChange={(event) => setContactInfo(event.target.value)}
                      value={contactInfo}
                    />
                  </div>
                  <div className="form-div">
                    <h1>Acompanha objeto físico</h1>
                    <input
                      type="checkbox"
                      onChange={(event) => {
                        setPhysicalObject(event.target.checked)
                      }}
                      checked={physicalObject}
                    />
                  </div>
                  <div className="form-div">
                    <h1>Tags</h1>
                    <button type="button" onClick={() => setShowTagModal(true)}>
                      <div style={{ display: 'flex' }}>
                        {Object.entries(tags).map(([key, value]) => {
                          return (
                            value.checked && (
                              <div
                                style={{
                                  height: '1rem',
                                  width: '1rem',
                                  border: '1px solid black',
                                  borderRadius: '50%',
                                  backgroundColor: value.color,
                                  marginRight: '0.5rem',
                                }}
                              />
                            )
                          )
                        })}
                        <FaPlus />
                      </div>
                    </button>
                  </div>
                  <div className="form-div">
                    <h1>Link de documento</h1>
                    <input
                      id="linkInput"
                      type="text"
                      placeholder="Adicione o link do documento"
                      onChange={(event) => setLink(event.target.value)}
                      value={link}
                    />
                  </div>
                  <div className="form-div">
                    <h1>Palavras-chave</h1>
                    <input
                      id="keyWordInput"
                      type="text"
                      placeholder="Insira as palavras chave do documento"
                      onChange={(event) => setKeyWord(event.target.value)}
                      value={keyWord}
                    />
                  </div>
                  <StyledButtonsDiv>
                    <StyledCancelButton
                      type="button"
                      onClick={() => window.history.back()}
                    >
                      Cancelar
                    </StyledCancelButton>
                    <StyledCreateButton type="submit">
                      Editar
                    </StyledCreateButton>
                  </StyledButtonsDiv>
                </form>
              </StyledForms>
            </StyledWhiteRectangle>
          </StyledProcessDiv>
        </StyledProcess>
        <Toaster />
      </div>
    </>
  )
}

export default EditRecord
