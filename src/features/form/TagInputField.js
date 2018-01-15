// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSuggestion } from './action'
import without from 'lodash/without'
import compact from 'lodash/compact'
import becomeField from './becomeField'
import TagAutocompleteInput from './input/TagAutocompleteInput'
import toJS from '../../util/redux/toJS'


class TagInputField extends Component {
  removeTag = item => {
    this.props.onChange(compact(without(this.props.value, item)))
  }

  removeLastTag = () => {
    if (!this.props.value.length) return
    this.props.onChange(this.props.value.slice(0, -1))
  }

  addTag = item => {
    const value = this.props.value || []
    if (item) {
      this.props.onChange(value.concat([item.value ? item.value : item]))
    }
  }

  search = (term) => {
    if (this.props.suggestUrl) {
      this.props.fetchSuggestion({
        name: this.props.name,
        url: this.props.suggestUrl,
        term,
      })
    }
  }

  render() {
    const { value, suggestItems, ...props } = this.props

    const noRepeatSuggestItems = without(suggestItems, ...(value||[]))

    return (
      <TagAutocompleteInput
        tagItems={value}
        suggestItems={noRepeatSuggestItems}
        onTagClick={this.removeTag}
        onType={this.search}
        onFocus={this.search}
        onBackspaceEmpty={this.removeLastTag}
        onSelect={this.addTag}
        onEnter={this.addTag}
        placeholder={this.props.placeholder}
        {...props}
        onBlur={this.addTag}
      />
    )
  }
}

const mapStateToProps = (state, props) => {
  const suggestItems = state.getIn(['featuresForm', 'suggestions', props.name])

  return {
    suggestItems: suggestItems ? suggestItems.toJS() : []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSuggestion(data) { dispatch(fetchSuggestion(data)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(becomeField(toJS(TagInputField)));
