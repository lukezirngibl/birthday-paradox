import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CalculatorWrapper = styled.div`
  background-color: white;
  border-radius: 3px;
  box-shadow: 1px 1px 1px 1px #bb99ff;
  display: flex;
  flex-direction: column;
  flex: 0 0 280px;
  padding: 25px;

  .parameter {
    align-items: center;
    background-color: #f2f0f5;
    border-radius: 20px;
    display: flex;
    margin-bottom: 10px;
    width: 100%;

    &:last-child {
      margin-bottom: 0;
    }

    &.final {
      flex-direction: column;

      .label {
        flex: 0 0 25px;
        padding-bottom: 0;
        flex-grow: 0;
      }

      .value {
        flex: 0 0 50px;
        line-height: 50px;
        padding-bottom: 10px;
      }
    }

    .label {
      padding: 10px 10px 10px 15px;
      flex-grow: 1;
    }

    .value {
      flex:  0 0 200px;
      font-size: 40px;
      line-height: 80px;
      font-family: 'system-ui';
      font-weight: bold;
      text-align: center;
    }

    input.count,
    input.num-possibilities {
      background: 0;
      border: 0;
      cursor: pointer;
      flex:  0 0 200px;
      font-size: 50px;
      font-weight: bold;
      height: 80px;
      text-align: center;

      &:focus {
        outline: none;
      }

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        opacity: 1;
      }
    }
  }
`;

export default class Calculator extends Component {

  static propTypes = {
    chance: PropTypes.number,
    count: PropTypes.number.isRequired,
    numPossibilities: PropTypes.number.isRequired,
    onChangeParameter: PropTypes.func.isRequired,
  }

  displayChance = () => {
    const { count, numPossibilities, chance } = this.props;
    if (this.props.count > numPossibilities) {
      return '100.0000000';
    } else if (chance === Number.NEGATIVE_INFINITY || isNaN(chance)) {
      return '99.99999999';
    } else {
      return chance.toFixed(9);
    }
  }

  render() {
    const { chance, numPossibilities, count, onChangeParameter } = this.props;
    return (
      <CalculatorWrapper>
        <div className='parameter'>
          <div className='label'>
            Number of people in the room
          </div>
          <input
            type='number'
            className='count'
             min={1}
             max={505}
             onChange={onChangeParameter('count')}
             value={count}
           />
        </div>
        <div className='parameter'>
          <div className='label'>
            Number of birthday possibilities
          </div>
          <input
            type='number'
            className='num-possibilities'
             min={1}
             max={559}
             onChange={onChangeParameter('numPossibilities')}
             value={numPossibilities}
           />
        </div>
        <div className='parameter final'>
          <div className='label'>
            The probability that two people in the room will have the same birthday
          </div>
          <div className='value'>
            {this.displayChance()}%
          </div>
        </div>
      </CalculatorWrapper>
    );
  }
}
