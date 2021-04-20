// home
const glitch = '//cdn.toofook.com/my-blog/glitch.png'
const mail = '//cdn.toofook.com/my-blog/mail.png'
const smile = '//cdn.toofook.com/my-blog/smile.png'

const sup = '//cdn.toofook.com/my-blog/sup.png'
const readme = '//cdn.toofook.com/my-blog/readme.png'
const msg = '//cdn.toofook.com/my-blog/msg.png'
const setting = '//cdn.toofook.com/my-blog/setting.png'
const ox = '//cdn.toofook.com/my-blog/ox.png'

// work
const logo1 = '//cdn.toofook.com/my-blog/logo1.png'
const logo2 = '//cdn.toofook.com/my-blog/logo2.png'
const chick = '//cdn.toofook.com/my-blog/chicken.png'
const moneky = '//cdn.toofook.com/my-blog/moneky.png'
const game = '//cdn.toofook.com/my-blog/game.png'
const jquo = '//cdn.toofook.com/my-blog/jquo.png'
const pictring = '//cdn.toofook.com/my-blog/pictring.png'
const vue = '//cdn.toofook.com/my-blog/Vue.png'
const reacts = '//cdn.toofook.com/my-blog/react.png'
const blog = '//cdn.toofook.com/my-blog/blogs.png'

// about
const imail = '//cdn.toofook.com/my-blog/mymail.png'
const igit = '//cdn.toofook.com/my-blog/mygit.png'
const icode = '//cdn.toofook.com/my-blog/mycode.png'
const iadd = '//cdn.toofook.com/my-blog/myadd.png'
const icity = '//cdn.toofook.com/my-blog/citybg.png'
const emjz = '//cdn.toofook.com/my-blog/emoji/zzz.png'
const emjs = '//cdn.toofook.com/my-blog/emoji/sad.png'
const emja = '//cdn.toofook.com/my-blog/emoji/anger.png'
const emjd = '//cdn.toofook.com/my-blog/emoji/dis.png'
const emjh = '//cdn.toofook.com/my-blog/emoji/happy.png'
const icloud = '//cdn.toofook.com/my-blog/aboutbg.png'
const myfont = '//cdn.toofook.com/my-blog/myfont.png'

// 点赞gif动画
const g1 = '//cdn.toofook.com/my-blog/gifs/g1.gif'
const g2 = '//cdn.toofook.com/my-blog/gifs/g2.gif'
const g3 = '//cdn.toofook.com/my-blog/gifs/g3.gif'
const g4 = '//cdn.toofook.com/my-blog/gifs/g4.gif'
const g5 = '//cdn.toofook.com/my-blog/gifs/g5.gif'
const g6 = '//cdn.toofook.com/my-blog/gifs/g6.gif'
const g7 = '//cdn.toofook.com/my-blog/gifs/g7.gif'
const g8 = '//cdn.toofook.com/my-blog/gifs/g8.gif'
const g9 = '//cdn.toofook.com/my-blog/gifs/g9.gif'
const g10 = '//cdn.toofook.com/my-blog/gifs/g10.gif'
const g11 = '//cdn.toofook.com/my-blog/gifs/g11.gif'
const g12 = '//cdn.toofook.com/my-blog/gifs/g12.gif'
const g13 = '//cdn.toofook.com/my-blog/gifs/g13.gif'
const g14 = '//cdn.toofook.com/my-blog/gifs/g14.gif'
const g15 = '//cdn.toofook.com/my-blog/gifs/g15.gif'
const g16 = '//cdn.toofook.com/my-blog/gifs/g16.gif'
const g17 = '//cdn.toofook.com/my-blog/gifs/g17.gif'
const g18 = '//cdn.toofook.com/my-blog/gifs/g18.gif'

const parrotSrc =  [
      g1,g2,g3,g4,g5,g6,g7,g8,g9,g10,g11,g12,g13,g14,g15,g16,g17,g18
    ] 

const homeIcon = {
  sup,
  readme,
  msg,
  setting,
  ox
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
