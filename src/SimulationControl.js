import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import * as Helpers from './helpers';

const SimulationControl = styled.div`
  background-color: white;
  border-radius: 3px;
  box-shadow: 1px 1px 1px 1px #bb99ff;
  padding: 15px;
  margin-bottom: 10px;

  .header {
    align-items: center;
    display: flex;
    height: 35px;

    &.restart {
      margin-bottom: 15px;
    }

    .run {
      background-color: #26004d;
      border-radius: 2px;
      border: 0;
      color: white;
      cursor: pointer;
      font-size: 12px;
      height: 35px;
      padding: 0 10px;

      &:focus {
        outline: none;
        opacity: 0.8;
      }
    }
  }

  .stats {
    display: flex;
    justify-content: space-between;

    .stat {
      text-align: center;

      .label {
        height: 25px
        font-size: 12px;
        opacity: 0.7;
      }

      .value {
        height: 30px;
        line-height: 30px;
        font-weight: bold;
        font-size: 24px;
      }
    }
  }
`;


class SimulationControlComponent extends Component {

  static propTypes = {
    assignmentsLength: PropTypes.number.isRequired,
    endSimulation: PropTypes.func.isRequired,
    done: PropTypes.number,
    numPossibilities: PropTypes.number.isRequired,
    startSimulation: PropTypes.func.isRequired,
  }

  renderStat = (stat, key) => (
    <div className='stat' key={key}>
      <div className='label'>{stat.label}</div>
      <div className='value'>{stat.value}</div>
    </div>
  );

  render() {
    const { numPossibilities, startSimulation, endSimulation, done, assignmentsLength } = this.props;
    const notStarted = assignmentsLength === 0;
    const needsRestart = assignmentsLength > 0 && !R.isNil(done);
    const stats = [
      {
        label: 'Number of people',
        value: `${assignmentsLength} 😃`,
      },
      {
        label: 'Probabilty of collision',
        value: `${((assignmentsLength / numPossibilities) * 100).toFixed(2)}%`,
      },
      {
        label: 'Overall likelihood of result',
        value: `${Helpers.computeChance(assignmentsLength, numPossibilities).toFixed(2)}%`,
      },
    ];
    return (
      <SimulationControl>
        {(needsRestart || notStarted) && <div className={`header ${needsRestart ? 'restart' : ''}`}>
           <button className='run' onClick={startSimulation}>
            {needsRestart ? 'Restart' : 'Start'} Simulation
          </button>
        </div>}
        {!notStarted && <div className='stats'>
          {stats.map(this.renderStat)}
        </div>}
      </SimulationControl>
    );
  }
}

export default SimulationControlComponent;
