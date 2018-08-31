import React from 'react';
import {footer} from '../../home.scss'
/**
 * @name home页面的页脚
 */
export default function TextNode () {
  const date = new Date()
  const dateValue = " Date = " + date.getFullYear()+'/'+(+date.getMonth()+1)+'/'+date.getDate()
    return (
      <footer className={footer}>
        <ul>
          <li><b>const</b>{dateValue}</li>
          <li><b>const</b> UseTime = 4s</li>
          <li><b>const</b> Add=广东省深圳市</li>
          <li>WWW.VANOC.TOP</li>
          <li><a target="_blank" href="http://www.miitbeian.gov.cn/">粤ICP备17162184号-2</a></li>
        </ul>
      </footer>
    )
}
