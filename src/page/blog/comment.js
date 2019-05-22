import React from 'react'
import comCss from './comment.scss'
import moment from 'moment'
export default props => {
  return (
    <div className={comCss['comment-item']}>
      <span className={comCss['comment-item-img']} style={{backgroundImage: `url('${props.data.user.avatar_url}')`}} />
      <div className={comCss['comment-item-box']}>
        <div className={comCss['comment-item-context']}>
          <h3>{props.data.user.login}<span>{`${moment(props.data.created_at).format('YYYY-MM-DD')}`}</span></h3>
          <article>{props.data.body}</article>
        </div>
      </div>
    </div>
  )
}