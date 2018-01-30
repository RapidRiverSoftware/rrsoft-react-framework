// @flow
import { injectGlobal } from 'styled-components';

export default {
  register(core, options, next) {
    const theme = {
      gap: n => ({
        1: 5,
        2: 5,
        3: 10,
        4: 15,
        5: 20,
        6: 25,
        7: 30,
        8: 35,
        9: 40,
        10: 50,
      }[n]),
      fontSize: n => ({
        1: '10px',
        2: '11px',
        3: '13px',
        4: '15px',
        5: '17px',
        6: '20px',
        7: '22px',
        8: '25px',
        9: '30px',
        10: '35px',
      }[n]),
      primaryMenuBgColor: n => ({
        5: '#fefefe'
      }[5]),
      primaryMenuTextColor: n => ({
        5: '#212121'
      }[5]),
      primaryMenuFocusBgColor: n => ({
        5: '#009282'
      }[5]),
      primaryMenuFocusTextColor: n => ({
        5: '#ffffff'
      }[5]),
      primaryTagDisabledTextColor: n => ({
        5: '#656565'
      }[5]),
      primaryTagDisabledBgColor: n => ({
        5: '#d3d3d3'
      }[5]),
      primaryTagTextColor: n => ({
        5: '#ffffff'
      }[5]),
      primaryTagBgColor: n => ({
        5: '#009282'
      }[5]),
      secondaryTagTextColor: n => ({
        5: '#ffffff'
      }[5]),
      secondaryTagBgColor: n => ({
        5: '#b1b1b1'
      }[5]),
      primaryMaskBgColor: n => ({
        5: 'linear-gradient(to bottom, #21252b, #212121)'
      }[5]),
      primaryBodyBgColor: n => ({
        5: '#fefefe'
      }[5]),
      primaryMenuActiveBgColor: n => ({
        5: 'linear-gradient(-150deg, #fdfff3, #fefefe)'
      }[5]),
      primaryMenuActiveShadow: n => ({
        5: 'inset 2px 3px 1px -1px #c2c2c2'
      }[5]),
      primaryTopBarBgColor: n => ({
        5: 'linear-gradient(to bottom, #21252b, #212121)'
      }[5]),
      primaryTableBgColor: n => ({
        5: 'rgba(255,255,255, 0.8)',
      }[5]),
      primaryLabelColor: n => ({
        5: '#b1b1b1',
      }[5]),
      secondaryLabelColor: n => ({
        5: '#00d6be',
      }[5]),
      primaryBorderColor: n => ({
        2: '#ececec',
        3: '#d3d3d3',
        4: '#c2c2c2',
        5: '#b1b1b1',
      }[n]),
      primaryTextColor: n => ({
        5: '#212121',
      }[5]),
      primaryBgColor: n => ({
        1: '#f8fffe',
        2: '#b4fff7',
        3: '#00f8dd',
        4: '#00d6be',
        5: '#009282',
        6: '#007064',
        7: '#004e46',
        8: '#001b18',
        9: '#000a09',
        10: '#000000',
      }[n]),
      primaryColor: n => ({
        1: '#003282',
        2: '#003282',
        3: '#003282',
        4: '#009282',
        5: '#009282',
        6: '#009282',
        7: '#009282',
        8: '#009282',
        9: '#009282',
        10: '#003282',
      }[n]),
      secondaryColor: n => ({
        1: '#003282',
        2: '#003282',
        3: '#003282',
        4: '#009282',
        5: '#009282',
        6: '#009282',
        7: '#009282',
        8: '#009282',
        9: '#009282',
        10: '#003282',
      }[n]),
      neutralColor: n => ({
        1: '#003282',
        2: '#003282',
        3: '#003282',
        4: '#009282',
        5: '#009282',
        6: '#009282',
        7: '#009282',
        8: '#009282',
        9: '#009282',
        10: '#003282',
      }[n]),
      fontWeight: n => ({
        1: 100,
        2: 100,
        3: 200,
        4: 300,
        5: 400,
        6: 500,
        7: 600,
        8: 700,
        9: 800,
        10: 900,
      }[n])
    };

    core.setState({ core: { theme } })

    injectGlobal`
      body {
        font-size: 17px;
        line-height: 1.52947;
        font-weight: 400;
        letter-spacing: -0.021em;
        font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
        color: #212121;
        background-color: #fefefe;
        font-style: normal;
        margin: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
      }

      h1 {
        font-size: 30px;
        font-weight: 500;
        margin: 20px 0;
      }

      button {
        border: 0;
        padding: 0 20px;
        cursor: pointer;
        font-weight: 500;
      }

      input[type=submit],
      button[type=submit] {
        height: 50px;
        font-size: 20px;
        background-color: ${theme.primaryBgColor(4)};
        color: #fefefe;
        width: 100%;
        &:hover {
          background-color: ${theme.primaryBgColor(3)};
        }
      }

      input[type=submit]:focus,
      input[type=button]:focus,
      button:focus {
        outline: none;
      }

      input[type=submit]:disabled,
      input[type=button]:disabled,
      button:disabled {
        cursor: not-allowed;
        background-color: #ccc;
      }

      button.link {
        font-size: 20px;
        background-color: transparent;
        color: ${theme.primaryColor(5)};
        padding: 0 10px;
      }

      label {
        cursor: pointer;
        color: ${theme.primaryLabelColor(5)};
      }

      table {
        border-spacing: 0;
      }

      div {
        box-sizing: border-box;
      }
    `;

    next()
  }
}
