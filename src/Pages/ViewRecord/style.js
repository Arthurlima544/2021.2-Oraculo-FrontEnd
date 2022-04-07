import styled from 'styled-components'
import { fonts, colors, radius } from '../../style'

const StyledDivSupProcess = styled.div`
  display: flex;
  background-color: ${colors.background};
`
const StyledDivInfoProcess = styled.div`
  width: 35.5%;
  height: 90vh;
  background-color: ${colors.header};
  color: ${colors.white};
  font-size: ${fonts.sizeMd};
  font-family: ${fonts.font};
  padding: 3rem 3% 0;
  box-sizing: border-box;
  h2 {
    text-align: center;
    font-size: ${fonts.sizeXlg};
    font-weight: 700;
  }

  hr {
    border-color: ${colors.primary};
    margin: 1rem 15%;
  }

  span {
    text-align: left;
    font-size: ${fonts.sizeXlg};
  }

  .issuerIcon {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    svg {
      width: 2rem;
      height: 2rem;
      margin-right: 1rem;
    }
  }

  .forwardIcon {
    align-items: end;
    background: none;
    border: none;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    p {
      text-decoration: none;
      color: white;
      font-size: ${fonts.sizeXlg};
      margin-bottom: 0;
    }
    svg {
      font-size: ${fonts.sizeXlg};
      margin-left: 1rem;
      color: white;
    }
  }

  .tagsTest {
    display: flex;
  }

  .processButton {
    width: 100%;
    border: 2px solid ${colors.white};
    border-radius: ${radius.sizeSm};
    font-size: ${fonts.sizeLg};
    display: block;
    text-align: center;
    margin-top: 2rem;
    padding: 1rem 3rem;
    cursor: pointer;
  }
`

const StyledDivShowProcess = styled.div`
  width: 64.5%;
  margin: 0 5%;
  height: 70vh;
  overflow-y: scroll;
  font-family: ${fonts.font};

  .info-record {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0rem 1rem;
    margin-bottom: 0;
    span {
      padding: 0 1rem;
    }
  }

  .infoProcessicon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: baseline;
    p {
      margin: 0 0 2rem 0;
      font-size: ${fonts.sizeXXlg};
    }
    svg {
      left: 5%;
      color: ${colors.primary};
      height: 1.3rem;
      width: 1.3rem;
    }
  }
`

const StyledDivButtons = styled.div`
  position: absolute;
  bottom: 20px;
  right: 37%;
  button {
    margin-left: 1rem;
  }
`

const StyledInfoDiv = styled.div`
  width: 98%;
  background: ${colors.white};
  border-radius: ${radius.sizeMd};
  padding: 1rem 2rem 0rem;
  border: 1px solid ${colors.black};
  box-sizing: border-box;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;

  .description {
    flex-direction: column;
    max-height: none;

    h3:nth-child(2) {
      margin-top: 0;
      border: 1px solid black;
      padding: 4px 0 4px 8px;
      border-radius: 8px;
      text-transform: none;
      line-height: 1.5;
      font-weight: 30;
    }
  }

  .info-icon {
    margin: 1rem 0 0 auto;
    cursor: pointer;
  }

  div {
    display: flex;
    margin: 0 2rem 0 2rem;
    line-height: 1.25;

    h3:not(:first-child) {
      font-weight: 30;
    }
  }

  h2 {
    font-size: 2.5rem;
  }

  h3 {
    text-transform: capitalize;
    font-size: 28px;
  }

  #contact-info {
    text-transform: none;
  }
  #link {
    text-transform: none;
  }
`

export {
  StyledDivInfoProcess,
  StyledDivShowProcess,
  StyledDivSupProcess,
  StyledDivButtons,
  StyledInfoDiv,
}
