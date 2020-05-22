'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定したHTML要素の子要素をすべて削除する関数
 * @param {HTMLElement} element HTML HTMLの要素
 */
function removeAllChildren(element){/*elementは上４つのconstで指定したどれか。この場合resultDevided*/
  while (element.firstChild){//子供の要素がある限り削除
    element.removeChild(element.firstChild); /*firstchildがある限り消し続ける*/
  }
}

assessmentButton.onclick = () => { /*この関数はボタンを押したときに反応させる*//*function()　は　() => に書き換えられる。アロー関数という*/
  const userName = userNameInput.value;/*テキストエリアに入力された文字列を受け取る。userNameInput.value*/
  if (userName.length === 0){
    return;/*直ちに関数の処理を終了するガード句*/
  }

  removeAllChildren(resultDivided);//消す

  //HTMLを足していく

 // 診断結果表示エリアの作成
 const header = document.createElement('h3');/*constで宣言してもプロパティは置き換えられる 人間はconstだけど、服は着せれる header.***みたいな*/
 header.innerText = '診断結果';
 resultDivided.appendChild(header);/*appendChildは子要素を追加する*/
 const paragraph = document.createElement('p');
 const result = assessment(userName);
 paragraph.innerText = result;
 resultDivided.appendChild(paragraph);

 //To Do ツイートエリアの作成
  removeAllChildren(tweetDivided);/*ツイートタグが毎回消える */
  const anchor = document.createElement('a');/*htmlのaタグの内容を作る宣言*/
  const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='/*URL設定 */
    + encodeURIComponent('あなたのいいところ診断します')/*日本語をエンコードに換算 */
    + '&ref_src=twsrc%5Etfw';
  
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';/*classタグを作る */
  anchor.setAttribute('data-text',result);
  anchor.innerText = 'Tweet #あなたのいいところ';

  tweetDivided.appendChild(anchor);
  twttr.widgets.load();/*twitterのaタグを見つけてボタンに変える */

};
/*innerhtmlはhtmlにhtmlを入れる。innnertextはテキストのみ*/
  /*returnは①関数のかえり値を指定　②関数の処理を終わっちゃう　の２つの機能がある*/

  userNameInput.onkeydown = (event) => {/*無名関数を代入することでキー入力時の処理が実装される */
    if (event.key === 'Enter') {
      assessmentButton.onclick(); /*既に関数は代入してあった。()で実行してあげればおｋ*/
    }
  };
  

const answers = [　
  /*varを色々使いすぎると混乱が起こる、使い捨てができないのでconstを使う。
  ｛｝内でletを使う。letは例えば問１のｘ＝１、問２のｘ＝２のように別にできる*/
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
  ];
/*{userName}の｛｝が文字として意味を持っている*/
/**
 * 名前の文字列渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {//アセスメント関数を作る
  //全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharcode = 0;
  for (let i =0; i < userName.length; i++){
    sumOfCharcode = sumOfCharcode + userName.charCodeAt(i);
  }
  //文字のコード番号の合計を回答の数で割って添え字の数値を求める
  const index = sumOfCharcode % answers.length;
  let result = answers[index];
  result = result.replace(/\{userName\}/g, userName)

  return result;
 }
 console.assert(
  assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
  assessment('太郎') === assessment('太郎'),
  '名前が同じでも結果が違うので、処理が正しくありません'
);
