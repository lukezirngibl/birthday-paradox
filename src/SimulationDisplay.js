import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as R from 'ramda';

const SimulateWrapper = styled.div`
  flex-grow: 1;
  margin-left: 10px;
  flex: 0 0 396px;
  height: 600px;
  display: flex;
  flex-direction: column;

  .header {
    flex: 0 0 35px;
    width: 100%;
    display: flex;
    justify-content: flex-end;;
    align-items: center;

    .run {
      font-size: 12px
      color: #c61aff;
      padding: 3px 5px;
      text-decoration: underline;
    }
  }

  .possibilities-wrapper {
    flex-grow: 1;
    width: 100%;
    border: 1px solid #c61aff;

    .possibility {
      height: 20px;
      width: 20px;
      margin: 1px;
      background-color: rgba(255, 255, 255, 0.4);
      float: left;
      line-height: 20px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      .num {
        font-size: 7px;
        opacity: 0.3;
      }

      &.is-done {
        background-color: transparent;

        .person:first-child {
          left: -4px;
          top: -4px
        }
        .person:last-child {
          bottom: -7px;
          right: -7px;
          top: auto;
          left: auto;
        }
      }

      .person {
        position: absolute;
        left: 2px;
        top: 2px;
      }
    }
  }
`;

export default class Simulation extends Component {

  static propTypes = {
    simulation: PropTypes.object.isRequired,
    numPossibilities: PropTypes.number.isRequired,
    startSimulation: PropTypes.func.isRequired,
    updateSimulation: PropTypes.func.isRequired,
  }

  renderPossibility = (k) => {
    const occupied = this.props.simulation.assignments.includes(k);
    const isDone = this.props.simulation.done === k;
    return (
      <div className={`possibility ${isDone ? 'is-done' : ''}`} key={k}>
        {occupied && <span className='person' role='img' aria-label='person'>{isDone ? '😍' : '😃'}</span>}
        {isDone && <span className='person' role='img' aria-label='person'>😍</span>}
        {!occupied && <div className='num'>{k + 1}</div>}
      </div>
    );
  }

  render() {
    const { numPossibilities } = this.props;
    return (
      <SimulateWrapper>
        <div className='possibilities-wrapper'>
          {R.range(0, numPossibilities).map(this.renderPossibility)}
        </div>
      </SimulateWrapper>
    );
  }
}
