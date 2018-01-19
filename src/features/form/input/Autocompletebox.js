// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Autocomplete from 'react-autocomplete';
import Inputbox from './Inputbox';
import Box from '../../../components/grouping/Box';
import { color, gap } from '../../../../style/config';

const initialState = {
  value: '',
  boxHeight: 20,
};

export default class Autocompletebox extends Component {
  static defaultProps = {
    onType: (val: string) => {}, // eslint-disable-line
    onBackspace: (val: string) => {}, // eslint-disable-line
    onSelect: (item: Object, updateValue: Function) => {}, // eslint-disable-line
    onFocus: () => {},
  };

  props: {
    items: Array<Object>,
    matchState?: (state: Object, value: string) => boolean,
    type?: string,
    name?: string,
    placeholder?: string,
    renderInputWrapper?: (inputComponent: React.Element<any>) => React.Element<any>,
    renderItem?: (item: Object, isHighlighted: boolean) => React.Element<any>,
    onType: Function,
    onSelect: Function,
    onFocus: Function,
    onBackspace: Function,
    onChange?: Function,
    value?: string,
  };
  input: Object;
  autocompleteRef: Object;

  state = initialState;

  componentDidMount() {
    this.input.addEventListener('keydown', this.handleKeyDown);
    this.input.addEventListener('focus', this.handleFocus);
  }

  componentWillUnmount() {
    this.input.removeEventListener('keydown', this.handleKeyDown);
    this.input.removeEventListener('focus', this.handleFocus);
  }

  componentWillReceiveProps() {
    this.updateHeight();
  }

  onChange = (event: any) => {
    this.updateValue(event.target.value);
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  updateValue = (val: string) => {
    this.props.onType(val);
    this.setState({ value: `${val}` });
  };

  updateSelectedItem = (val: string) => {
    const { items, onSelect } = this.props;
    const selectedItem = items.find(item => item.value.toString() === val.toString());
    let value = this.props.value || '';

    if (selectedItem !== undefined) {
      value = selectedItem.value;
    }

    if (this.props.onChange) {
      this.props.onChange(value);
    } else {
      this.updateValue(value);
    }

    onSelect(selectedItem, this.updateValue);
  };

  setInputRef = (ref: Object) => {
    this.input = ref;
  };

  setRealInputRef = (props: Object) => () => {
    props.ref(this.input);
  };

  setAutocompleteRef = (ref: Object) => {
    this.autocompleteRef = ref;
    if (ref) {
      this.updateHeight();
    }
  };

  handleKeyDown = (e: Object) => {
    if (e.which === 8) {
      this.props.onBackspace(e.target.value);
      this.updateHeight();
    }
  };

  handleFocus = () => {
    this.props.onFocus();
  };

  updateHeight = () => {
    const rect = this.autocompleteRef.getBoundingClientRect();
    this.setState({ boxHeight: rect.height });
  };

  getItemValue = (item: Object) => item.value.toString();
  matchState = (state: Object, value: string) =>
    state.label.toLowerCase().indexOf(value.toLowerCase()) !== -1;

  renderInput = (props: Object) => {
    const { renderInputWrapper } = this.props;

    const input = (
      <Inputbox {...props} innerRef={this.setInputRef} ref={this.setRealInputRef(props)} />
    );

    if (renderInputWrapper) {
      return renderInputWrapper(input);
    }

    return input;
  };

  renderItem = (item: Object, isHighlighted: boolean) => {
    const { renderItem } = this.props;

    return (
      <Item key={item.value} isHighlighted={isHighlighted}>
        {renderItem ? renderItem(item, isHighlighted) : item.label}
      </Item>
    );
  };

  renderMenu = (children: any) => <Menu top={this.state.boxHeight}>{children}</Menu>;

  render() {
    const { items, matchState, type, name, placeholder } = this.props;
    const { value } = this.state;

    return (
      <div ref={this.setAutocompleteRef}>
        <Autocomplete
          autoHighlight
          items={items}
          value={this.props.value || value}
          getItemValue={this.getItemValue}
          shouldItemRender={matchState || this.matchState}
          renderItem={this.renderItem}
          renderInput={this.renderInput}
          renderMenu={this.renderMenu}
          wrapperStyle={styles.wrapper}
          onChange={this.onChange}
          onSelect={this.updateSelectedItem}
          inputProps={{
            type,
            name,
            placeholder,
          }}
        />
      </div>
    );
  }
}

const Menu = styled(Box)`
  border: 1px solid ${color.xxxlighterNeutral};
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 0;
  top: ${({ top }) => top || 0}px;
  width: 100%;
  max-height: 300px;
  overflow: auto;
`;

const Item = styled.div`
  padding: ${gap.small}px;
  cursor: pointer;

  ${({ isHighlighted }) => {
    if (isHighlighted) {
      return `
      background-color: ${color.secondary};
      color: ${color.white};
    `;
    }
    return `
      background-color: ${color.white};
      color: black;
    `;
  }};
`;

const styles = {
  wrapper: {
    display: 'block',
    position: 'relative',
    zIndex: 99,
  },
};
