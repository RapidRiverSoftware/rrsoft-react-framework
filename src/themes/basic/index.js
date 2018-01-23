// @flow
import { injectGlobal } from 'styled-components';

export default {
  register(core, options, next) {

    core.setState({ core: {theme: {color: { primary: 'red'}}}})


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
