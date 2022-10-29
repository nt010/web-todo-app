import React from 'react'

import Item from './Item'
import style from './List.module.css'

function List({ items, onUpdated }) {
  const contents = items.map((item, index) => (
    <div key={item.id}>
      {index !== 0 ? <hr className={style.boarder} /> : <></>}
      <Item
        id={item.id}
        userId={item.user_id}
        isDone={item.is_done}
        title={item.title}
        createdAt={item.created_at}
        updatedAt={item.updated_at}
        onUpdated={() => {
          onUpdated()
        }}
        onDeleted={() => {
          onUpdated()
        }}
      />
    </div>
  ))

  return (
    <>
      <div className={style.cover}>
        <div className={style.coverTitle}>一覧</div>
        <div className={style.coverList}>
          {contents}
          {items.length == 0 ? 'アイテムなし' : ''}
        </div>
      </div>
    </>
  )
}

export default List