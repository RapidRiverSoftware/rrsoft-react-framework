// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Autocomplete from 'react-autocomplete';
import Inputbox from './Inputbox';

const initialState = {
  value: '',
  boxHeight: 20,
};

export default class Autocompletebox extends Component {
  static defaultProps = {
    onType: (val: string) => {
      console.log(val);
    },
    onBackspace: (val: string) => {
      console.log(val);
    },
    onEnter: (item: string) => {
      console.log(item);
    },
    onSelect: (item: string) => {
      console.log(item);
    },
    onFocus: () => {
      console.log('focus');
    },
  };

  props: {
    items: Array<Object>,
    matchState?: (state: Object, value: string) => boolean,
    placeholder?: string,
    renderInputWrapper?: (inputComponent: React.Element<any>) => React.Element<any>,
    renderItem?: (item: Object, isHighlighted: boolean) => React.Element<any>,
    onType: Function,
    onSelect: Function,
    onEnter: Function,
    onFocus: Function,
    onBackspace: Function,
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

  updateValue = (e: Object) => {
    this.props.onType(e.target.value);
    this.setState({ value: e.target.value });
  };

  clearValue = () => {
    this.props.onType('');
    this.setState({ value: '' });
  };

  updateSelectedItem = (val: string) => {
    const { items, onSelect } = this.props;
    const selectedItem = items.find(item => (typeof item === 'string' ? item : item.value).toString() === val.toString());
    onSelect(selectedItem);
    this.clearValue();
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
    } else if (e.which === 13) {
      if (e.target.value.toString().length) {
        e.preventDefault();
        this.props.onEnter(e.target.value);
        this.clearValue();
      }
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
    const { items, matchState, placeholder } = this.props;
    const { value } = this.state;

    return (
      <div ref={this.setAutocompleteRef}>
        <Autocomplete
          autoHighlight
          items={items}
          value={value}
          getItemValue={this.getItemValue}
          shouldItemRender={matchState || this.matchState}
          renderItem={this.renderItem}
          renderInput={this.renderInput}
          renderMenu={this.renderMenu}
          wrapperStyle={styles.wrapper}
          onChange={this.updateValue}
          onSelect={this.updateSelectedItem}
          inputProps={{
            placeholder,
          }}
        />
      </div>
    );
  }
}

const Menu = styled.div`
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 0;
  top: ${({ top }) => top || 0}px;
  width: 100%;
  max-height: 300px;
  overflow: auto;
`;

const Item = styled.div`
  cursor: pointer;

  ${({ isHighlighted }) => {
    if (isHighlighted) {
      return `
    `;
    }
    return `
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
