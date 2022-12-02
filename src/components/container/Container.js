import React, { useEffect, useState, useRef } from "react";
import {
  ContainerCONTAINER,
  ContainerContent,
  HeaderContainer,
  PieContainer,
  Button,
  StepContainer,
  FooterContainer,
  InputContainer,
  VariableInput,
  ButtonSend,
  CurrentParametersContainer,
  ContainerParameters,
  Parameter,
  ModalWrapper,
  ModalBody,
  ShowModalButton,
} from "./Container.styled";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import srcScreen from "../../asset/Capture d’écran 2022-12-01 à 05.01.37.png";

ChartJS.register(ArcElement, Tooltip, Legend);

const defaultParameters = {
  nbNodes: "",
  m: "",
  k: "",
  alpha: "",
};

const Container = () => {
  const [allData, setAllData] = useState([[0, 0, 0]]);
  const [currentStep, setCurrentStep] = useState(0);
  const [parameters, setParameters] = useState(defaultParameters);
  const [currentParameters, setCurrentParameters] = useState(defaultParameters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);

  const query = (parameters) => {
    axios({
      method: "GET",
      url: "https://backproof.vercel.app/api/product",
      headers: {
        "Content-Type": "application/json",
      },
      params: parameters,
    })
      .then((res) => {
        setAllData(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  };

  const data = {
    labels: ["Nodes whithout color", "Nodes color Blue", "Nodes color Red"],
    datasets: [
      {
        label: "# of Votes",
        data: allData[currentStep],
        backgroundColor: [
          "rgba(119,136,153,0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(119,136,153,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <ContainerCONTAINER>
      <ShowModalButton
        onClick={() => {
          setShowModal((prev) => !prev);
        }}
      >
        <span style={{ padding: "5px" }}>Display Algorithme </span>
        <span class="icon-eye"></span>
      </ShowModalButton>

      {showModal && (
        <ModalWrapper>
          <ModalBody>
            <img
              ref={ref}
              style={{ heigh: "40rem", width: "40rem" }}
              src={srcScreen}
            ></img>
          </ModalBody>
        </ModalWrapper>
      )}
      <ContainerParameters>
        <InputContainer>
          <VariableInput
            onChange={(e) =>
              setParameters({ ...parameters, nbNodes: e.target.value })
            }
            placeholder="nbNodes"
            value={parameters.nbNodes}
          ></VariableInput>
          <VariableInput
            onChange={(e) =>
              setParameters({ ...parameters, m: e.target.value })
            }
            placeholder="m"
            value={parameters.m}
          ></VariableInput>
          <VariableInput
            onChange={(e) =>
              setParameters({ ...parameters, k: e.target.value })
            }
            placeholder="k"
            value={parameters.k}
          ></VariableInput>
          <VariableInput
            onChange={(e) =>
              setParameters({ ...parameters, alpha: e.target.value })
            }
            value={parameters.alpha}
            placeholder="alpha"
          ></VariableInput>
          <ButtonSend
            onClick={() => {
              query(parameters);
              setCurrentParameters(parameters);
              setCurrentStep(0);
              setParameters(defaultParameters);
              setLoading(true);
              setError(false);
            }}
          >
            SEND
          </ButtonSend>
        </InputContainer>
        {currentParameters.nbNodes !== "" && (
          <CurrentParametersContainer>
            <Parameter>nb : {currentParameters.nbNodes}</Parameter>
            <Parameter>m : {currentParameters.m}</Parameter>
            <Parameter>k : {currentParameters.k}</Parameter>
            <Parameter>alpha : {currentParameters.alpha}</Parameter>
          </CurrentParametersContainer>
        )}
      </ContainerParameters>

      {error && (
        <ContainerContent>
          <span>Error set parameters again</span>
          {currentParameters.nbNodes > 100000 && (
            <span>, with 100 000 nodes maximum.</span>
          )}
        </ContainerContent>
      )}

      <ContainerContent
        display={allData[0][0] === 0 || error === true ? "none" : ""}
      >
        <HeaderContainer>
          <Button
            onClick={() => {
              if (currentStep > 0) setCurrentStep((prev) => prev - 1);
            }}
          >
            {currentStep === 0 ? "FIRST STEP" : "STEP BACK"}
          </Button>
          <StepContainer>Current step : {currentStep}</StepContainer>
          <Button
            onClick={() => {
              if (currentStep < allData.length - 1)
                setCurrentStep((prev) => prev + 1);
            }}
          >
            {currentStep === allData.length - 1 ? "LAST STEP" : "NEXT STEP"}
          </Button>
        </HeaderContainer>
        <PieContainer>
          {loading ? (
            <div style={{ margin: "10rem" }}>
              <Oval
                height={80}
                width={80}
                color="rgba(119,136,153,0.8)"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="rgba(119,136,153,0.2)"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          ) : (
            <Pie data={data} />
          )}
        </PieContainer>
        {!loading && (
          <FooterContainer>
            <span style={{ color: "rgba(119,136,153,0.8)" }}>
              {allData[currentStep][0]}
            </span>
            <span style={{ color: "rgba(54, 162, 235, 0.8)" }}>
              {allData[currentStep][1]}
            </span>
            <span style={{ color: "rgba(255, 99, 132, 1)" }}>
              {allData[currentStep][2]}
            </span>
          </FooterContainer>
        )}
      </ContainerContent>
    </ContainerCONTAINER>
  );
};

export default Container;
