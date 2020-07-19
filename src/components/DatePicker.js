import React, { Component } from "react";
import propTypes from "prop-types";
import Reward from 'react-rewards';

import styled, {ThemeProvider} from "styled-components";

import {
  Window,
  WindowHeader,
  WindowContent,
  Select,
  NumberField,
  Cutout,
  Button,
  Toolbar,
} from "react95";
import original from "react95/dist/themes/original";
import rose from "react95/dist/themes/rose";
import azureOrange from "react95/dist/themes/azureOrange";
import counterStrike from "react95/dist/themes/counterStrike";
import rainyDay from "react95/dist/themes/rainyDay";
import travel from "react95/dist/themes/travel";
import marine from "react95/dist/themes/marine";
import olive from "react95/dist/themes/olive";
import theSixtiesUSA from "react95/dist/themes/theSixtiesUSA";
import candy from "react95/dist/themes/candy";
import tokyoDark from "react95/dist/themes/tokyoDark";
import vaporTeal from "react95/dist/themes/vaporTeal";
import matrix from "react95/dist/themes/matrix";
import modernDark from "react95/dist/themes/modernDark";
import millenium from "react95/dist/themes/millenium";
import bee from "react95/dist/themes/bee";
import ninjaTurtles from "react95/dist/themes/ninjaTurtles";
import pamelaAnderson from "react95/dist/themes/pamelaAnderson";
import tooSexy from "react95/dist/themes/tooSexy";
import vermillion from "react95/dist/themes/vermillion";
import brick from "react95/dist/themes/brick";
import eggplant from "react95/dist/themes/eggplant";
import lilac from "react95/dist/themes/lilac";

const themes = [
  original,
  vaporTeal,
  rose,
  olive,
  azureOrange,
  lilac,
  tokyoDark,
  rainyDay,
  travel,
  tooSexy,
  counterStrike,
  candy,
  eggplant,
  bee,
  brick,
  marine,
  theSixtiesUSA,
  modernDark,
  vermillion,
  millenium,
  matrix,
  ninjaTurtles,
  pamelaAnderson
];

const Calendar = styled(Cutout)`
  width: 234px;
  margin: 1rem 0;
  background: ${({ theme }) => theme.canvas};
`;

const WeekDays = styled.div`
  display: flex;
  background: ${({ theme }) => theme.materialDark};
  color: #dfe0e3;
`;

const Dates = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const DateItem = styled.div`
  text-align: center;
  height: 1.5em;
  line-height: 1.5em;
  width: 14.28%;
`;

const DateItemContent = styled.span`
  cursor: pointer;

  background: ${({ active, theme }) =>
    active ? theme.hoverBackground : "transparent"};
  color: ${({ active, theme }) =>
    active ? theme.canvasTextInvert : theme.canvasText};

  &:hover {
    border: 2px dashed
      ${({ theme, active }) => (active ? "none" : theme.materialDark)};
  }
`;

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function dayIndex(year, month, day) {
  return new Date(year, month, day).getDay();
}

class DatePicker extends Component {
  static propTypes = {
    className: propTypes.string,
    shadow: propTypes.bool,
    onAccept: propTypes.func,
    onCancel: propTypes.func,
    date: propTypes.instanceOf(Date),
  };

  static defaultProps = {
    shadow: true,
    className: "",
    onAccept: null,
    onCancel: null,
    date: null,
  };

  constructor(props) {
    super(props);

    const initialDate = this.convertDateToState(props.date || new Date());
    this.state = {...initialDate, themeIndex: 0};
  }

  convertDateToState = (date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return { day, month, year };
  };

  handleMonthSelect = (e) => this.setState({ month: e.target.value });

  handleYearSelect = (year) => this.setState({ year });

  handleDaySelect = (day) => this.setState({ day });

  handleAccept = () => {
    const { year, month, day } = this.state;
    const { onAccept } = this.props;
    const date = new Date(year, month, day);

    onAccept(date);
  };

  switchTheme = () => {
    this.reward.rewardMe();
    // console.log({themeIndex: (this.state.themeIndex+1)%(themes.length-1)});
    this.setState(prevState => ({themeIndex: (prevState.themeIndex+1)%(themes.length) }));
  }
  render() {
    let { day } = this.state;
    const { month, year } = this.state;
    const { shadow, className, onAccept, onCancel } = this.props;

    const months = [
      { value: 0, label: "January" },
      { value: 1, label: "February" },
      { value: 2, label: "March" },
      { value: 3, label: "April" },
      { value: 4, label: "May" },
      { value: 5, label: "June" },
      { value: 6, label: "July" },
      { value: 7, label: "August" },
      { value: 8, label: "September" },
      { value: 9, label: "October" },
      { value: 10, label: "November" },
      { value: 11, label: "December" },
    ];

    // eslint-disable-next-line
    const dayPickerItems = Array.apply(null, { length: 42 });
    const firstDayIndex = dayIndex(year, month, 1);

    const daysNumber = daysInMonth(year, month);
    day = day < daysNumber ? day : daysNumber;
    dayPickerItems.forEach((item, i) => {
      if (i >= firstDayIndex && i < daysNumber + firstDayIndex) {
        const dayNumber = i - firstDayIndex + 1;

        dayPickerItems[i] = (
          <DateItem
            // eslint-disable-next-line
            key={i}
            onClick={() => {
              this.handleDaySelect(dayNumber);
            }}
          >
            <DateItemContent active={dayNumber === day}>
              {dayNumber}
            </DateItemContent>
          </DateItem>
        );
      } else {
        dayPickerItems[i] = (
          <DateItem
            // eslint-disable-next-line
            key={i}
          />
        );
      }
    });

    return (
      <ThemeProvider theme={themes[this.state.themeIndex]}>

      <Window style={{ margin: 20 }} className={className} shadow={shadow}>
        <WindowHeader>
          <span style={{marginLeft: 4}}>
          Date
          </span>
        </WindowHeader>
        <WindowContent>
          <Toolbar noPadding style={{ justifyContent: "space-between" }}>
            <Select
              options={months}
              value={month}
              onChange={this.handleMonthSelect}
              width={128}
              menuMaxHeight={200}
            />
            <NumberField
              value={year}
              disableKeyboardInput
              onChange={this.handleYearSelect}
              width={100}
            />
          </Toolbar>
          <Calendar>
            <WeekDays>
              <DateItem>S</DateItem>
              <DateItem>M</DateItem>
              <DateItem>T</DateItem>
              <DateItem>W</DateItem>
              <DateItem>T</DateItem>
              <DateItem>F</DateItem>
              <DateItem>S</DateItem>
            </WeekDays>
            <Dates>{dayPickerItems}</Dates>
          </Calendar>
          <Toolbar noPadding style={{ justifyContent: "space-between" }}>
            <Button
              fullWidth
              disabled
            >
              Cancel
            </Button>
            <div style={{width: '100%'}}>

            <Reward
  ref={(ref) => { this.reward = ref }}
  type='confetti'
  config={{
    springAnimation: false,
    zIndex: 999,
    startVelocity: 40

  }}
>
            <Button
              fullWidth
              onClick={this.switchTheme}
              primary
              >
              Celebrate!
            </Button>
            </Reward>
              </div>
          </Toolbar>
        </WindowContent>
      </Window>
      </ThemeProvider>

    );
  }
}

export default DatePicker;
