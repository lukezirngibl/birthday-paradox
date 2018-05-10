import React, { Component } from 'react';
import styled from 'styled-components';
import * as R from 'ramda';

import Calculator from './Calculator';
import SimulationDisplay from './SimulationDisplay';
import SimulationControl from './SimulationControl';
import * as Helpers from './helpers';

const AppWrapper = styled.div`
  background: linear-gradient(35deg, #b3ecff, #e6b3ff);
  min-height: 100vh;
  width: 100%;
`;

const ContentWrapper = styled.div`
  position: relative;
  height: 100%;
  margin: 0 auto;
  width: 856px;
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  height: 65px;
  padding-top: 15px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Question = styled.div`
  width: 100%;
  margin-bottom: 15px;
  font-size: 18px;
`;

const INITIAL_STATE = {
  count: 23,
  numPossibilities: 365,
  chance: null,
  simulation: {
    assignments: [],
    speed: 1,
    done: null,
  },
};


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
      chance: Helpers.computeChance(INITIAL_STATE.count, INITIAL_STATE.numPossibilities),
    };
  }

  onChangeParameter = (key) => (e) => {
    this.setState(
      { [key]: Number(e.target.value) },
      () => this.setState({ chance: Helpers.computeChance(this.state.count, this.state.numPossibilities) }),
    );
  }

  endSimulation = () => clearInterval(this.simulation);

  updateSimulation = () => {
    const i = Helpers.getRandomInt(this.state.numPossibilities);
    if (this.state.simulation.assignments.includes(i)) {
      this.setState(
        (state) => R.set(R.lensPath(['simulation', 'done']), i, state),
        this.endSimulation
      );
    } else {
      this.setState(
        (state) => R.set(
          R.lensPath(['simulation', 'assignments']),
          R.append(i, this.state.simulation.assignments),
          state
        )
      );
    }
  }

  startSimulation = () => {
    this.setState(
      R.set(
        R.lensPath(['simulation']),
        {
          assignments: [],
          speed: this.state.simulation.speed,
          done: null,
        },
        this.state
      ),
      this.updateSimulation,
    );
    this.simulation = setInterval(this.updateSimulation, 1000 * this.state.simulation.speed);
  }

  render() {
    return (
      <AppWrapper>
        <ContentWrapper>
          <Header>
            <Title>The Birthday Paradox</Title>
          </Header>
          <Question>
            How many people need to enter a room so that there is a greater than 50% chance that two of
            them have the same birthday?
          </Question>
          <MainWrapper>
            <Content>
              <SimulationControl
                startSimulation={this.startSimulation}
                endSimulation={this.endSimulation}
                numPossibilities={this.state.numPossibilities}
                done={this.state.simulation.done}
                assignmentsLength={R.length(this.state.simulation.assignments)}
              />
              <Calculator
                numPossibilities={this.state.numPossibilities}
                onChangeParameter={this.onChangeParameter}
                count={this.state.count}
                chance={this.state.chance}
              />
            </Content>
            <SimulationDisplay
              numPossibilities={this.state.numPossibilities}
              simulation={this.state.simulation}
            />
          </MainWrapper>
        </ContentWrapper>
      </AppWrapper>
    );
  }
}

export default App;
