// @flow
import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import Autocompletebox from './Autocompletebox';
import TagInputbox from './TagInputbox';

type Props = {
  suggestItems: Array<Object>,
  tagItems: Array<Object>,
  onTagClick: string => void,
  onType: string => void,
  onSelect: string => void,
  onFocus: () => void,
  onBackspaceEmpty: () => void,
  onTagChange: (Array<Object>) => void,
  renderSuggestItem?: (item: Object, isHighlighted: boolean) => React.Element<any>,
};

export default class TagAutocompletebox extends Component {
  static defaultProps = {
    onType: (val: string) => {
      console.log(val);
    },
    onFocus: () => {
      console.log('focus');
    },
    onBackspaceEmpty: () => {},
    onTagChange: () => {},
    onSelect: () => {},
    onTagClick: () => {},
  };

  props: Props;

  componentWillReceiveProps(nextProps: Object) {
    if (!isEqual(nextProps.tagItems, this.props.tagItems)) {
      this.props.onTagChange(nextProps.tagItems);
    }
  }

  renderInputWrapper = (inputComponent: React.Element<any>) => {
    const { tagItems, disabled, onTagClick } = this.props;
    return <TagInputbox disabled={disabled} onTagClick={onTagClick} items={tagItems} input={inputComponent} />;
  };

  handleTyping = (val: string) => {
    this.props.onType(val);
  };

  handleBackspace = (val: string) => {
    if (!val) this.props.onBackspaceEmpty();
  };

  render() {
    const { suggestItems, renderSuggestItem, onEnter, onSelect, onFocus, ...props } = this.props;

    return (
      <Autocompletebox
        items={suggestItems}
        renderItem={renderSuggestItem}
        renderInputWrapper={this.renderInputWrapper}
        onType={this.handleTyping}
        onBackspace={this.handleBackspace}
        onFocus={onFocus}
        onSelect={onSelect}
        onEnter={onEnter}
        {...props}
      />
    );
  }
}
