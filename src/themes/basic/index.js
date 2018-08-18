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
        5: '#ececec'
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
        5: '#c2c2c2'
      }[5]),
      primaryMaskBgColor: n => ({
        5: 'linear-gradient(to bottom, #21252b, #212121)'
      }[5]),
      primaryBodyBgColor: n => ({
        5: '#fefefe'
      }[5]),
      primaryMenuActiveBgColor: n => ({
        5: '#e7fffc'
      }[5]),
      primaryMenuActiveShadow: n => ({
        5: ''
      }[5]),
      primaryTopBarBgColor: n => ({
        5: '#21252b'
      }[5]),
      primaryTableBgColor: n => ({
        5: 'rgba(255,255,255, 0.8)',
      }[5]),
      primaryLabelColor: n => ({
        5: '#ababab',
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
        1: '#e7fffc',
        2: '#b4fff7',
        3: '#00f8dd',
        4: '#00d6be',
        5: '#00d6be',
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
        4: '#00d6be',
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
      @font-face {
      	font-family: system-ui;
      	font-style: normal;
      	font-weight: 300;
      	src: local(".SFNSText-Light"), local(".HelveticaNeueDeskInterface-Light"), local(".LucidaGrandeUI"), local("Segoe UI Light"), local("Ubuntu Light"), local("Roboto-Light"), local("DroidSans"), local("Tahoma");
      }

      @font-face {
      	font-family: system-ui;
      	font-style: italic;
      	font-weight: 300;
      	src: local(".SFNSText-LightItalic"), local(".HelveticaNeueDeskInterface-Italic"), local(".LucidaGrandeUI"), local("Segoe UI Light Italic"), local("Ubuntu Light Italic"), local("Roboto-LightItalic"), local("DroidSans"), local("Tahoma");
      }

      @font-face {
      	font-family: system-ui;
      	font-style: normal;
      	font-weight: 400;
      	src: local(".SFNSText-Regular"), local(".HelveticaNeueDeskInterface-Regular"), local(".LucidaGrandeUI"), local("Segoe UI"), local("Ubuntu"), local("Roboto-Regular"), local("DroidSans"), local("Tahoma");
      }

      @font-face {
      	font-family: system-ui;
      	font-style: italic;
      	font-weight: 400;
      	src: local(".SFNSText-Italic"), local(".HelveticaNeueDeskInterface-Italic"), local(".LucidaGrandeUI"), local("Segoe UI Italic"), local("Ubuntu Italic"), local("Roboto-Italic"), local("DroidSans"), local("Tahoma");
      }

      @font-face {
      	font-family: system-ui;
      	font-style: normal;
      	font-weight: 500;
      	src: local(".SFNSText-Medium"), local(".HelveticaNeueDeskInterface-MediumP4"), local(".LucidaGrandeUI"), local("Segoe UI Semibold"), local("Ubuntu Medium"), local("Roboto-Medium"), local("DroidSans-Bold"), local("Tahoma Bold");
      }

      @font-face {
      	font-family: system-ui;
      	font-style: italic;
      	font-weight: 500;
      	src: local(".SFNSText-MediumItalic"), local(".HelveticaNeueDeskInterface-MediumItalicP4"), local(".LucidaGrandeUI"), local("Segoe UI Semibold Italic"), local("Ubuntu Medium Italic"), local("Roboto-MediumItalic"), local("DroidSans-Bold"), local("Tahoma Bold");
      }

      @font-face {
      	font-family: system-ui;
      	font-style: normal;
      	font-weight: 700;
      	src: local(".SFNSText-Bold"), local(".HelveticaNeueDeskInterface-Bold"), local(".LucidaGrandeUI"), local("Segoe UI Bold"), local("Ubuntu Bold"), local("Roboto-Bold"), local("DroidSans-Bold"), local("Tahoma Bold");
      }

      @font-face {
      	font-family: system-ui;
      	font-style: italic;
      	font-weight: 700;
      	src: local(".SFNSText-BoldItalic"), local(".HelveticaNeueDeskInterface-BoldItalic"), local(".LucidaGrandeUI"), local("Segoe UI Bold Italic"), local("Ubuntu Bold Italic"), local("Roboto-BoldItalic"), local("DroidSans-Bold"), local("Tahoma Bold");
      }

      body {
        font-size: 17px;
        line-height: 1.52947;
        font-weight: 400;
        letter-spacing: -0.021em;
        font-family: "system-ui";
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

      input,button,select {
        font-family: "system-ui";
      }

      button {
        border: 0;
        padding: 0 20px;
        cursor: pointer;
        font-weight: 500;
      }

      button,
      input[type=submit],
      button[type=submit] {
        border: 0;
        height: 50px;
        font-size: 20px;
        background-color: ${theme.primaryBgColor(4)};
        color: #fefefe;
        width: 100%;
        cursor: pointer;
        &:hover {
          background-color: ${theme.primaryBgColor(3)};
        }

        &.auto {
          width: auto;
          padding-left: 20px;
          padding-right: 20px;
        }

        &.full-height {
          height: 100%;
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

      a,
      button.link {
        background-color: transparent;
        color: ${theme.primaryColor(5)};
        &:hover {
          color: ${theme.primaryColor(4)};
          background-color: transparent;
        }
      }
      button.link {
        font-size: 20px;
        width: auto;
        height: auto;
        padding: 0 10px;
      }

      label {
        cursor: pointer;
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
