import styled from 'styled-components';

const AppWrapper = styled.div`
  box-sizing: border-box;
  max-width: 645px;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  border-top: solid 8px #fad312;
  margin: 120px auto 60px auto;
  padding: 35px 45px;

  @media(max-width: 768px) {
    align-self: center;
    margin: 0px auto 60px auto;
    padding: 35px 25px;
    box-shadow: none;
    border: solid 1px rgba(0, 0, 0, 0.3);
    border-top: solid 8px #fad312;
  }
`

const StyledSpan = styled.span`
  color: #e74149;
  font-weight: bold;
`

const StyledFooter = styled.footer`
  position: relative;
  max-width: 1920px;
  height: 60px;
  background-color: #000000;

  & > p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 13px;
    color: #999999;
    margin: 0;
    padding: 0;
  }
`

const SpanErrorMessage = styled(StyledSpan)`
  display: inline-block;
  height: 1rem;
`

const StyledInput = styled.input`
  width: 287px;
  height: 23px;
  border: solid 1px #d0d0d0;
  font-weight: 300;
  ${({type}) => type === 'submit' && `
    width: 92px;
    height: 40px;
    border-radius: 3px;
    background-color: #fad312;
    font-size: 15px;
  `}
`

export {
  AppWrapper,
  StyledSpan,
  StyledFooter,
  SpanErrorMessage,
  StyledInput
}