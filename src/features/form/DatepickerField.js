import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { injectGlobal } from 'styled-components';

import 'react-datepicker/dist/react-datepicker.css';

import becomeField from './becomeField';
import { weight, color, font, fontFamily } from '../../../style/config';
import CalendarIcon from '../../components/icon/Calendar';
import InputboxWithIcon from './input/InputboxWithIcon';

type Props = {
  onClick: string,
  value: string,
};
/* eslint-disable react/prefer-stateless-function */
class CustomDatePickerInput extends Component {
  props: Props;

  focus = () => {
    this.inputRef.focus();
  }

  setInputGroup = (ref) => {
    this.inputRef = ref;
  }

  render() {
    return (<InputboxWithIcon
      innerRef={this.setInputGroup}
      icon={<CalendarIcon width={20} height={20} />}
      {...this.props}
    />);
  }
}
/* eslint-enable react/prefer-stateless-function */

type DatePickerProps = {
  value: null | string,
  placeholder: string,
  onChange: Function,
}
const DatePickerInput = ({
  value,
  onChange,
  placeholder,
  isActive,
  ...props
}: DatePickerProps) => (<DatePicker
  dateFormat="YYYY-MM-DD"
  customInput={<CustomDatePickerInput isActive={isActive} />}
  selected={value && moment(value, [moment.ISO_8601, 'YYYY-MM-DD'])}
  onChange={onChange}
  placeholderText={placeholder}
  width={400}
  popperModifiers={{
    offset: {
      enabled: true,
      offset: '-70px',
    },
  }}
  {...props}
/>);

/* eslint-disable no-unused-expressions */
injectGlobal`
  .react-datepicker {
    font-family: ${fontFamily};
    font-size: ${font.base};
    color: ${color.primary};
    border: 1px solid ${color.xxlightNeutral};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 0;
  }
  .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle::before, .react-datepicker__year-read-view--down-arrow::before, .react-datepicker__month-read-view--down-arrow::before {
    border-top-color: ${color.xxlightNeutral};
  }
  .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle, .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before {
    border-bottom-color: ${color.xxxlighterNeutral};
  }
  .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before {
    border-bottom-color: ${color.xxlightNeutral};
  }
  .react-datepicker__header {
    background-color: ${color.xxxlighterNeutral};
    border-bottom-color: ${color.xxlightNeutral};
    border-radius: 0;
  }
  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    display: block;
  }
  .react-datepicker__current-month {
    font-size: ${font.large};
    margin-top: 7px;
    margin-bottom: 10px;
  }
  .react-datepicker__navigation {
    top: 20px;
  }
  .react-datepicker__navigation--previous {
    border-right-color: ${color.darkerNeutral};
    &:hover {
      border-right-color: ${color.darkerNeutral};
      opacity: 0.5;
    }
  }
  .react-datepicker__navigation--next {
    border-left-color: ${color.darkerNeutral};
    &:hover {
      border-left-color: ${color.darkerNeutral};
      opacity: 0.5;
    }
  }
  .react-datepicker__day-name,
  .react-datepicker__day {
    width: 3.2rem;
    line-height: 2.3rem;
    margin: 0;
  }
  .react-datepicker__day--today {
    color: ${color.secondary};
    font-weight: ${weight.xxxbold};
  }
  .react-datepicker__month {
    margin: 1px;
  }
  .react-datepicker__day:hover {
    background-color: ${color.xxlightNeutral};
    border-radius: 0;
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range,
  .react-datepicker__day--selected:hover, .react-datepicker__day--in-selecting-range:hover, .react-datepicker__day--in-range:hover {
    background-color: ${color.secondary};
    border-radius: 0;

    &.react-datepicker__day--today {
      color: white;
    }
  }
  .react-datepicker__triangle {
    left: 90px;
  }
`;
/* eslint-enable no-unused-expressions */

export default becomeField(DatePickerInput);
