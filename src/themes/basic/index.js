// @flow
import { injectGlobal } from 'styled-components';

export default {
  register(core, options, next) {
    const theme = {
      gap: n => ({
        1: '5px',
        2: '5px',
        3: '10px',
        4: '15px',
        5: '20px',
        6: '25px',
        7: '30px',
        8: '35px',
        9: '40px',
        10: '50px',
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
      primaryMenuTextColor: n => ({
        1: '#fefefe',
        2: '#fefefe',
        3: '#fefefe',
        4: '#ffffff',
        5: '#fefefe',
        6: '#ededed',
        7: '#fefefe',
        8: '#fefefe',
        9: '#fefefe',
        10: '#fefefe',
      }[n]),
      primaryMenuBgColor: n => ({
        1: '#303e4d',
        2: '#303e4d',
        3: '#856dac',
        4: '#4c3b67',
        5: '#2c223c',
        6: '#14101b',
        7: '#303e4d',
        8: '#303e4d',
        9: '#303e4d',
        10: '#303e4d',
      }[n]),
      primaryLabelColor: n => ({
        1: '#a9a9a9',
        2: '#a9a9a9',
        3: '#a9a9a9',
        4: '#a9a9a9',
        5: '#a9a9a9',
        6: '#a9a9a9',
        7: '#a9a9a9',
        8: '#a9a9a9',
        9: '#a9a9a9',
        10: '#a9a9a9',
      }[n]),
      secondaryLabelColor: n => ({
        1: '#009282',
        2: '#009282',
        3: '#009282',
        4: '#009282',
        5: '#009282',
        6: '#009282',
        7: '#009282',
        8: '#009282',
        9: '#009282',
        10: '#009282',
      }[n]),
      primaryBorderColor: n => ({
        1: '#bababa',
        2: '#bababa',
        3: '#bababa',
        4: '#bababa',
        5: '#bababa',
        6: '#bababa',
        7: '#bababa',
        8: '#bababa',
        9: '#bababa',
        10: '#bababa',
      }[n]),
      primaryTextColor: n => ({
        1: '#212121',
        2: '#212121',
        3: '#212121',
        4: '#212121',
        5: '#212121',
        6: '#212121',
        7: '#212121',
        8: '#212121',
        9: '#212121',
        10: '#212121',
      }[n]),
      primaryBgColor: n => ({
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

      input[type=submit],
      button[type=submit] {
        border: 0;
        padding: 15px 20px;
        font-size: 20px;
        background-color: #82cafa;
        color: white;
        cursor: pointer;
        width: 100%;
        font-weight: 500;
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

      label {
        cursor: pointer;
      }
    `;

    next()
  }
}
