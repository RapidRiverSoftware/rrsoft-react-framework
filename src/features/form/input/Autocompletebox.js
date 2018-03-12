// @flow
import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
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
    onBlur: () => {
      console.log('blur');
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
    onBlur: Function,
    onBackspace: Function,
  };
  input: Object;
  autocompleteRef: Object;

  state = initialState;

  componentDidMount() {
    this.input.addEventListener('keydown', this.handleKeyDown);
    this.input.addEventListener('focus', this.handleFocus);
    this.input.addEventListener('blur', this.handleBlur);
  }

  componentWillUnmount() {
    this.input.removeEventListener('keydown', this.handleKeyDown);
    this.input.removeEventListener('focus', this.handleFocus);
    this.input.removeEventListener('blur', this.handleBlur);
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

  handleBlur = () => {
    // this.props.onBlur();
  };

  updateHeight = () => {
    const rect = this.autocompleteRef.getBoundingClientRect();
    this.setState({ boxHeight: rect.height });
  };

  normalizedItemValue = (item) => typeof item === 'string' ? item : item.value.toString()
  normalizedItemLabel = (item) => typeof item === 'string' ? item : item.label.toString()

  getItemValue = (item: Object|String) => this.normalizedItemValue(item)
  matchState = (state: Object, value: string) =>
    this.normalizedItemLabel(state).toLowerCase().indexOf(value.toLowerCase()) !== -1;

  renderInput = (props: Object) => {
    const { autoFocus, disabled, renderInputWrapper, id } = this.props;

    const input = (
      <Inputbox disabled={disabled} autoFocus={autoFocus} {...props} innerRef={this.setInputRef} ref={this.setRealInputRef(props)} id={id} />
    );

    if (renderInputWrapper) {
      return renderInputWrapper(input);
    }

    return input;
  };

  renderItem = (item: Object, isHighlighted: boolean) => {
    const { renderItem } = this.props;

    return (
      <Item key={this.normalizedItemValue(item)} isHighlighted={isHighlighted}>
        {renderItem ? renderItem(item, isHighlighted) : this.normalizedItemLabel(item)}
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

const Menu = withTheme(styled.div`
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 0;
  top: ${({ top }) => top || 0}px;
  width: 100%;
  max-height: 300px;
  overflow: auto;
`);

const Item = withTheme(styled.div`
  padding: 10px;
  cursor: pointer;

  ${({ isHighlighted, theme }) => {
    if (isHighlighted) {
      return `
        color: ${theme.primaryMenuFocusTextColor(5)};
        background-color: ${theme.primaryMenuFocusBgColor(5)};
      `;
    }
    return `
      color: ${theme.primaryMenuTextColor(5)};
      background-color: ${theme.primaryMenuBgColor(5)};
    `;
  }};
`);

const styles = {
  wrapper: {
    display: 'block',
    position: 'relative',
    zIndex: 99,
  },
};
