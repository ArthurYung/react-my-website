import React from 'react'
import LazyImg from '@c/lazyImg'
import Prism from 'prismjs'
import PopLink from '@c/poplink'
const gameImg = '//cdn.toofook.com/my-blog/work/gameImg.png'
const text = {
  init:`initPiece () {
        let _this = this
        this.pieces = {}  // 棋盘数组
        this.playA = []	  // 玩家A赢法统计
        this.playB = []	  // 玩家B赢法统计
        for (let i = 0; i < 15; i++){
            let n = {}
            for (let j = 0; j < 15; j++){
               [].push.call(n, 0)
            }
            [].push.call(this.pieces, n)
        }
        for (let i = 0; i < this.counts; i++) {
	    // this.counts为统计好的棋盘赢法总和
            this.playA[i] = 0
            this.playB[i] = 0
        }
        this.pieces._ = function (a, b, value) {
	    // 落子方法
            this[a][b] = _this.player
            _this.addChess.call(_this, a, b)  // 渲染棋子
            _this.isWinner.call(_this, a, b)  // 输赢判断
        }
    }`,
    main:`myWins () {
        this.wins = []
        this.counts = 0
        for (let i = 0; i < 15; i++) {
            this.wins[i] = []
            for( let j = 0; j < 15; j++){
                this.wins[i][j] = []
            }
        }
        for (let i = 0; i < 15; i++){
            for (let j = 0; j < 11; j++){
                for(let k = 0; k < 5; k++){
                    this.wins[i][j + k][this.counts] = true
                }
                this.counts ++
            }
        }
        for (let i = 0; i < 15; i++){
            for (let j = 0; j < 11; j++){
                for(let k = 0; k < 5; k++){
                    this.wins[j+k][i][this.counts] = true
                }
                this.counts++
            }
        }
        for (let i = 0; i < 11; i++){
            for (let j = 0; j < 11; j++){
                for(let k = 0; k < 5; k++){
                    this.wins[i + k][j + k][this.counts] = true
                }
                this.counts++
            }
        }
        for (let i = 0; i < 11; i++){
            for (let j = 14; j > 3; j--){
                for(let k = 0; k < 5; k++){
                    this.wins[i + k][j - k][this.counts] = true
                }
                this.counts++
            }
        }
    }`,
    winner:`isWinner (a, b) {
        for (let k = 0; k < this.counts; k++){
            if(this.wins[a][b][k]){
                if(this.player === 1){
                    this.playA[k] ++
                    this.playB[k] = 6
                }else{
                    this.playB[k] ++
                    this.playA[k] = 6
                }
            }
            if(this.playA[k] === 5 || this.playB[k] === 5){
                this.winner(this.player)
                return
            }
        }
    }`,
    ai:`rule(count, type) {
    if (count === 6) return 0
    return (
     count === 1 && (type === 1 ? 200 : 210))
     || (count === 2 && (type === 1 ? 400 : 420))
     || (count === 3 && (type === 1 ? 2000 : 2100))
     || (count === 4 && (type === 1 ? 10000 : 20000)
     )
   }
   aiPlay() {
    if (this.win) return
    this.myScore = []
    this.aiScore = []
    this.player = 2
    let counts = 0
    let a = 0
    let b = 0
    for (let i = 0; i < 15; i++) {
     this.myScore[i] = []
     this.aiScore[i] = []
     for (let j = 0; j < 15; j++) {
      this.myScore[i][j] = 0
      this.aiScore[i][j] = 0
     }
    }
    for (let i = 0; i < 15; i++) {
     for (let j = 0; j < 15; j++) {
      if (this.pieces[i][j] === 0) {
       for (let k = 0; k < this.counts; k++) {
        if (this.wins[i][j][k]) {
         this.myScore[i][j] = this.playA[k] ? (this.myScore[i][j] + this.rule(this.playA[k], 1)) : this.myScore[i][j]
         this.aiScore[i][j] = this.playB[k] ? (this.aiScore[i][j] + this.rule(this.playB[k], 2)) : this.aiScore[i][j]
        }
       }
       if (this.myScore[i][j] > counts) counts = this.myScore[i][j], a = i, b = j
       else if (this.myScore[i][j] === counts) if (this.aiScore[i][j] > this.aiScore[a][b]) a = i, b = j
       if (this.aiScore[i][j] > counts) counts = this.aiScore[i][j], a = i, b = j
       else if (this.aiScore[i][j] === counts) if (this.myScore[i][j] > this.myScore[a][b]) a = i, b = j
      }
     }
    }
    console.log(this.playA, this.playB, this.pieces)
    this.pieces._(a, b)
    this.player = 1
   }`
}

const initHtml = Prism.highlight(text.init,Prism.languages.javascript, 'javascript')
const mainHtml = Prism.highlight(text.main,Prism.languages.javascript, 'javascript')
const winnerHtml = Prism.highlight(text.winner,Prism.languages.javascript, 'javascript')
const aiHtml = Prism.highlight(text.ai,Prism.languages.javascript, 'javascript')

export default () => {
    return(
      <article className="work-pop-main work-pop-code">
        <h1>使用JS实现五子棋人机对战</h1>
        <p>js入门练习</p>
        <LazyImg w="800px" h="800px" src={gameImg}/>
        <h5>初始化</h5>
        <p>创建棋盘数组和玩家赢法数组，在棋盘数组内添加落子方法</p>
        <pre className="language-javascript" dangerouslySetInnerHTML={{__html:initHtml}}></pre> 
        <p style={{marginTop:'1.6rem'}}>创建棋盘赢法统计三维数组，遍历棋盘内每个点，该点每个方向连成5个子为一种方法，便利该方法下的5个点设为true作为标记,并统计赢法总和。</p>
        <pre className="language-javascript" dangerouslySetInnerHTML={{__html:mainHtml}}></pre> 
        <h5>赢法判断</h5>
        <p style={{marginTop:'1.6rem'}}>落子时的输赢判断，遍历改点所有存在的赢法k，玩家A赢法统计数组中的k项+1，玩家B赢法统计数组k项设为错误，当该项的值为5时，游戏结束。</p>
        <pre className="language-javascript" dangerouslySetInnerHTML={{__html:winnerHtml}}></pre> 
        <h5>AI设计</h5>
        <p style={{marginTop:'1.6rem'}}>建立玩家和AI的积分数组，当玩家落子时，遍历棋盘所有空位点玩家与AI各自的赢法，并换算成积分储存在玩家与AI的积分数组内，权重比较玩家与AI积分之和最高的点进行落子。</p>
        <pre className="language-javascript" dangerouslySetInnerHTML={{__html:aiHtml}}></pre> 
        <p style={{marginTop:'1.6rem'}}>这个五子棋其实很简单，重点在于赢法数组的计算；这里枚举了所有点获胜的可能性并进行统计和分析，在AI功能里还进行了赢法数组的积分操作。</p>
        <PopLink href='http://www.toofook.com/u-game'/>
      </article>
    )
};
