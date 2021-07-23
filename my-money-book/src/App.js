import React,{Compontent} from 'react'
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { LIST_VIEW, CHART_VIEW } from './utility'
import PriceList from './components/PriceList'
import ViewTab from './components/ViewTab'
import MonthPicker from './components/MonthPicker'

const items=[
  {
    id:1,
    title:'去云南旅游',
    price:200,
    date:'2018-09-10',
    category:{
      id:1,
      name:"旅行",
      type:'outcome',
      iconName:'ios-plane'
    }
  },
  {
    id:2,
    title:'去云南旅游',
    price:400,
    date:'2018-09-10',
    category:{
      id:1,
      name:"旅行",
      type:'income',
      iconName:'ios-plane'
    }
  }
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <ViewTab activeTab={LIST_VIEW} onTabChange={(view) => {console.log(view)}} />
      <PriceList 
        items={items} 
        onModifyItem={(item)=>alert(item.id)} 
        onDeleteItem={(item)=>alert(item.id)}/>
      <MonthPicker 
        year={2018}
        month={5}
        onChange={(year, month) => { console.log(year, month) }}
      />
    </div>
  );
}

export default App;
