import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

import List from './todo/List'
import NewItem from './todo/NewItem'

import style from './TodoRoot.module.css'

function TodoRoot() {
  const [items, setItems] = useState([])

  const fetchItems = async () => {
    try {
      const { headers, data } = await axios.get('/api/todos')
      setItems(data)
      // console.log('request headers', headers)
    } catch (err) {
      console.error('request error', err.request.headers)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const onUpdated = () => {
    fetchItems()
  }

  return (
    <div className={style.container}>
      <div className={style.row}>
        <h3> ToDoリスト一覧 </h3>
        <NewItem onUpdated={() => onUpdated()}></NewItem>
        <List items={items} onUpdated={() => onUpdated()}></List>
      </div>
    </div>
  )
}

export default TodoRoot

if (document.getElementById('todo-main')) {
  ReactDOM.render(<TodoRoot />, document.getElementById('todo-main'))
}