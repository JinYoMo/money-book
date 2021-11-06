import React,{Component} from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Home from './containers/Home'
import Create from './containers/Create'
import { testItems, testCategories } from './testData'
import { parseToYearAndMonth, flatternArr, ID } from './utility'

export const AppContext = React.createContext()
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      items: flatternArr(testItems),
      categories: flatternArr(testCategories),
      currentDate: parseToYearAndMonth('2018/10/01'),
    }
    this.actions = {
      deleteItem: (item) => {
        delete this.state.items[item.id]
        this.setState({
          items: this.state.items
        })
      },
      createItem: (data, categoryId) => {
        const newId = ID()
        const parsedDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parsedDate.year}-${parsedDate.month}`
        data.timestamp = new Date(data.date).getTime()
        const newItem = {...data, id:newId, cid: categoryId}
        this.setState({
          items: { ...this.state.items, [newId]: newItem }
        })
      },
      updateItem: (item, updatedCategoryId) => {
        const parsedDate = parseToYearAndMonth(item.date)
        const modifedItem = {
          ...item,
          cid: updatedCategoryId,
          monthCategory: `${parsedDate.year}-${parsedDate.month}`,
          timestamp: new Date(item.date).getTime()
        }
        this.setState({
          items: { ...this.state.items, [modifedItem.id]: modifedItem }
        })
      },
      selectNewMonth: (year, month) => {
        this.setState({
          currentDate: {year, month}
        })
      }
    }
  }
  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        actions: this.actions
      }}>
        <Router>
          <div className="App">
            <ul>
              <Link to="/">Home</Link>
              <Link to="/create">Create</Link>
              <Link to="/edit/10">Edit</Link>
            </ul>
            <div className="container pb-5">
              <Route path="/" exact component={Home} />
              <Route path="/create" component={Create} />
              <Route path="/edit/:id" component={Create} />
            </div>
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
