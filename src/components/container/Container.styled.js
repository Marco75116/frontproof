import styled from "styled-components";

export const ContainerCONTAINER = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

export const ShowModalButton = styled.button`
  background-color: #fff;
  box-shadow: rgb(69 67 96 / 10%) 0px 5px 20px 0px;
  border: 20px;
  border-radius: 10px;
  font-size: medium;
  cursor: pointer;
  position: absolute;
  top: 3rem;
  left: 3rem;
  padding: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalBody = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-20rem, -50%);
  width: auto;
`;

export const ContainerParameters = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
  margin-bottom: 1rem;
  box-shadow: rgb(69 67 96 / 10%) 0px 5px 20px 0px;
  width: 530px;
`;

export const InputContainer = styled.div`
  padding: 1.875rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
`;
export const VariableInput = styled.textarea`
  width: 6.05rem;
  box-sizing: border-box;
  color: hsl(244, 16%, 43%);
  background-color: #fff;
  box-shadow: 0px 5px 20px 0px rgb(69 67 96 / 10%);
  border-radius: 20px;
  padding: 1.2rem 0.675rem;
  outline: none;
  border: none;
  height: ${(props) => props.height || "3.5rem"};
  resize: none;
`;

export const CurrentParametersContainer = styled.div`
  padding: 0px 5.475rem 1.875rem 1.875rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* justify-content: space-between; */
`;
export const Parameter = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.05rem;
  margin-right: 12px;
`;

export const ButtonSend = styled.button`
  line-height: 1;
  border-radius: 1.075rem;
  box-shadow: 0 0 1px rgb(0 0 0 / 0%);
  border: 1px solid transparent;
  color: #fff;
  display: inline-block;
  background-color: hsl(353, 100%, 65%);
  font-weight: 800;
  cursor: pointer;
`;

export const ContainerContent = styled.div`
  display: ${(props) => props.display};
  background-color: white;
  border-radius: 20px;
  padding: 1.275rem;
  box-shadow: rgb(69 67 96 / 10%) 0px 5px 20px 0px;
  width: 530px;
  box-sizing: border-box;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StepContainer = styled.p`
  padding: 0.75rem 1.8rem;
  line-height: 1;
  border-radius: 1.875rem;
  box-shadow: 0 0 1px rgb(0 0 0 / 0%);
  border: 1px solid transparent;
  color: #fff;
  display: inline-block;
  background-color: rgb(249, 123, 139);
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 0px;
  cursor: pointer;
`;

export const Button = styled.button`
  padding: 0.75rem 1.8rem;
  line-height: 1;
  border-radius: 1.875rem;
  box-shadow: 0 0 1px rgb(0 0 0 / 0%);
  border: 1px solid transparent;
  color: #fff;
  display: inline-block;
  background-color: gray;
  font-weight: 600;
  margin-top: 10px;
  cursor: pointer;
`;

export const PieContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 50vh;
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.875rem;
  padding: 0px 3.5rem;
`;
