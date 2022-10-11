import React from 'react'
import ReactDOM from 'react-dom'

import List from './todo/List'

function TodoRoot() {
  return (
    <div>
      <List></List>
    </div>
  )
}

export default TodoRoot

if (document.getElementById('todo-main')) {
  ReactDOM.render(<TodoRoot />, document.getElementById('todo-main'))
}