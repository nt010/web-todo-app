import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

import style from './Item.module.css'

function Item({
  id,
  userId,
  title,
  isDone,
  createdAt,
  updatedAt,
  onUpdated,
  onDeleted,
}) {
  const deleteItem = async (id) => {
    try {
      const isDelete = confirm('削除しますか？')
      if (isDelete) {
        const { data } = await axios.delete('/api/todos/' + id)
        if (onDeleted) {
          onDeleted()
        }
      }
    } catch (err) {
      alert(
        `エラーが発生しました。 ${err?.message || 'Unknown Error'}, ${
          err?.response?.statusText || 'No server Message'
        }`
      )
      console.error('Error message:', err?.message)
      console.error('Error response:', err?.response)
    }
  }

  const updateDone = async (id, toDone) => {
    try {
      const toDoneUrl = toDone ? '/done' : '/undone'
      const { data } = await axios.patch('/api/todos/' + id + toDoneUrl)
      if (onUpdated) {
        onUpdated()
      }
    } catch (err) {
      alert(
        `エラーが発生しました。 ${err?.message || 'Unknown Error'}, ${
          err?.response?.statusText || 'No server Message'
        }`
      )
      console.error('Error message:', err?.message)
      console.error('Error response:', err?.response)
    }
  }

  return (
    <div>
      <div className={style.rowCover}>
        <input
          id={'todo-item-' + id}
          type="checkbox"
          disabled
          checked={isDone ? 'checked' : ''}
        />
        <label
          htmlFor={'todo-item-' + id}
          className={style.myCheckbox}
          onClick={() => updateDone(id, !isDone)}
        ></label>
        <div className={isDone ? style.complete : ''}>
          {title.split('\n').map((line, index) => (
            <span key={index}>
              {line} <br />
            </span>
          ))}
        </div>
      </div>
      <div className={style.rowSubMessage}>
        <span>作成日時: {createdAt}</span>/<span>更新日時: {updatedAt}</span>
      </div>

      <div className={style.coverButton}>
        <div className={style.spacer}></div>
        <button className={style.deleteButton} onClick={() => deleteItem(id)}>
          削除
        </button>
      </div>
    </div>
  )
}

export default Item