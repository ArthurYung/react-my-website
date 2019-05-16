// home
const glitch = 'http://cdn.toofook.com/my-blog/glitch.png'
const mail = 'http://cdn.toofook.com/my-blog/mail.png'
const smile = 'http://cdn.toofook.com/my-blog/smile.png'

const sup = 'http://cdn.toofook.com/my-blog/sup.png'
const readme = 'http://cdn.toofook.com/my-blog/readme.png'
const msg = 'http://cdn.toofook.com/my-blog/msg.png'
const setting = 'http://cdn.toofook.com/my-blog/setting.png'

// work
const logo1 = 'http://cdn.toofook.com/my-blog/logo1.png'
const logo2 = 'http://cdn.toofook.com/my-blog/logo2.png'
const chick = 'http://cdn.toofook.com/my-blog/chicken.png'
const moneky = 'http://cdn.toofook.com/my-blog/moneky.png'
const game = 'http://cdn.toofook.com/my-blog/game.png'
const jquo = 'http://cdn.toofook.com/my-blog/jquo.png'
const pictring = 'http://cdn.toofook.com/my-blog/pictring.png'
const vue = 'http://cdn.toofook.com/my-blog/Vue.png'
const reacts = 'http://cdn.toofook.com/my-blog/react.png'
const blog = 'http://cdn.toofook.com/my-blog/blogs.png'

// about
const imail = 'http://cdn.toofook.com/my-blog/mymail.png'
const igit = 'http://cdn.toofook.com/my-blog/mygit.png'
const icode = 'http://cdn.toofook.com/my-blog/mycode.png'
const iadd = 'http://cdn.toofook.com/my-blog/myadd.png'
const icity = 'http://cdn.toofook.com/my-blog/citybg.png'
const emjz = 'http://cdn.toofook.com/my-blog/emoji/zzz.png'
const emjs = 'http://cdn.toofook.com/my-blog/emoji/sad.png'
const emja = 'http://cdn.toofook.com/my-blog/emoji/anger.png'
const emjd = 'http://cdn.toofook.com/my-blog/emoji/dis.png'
const emjh = 'http://cdn.toofook.com/my-blog/emoji/happy.png'
const icloud = 'http://cdn.toofook.com/my-blog/aboutbg.png'
const myfont = 'http://cdn.toofook.com/my-blog/myfont.png'

// 点赞gif动画
const g1 = 'http://cdn.toofook.com/my-blog/gifs/g1.gif'
const g2 = 'http://cdn.toofook.com/my-blog/gifs/g2.gif'
const g3 = 'http://cdn.toofook.com/my-blog/gifs/g3.gif'
const g4 = 'http://cdn.toofook.com/my-blog/gifs/g4.gif'
const g5 = 'http://cdn.toofook.com/my-blog/gifs/g5.gif'
const g6 = 'http://cdn.toofook.com/my-blog/gifs/g6.gif'
const g7 = 'http://cdn.toofook.com/my-blog/gifs/g7.gif'
const g8 = 'http://cdn.toofook.com/my-blog/gifs/g8.gif'
const g9 = 'http://cdn.toofook.com/my-blog/gifs/g9.gif'
const g10 = 'http://cdn.toofook.com/my-blog/gifs/g10.gif'
const g11 = 'http://cdn.toofook.com/my-blog/gifs/g11.gif'
const g12 = 'http://cdn.toofook.com/my-blog/gifs/g12.gif'
const g13 = 'http://cdn.toofook.com/my-blog/gifs/g13.gif'
const g14 = 'http://cdn.toofook.com/my-blog/gifs/g14.gif'
const g15 = 'http://cdn.toofook.com/my-blog/gifs/g15.gif'
const g16 = 'http://cdn.toofook.com/my-blog/gifs/g16.gif'
const g17 = 'http://cdn.toofook.com/my-blog/gifs/g17.gif'
const g18 = 'http://cdn.toofook.com/my-blog/gifs/g18.gif'

const parrotSrc =  [
      g1,g2,g3,g4,g5,g6,g7,g8,g9,g10,g11,g12,g13,g14,g15,g16,g17,g18
    ] 

const homeIcon = {
  sup,
  readme,
  msg,
  setting
}

const homeImg = { 
  glitch,
  mail,
  smile
}

const aboutImg = {
  imail,
  igit,
  icode,
  iadd,
  icity,
  emjz,
  emjs,
  emja,
  emjd,
  emjh,
  icloud,
  myfont
}

const workIcon = {
  logo1,
  logo2,
  chick,
  moneky,
  game,
  jquo,
  pictring,
  vue,
  reacts,
  blog
}

let parrotUrl = {}
parrotSrc.map((url)=>{
  [].push.call(parrotUrl,url)
})



export {homeIcon, homeImg, workIcon, parrotUrl, aboutImg}
