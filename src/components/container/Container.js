import React, { useEffect, useState } from "react";
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
} from "./Container.styled";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Oval } from "react-loader-spinner";

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

  const query = (parameters) => {
    axios({
      method: "GET",
      url: "https://backproof.vercel.app/api/product",
      headers: {
        "Content-Type": "application/json",
      },
      params: parameters,
    }).then((res) => {
      setAllData(res.data);
      setLoading(false);
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

  return (
    <ContainerCONTAINER>
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

      <ContainerContent display={allData[0][0] === 0 ? "none" : ""}>
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
