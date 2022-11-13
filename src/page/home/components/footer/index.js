import React, { Component } from 'react';
import { footer } from '../../home.scss';
/**
 * @name home页面的页脚
 */
export default class HomeFooter extends Component {
  constructor() {
    super();
    this.state = this.initDateState();
  }

  initDateState() {
    const date = new Date();
    const dateValue =
      ' Date = ' +
      date.getFullYear() +
      '/' +
      (+date.getMonth() + 1) +
      '/' +
      date.getDate();

    const usedTime = window.__START_DATE__
      ? (date.getTime() - window.__START_DATE__) / 1000
      : 3;
    const timeValue = usedTime > 1 ? Math.ceil(usedTime) : usedTime.toFixed(1);

    return {
      dateValue,
      timeValue,
    };
  }

  render() {
    const { dateValue, timeValue } = this.state;
    return (
      <footer className={footer}>
        <ul>
          <li>
            <b>const</b>
            {dateValue}
          </li>
          <li>
            <b>const</b> UseTime = {timeValue}s
          </li>
          <li>
            <b>const</b> Add=广东省深圳市
          </li>
          <li>WWW.BRUCEAU.COM</li>
          <li>
            <a target="_blank" href="http://www.miitbeian.gov.cn/">
              粤ICP备17162184号-2
            </a>
          </li>
        </ul>
      </footer>
    );
  }
}
