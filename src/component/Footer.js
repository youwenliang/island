import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <section id="footer" className="bg-dark-gray pv4">
        <div className="mw8 center ph3">
          <div className="cf ph2-ns tl">
            <div className="fl w-100 w-50-ns pa2">
              <div className="white pv2">
                <h3 className="f2rem fw3">延伸資訊</h3>
                <p className="f6 o-70 fw4 lh-copy underline">
                  <a href="https://www.flickr.com/photos/kechinyuan/" target="_blank" rel="noopener noreferrer">環境照片資料庫：柯金源 </a>
                  <br/>
                  <a href="https://cyberisland.teldap.tw/" target="_blank" rel="noopener noreferrer">中研院 數位島嶼</a>
                  <br/>
                </p>
                <p className="f6 fw4 lh-normal">
                  看到更多環境議題，歡迎寄信給我們的島<br/>ourisland2013@gmail.com
                </p>
              </div>
            </div>
            <div className="fl w-100 w-50-ns pa2">
              <div className="white pv2 f4 fw5">
                <h3 className="f2rem fw3">製作團隊成員</h3>
                <p className="f6 o-70 fw4 lh-copy">
                  企劃：林燕如<br/>
                  文稿撰寫：于立平 張岱屏 陳佳利 胡慕情 陳寧<br/>
                  影片製作：陳慶鍾 陳添寶 賴冠丞 顏子惟 林容安 廖婕妤 葉鎮中<br/>
                  主要照片來源：柯金源 <br/>
                  網站規劃設計：胡馨文 吳培弘 梁祐文 鄭涵文 楊立銘
                </p>
              </div>
            </div>
          </div>
          <p className="f7 o-70 tc white fw3 lh-normal">財團法人公共電視文化事業基金會 版權所有 Public Television Service Foundation, All Right Reserved</p>
        </div>
      </section>
    );
  }
}

export default Footer;
