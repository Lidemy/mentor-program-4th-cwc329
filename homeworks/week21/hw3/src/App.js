import Form from './components/Form';
import { AppWrapper, StyledSpan} from './components/StyledComponents'

function App() {
  return (
    <AppWrapper className="App">
      <h1>新拖延運動報名表單</h1>
      <p>
        活動日期：2020/12/10 ~ 2020/12/11<br/>
        活動地點：台北市大安區新生南路二段1號<br/>
      </p>
      <p>
        <StyledSpan>必填 *</StyledSpan>
      </p>
      <Form />
    </AppWrapper>
  );
}

export default App;
