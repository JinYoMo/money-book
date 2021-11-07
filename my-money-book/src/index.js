import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import axios from 'axios'
import App from './App'

// axios.get('/items').then(res=>{
//   console.log(res)
// })

const newItem = {
  "title": "请别人唱歌",
  "price": 10000,
  "date": "2019-01-05",
  "monthCategory": "2019-1",
  "timestamp": 1546646400000,
  "id": "_cg4a9gzya11",
  "cid": "1"
}
axios.post('/items',newItem).then(res=>{
  console.log(res)
})

ReactDOM.render(<App />, document.getElementById('root'));