import { client } from 'cores/api';
import { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as Button } from '../assets/button.svg';
import { ReactComponent as Logo } from '../assets/logo.svg';

function Login() {
  const [inputs, setInputs] = useState({
    nickname: '',
    password: '',
  });
  const [linkId, setLinkId] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    getLinkId();
    // window.location.href = `/main/${linkId}`;
  };

  const getLinkId = async () => {
    const result = await client.post('/link', inputs);
    console.log(result);
    setLinkId(result.data.id);
  };

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <StWrapper>
      <StLogoIcon />
      <StForm onSubmit={handleSubmit} id="login">
        <StNameInputWrapper>
          <StNameInput
            word={inputs.nickname.length}
            value={inputs.nickname}
            type="text"
            onChange={handleChangeInput}
            name="nickname"
            placeholder="홍길동,"
            maxLength={5}
            required
          />
          <StNameTitle>내일 뭐 해</StNameTitle>
        </StNameInputWrapper>
        <StPWDInputWrapper>
          <StPWDInput
            value={inputs.password}
            type="password"
            onChange={handleChangeInput}
            name="password"
            maxLength={4}
            placeholder="4자리 패스워드를 넣어주세요"
            required
          />
          <hr />
        </StPWDInputWrapper>
      </StForm>
      <StButton type="submit" form="login">
        <Button />
      </StButton>
    </StWrapper>
  );
}

export default Login;

const StForm = styled.form`
  /* width: 100%; */
`;

const StWrapper = styled.div`
  /* width: 100%;
  height: 100%; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StNameInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  line-height: 38px;
  margin-bottom: 24px;
`;

const StNameTitle = styled.span`
  font-size: 32px;
  font-weight: 700;
`;

const StNameInput = styled.input`
  width: ${(props) => (props.word === 0 ? '95px' : `${props.word * 30}px`)};
  font-size: 32px;
  font-weight: 700;
  border: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #b3b3b3;
    font-size: 32px;
  }
`;

const StPWDInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  hr {
    color: #77777780;
    width: 272px;
  }
`;

const StPWDInput = styled.input`
  width: 272px;
  height: 20px;
  border: none;
  text-align: center;
  &:focus {
    outline: none;
  }
  &::placeholder {
    text-align: center;
    color: #77777780;
  }
`;

const StButton = styled.button`
  position: fixed;
  width: 172px;
  height: 68px;
  background-color: transparent;
  border: 0;
  outline: 0;
  bottom: 200px;
`;

const StLogoIcon = styled(Logo)`
  width: 92px;
  height: 60px;
  margin-top: 193px;
  margin-bottom: 65px;
`;
