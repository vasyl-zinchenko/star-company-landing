const styles = `
  <style>
    .select__arrow {
      position: absolute;
      width: 0;
      height: 0;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 8px solid #6d737b;
      right: 25px;
      top: 55px;
      z-index: 2;
      transition: 0.2s;
    }

    .select__body {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 31px;
      background-color: #ffffff;
      border-radius: 4px;
      width: 150px;
      padding: 0 10px;
      right: 5px;
      overflow: auto;
      max-height: 140px;
      z-index: 1;
    }

    .select__option {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 35px;
      padding: 4px 0;

      font-size: 14px;
      color: #6e747c;
      font-weight: 400;
      font-family: proxima-nova, sans-serif;
      text-align: center;
      transition: 0.2s;
      cursor: pointer;
    }

    .select__option:not(:first-child):hover {
      border-radius: 4px;
      background-color: #e2e2e2;
      font-weight: bold;
    }

    .select__option:not(:first-child) {
      display: none;
    }

    .select__option:first-child {
      position: relative;
    }


    *::-webkit-scrollbar {
      width: 4px;
    }

    *::-webkit-scrollbar-track {}

    *::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      border-radius: 20px;
    }

    @media(min-width: 425px) {
      .select__body {
        width: 230px;
        max-height: 200px
      }

      .select__option {
        font-size: 18px;
        min-height: 46px;
      }
    }

    @media(min-width: 768px) {
      .select__body {
        width: 352px;
        max-height: 390px
      }

      .select__option {
        font-size: 18px;
        min-height: 55px;
      }
    }
  </style>
`;

export default styles;
