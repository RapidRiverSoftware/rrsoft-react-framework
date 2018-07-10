// @flow
import React, { Component } from 'react'
import styled, { withTheme } from 'styled-components';
import Outside from '../Click/Outside'

const Toggle = withTheme(styled.span`
  color: white;
  background-color: ${({ theme }) => theme.secondaryLabelColor(5)};
  border-radius: 50px;
  display: inline-block;
  width: ${({ theme }) => theme.fontSize(5)};
  height: ${({ theme }) => theme.fontSize(5)};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize(3)};
  margin-left: 5px;
`);

const Content = withTheme(styled.div`
  display: ${({ open }) => open ? 'block' : 'none'};
  position: absolute;
  min-width: 300px;
  color: #ffffff;
  background: ${({ theme }) => theme.primaryMaskBgColor(5)};
  font-size: ${({ theme }) => theme.fontSize(3)};
  padding: 10px;
  z-index: 10;
`);

const Container = withTheme(styled.div`
  position: relative;
  user-select: none;
`);

const ArrowUp = withTheme(styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #21252b;
  position: absolute;
  top: -4px;
  left: 9px;
`)

export default class Tooltip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  toggle = e => {
    e.preventDefault()
    this.setState({
      open: !this.state.open
    })
  }

  close = () => {
    this.setState({
      open: false
    })
  }

  render() {
    return <Outside onClick={this.close}>
      <Container>
        <Toggle onClick={this.toggle}>&#63;</Toggle>
        <Content open={this.state.open}>
          <ArrowUp />
          {this.props.children}
        </Content>
      </Container>
    </Outside>
  }
}
