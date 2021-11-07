import React,{Component} from 'react';
import Ionicon from 'react-ionicons';
import logo from '../logo.svg';
import { withRouter } from 'react-router-dom'
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME } from '../utility'
import PriceList from '../components/PriceList'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import TotalPrice from '../components/TotalPrice'
import Loader from '../components/Loader'
import { Tabs, Tab } from '../components/Tabs';
import withContext from '../WithContext'
  
const tabsText = [LIST_VIEW, CHART_VIEW]
class Home extends Component {
    constructor(props){
      super(props)
      this.state = {
        tabView: tabsText[0]
      }
    }
    componentDidMount(){
      this.props.actions.getInitalData().then(data => {
        console.log(data)
      })
    }
    changeView = (index) => {
      this.setState({
        tabView: tabsText[index]
      })
    }
    changeDate = (year, month) => {
      this.props.actions.selectNewMonth(year, month)
    }
    createItem = () => {
      this.props.history.push('/create')
    }
    modifyItem = (item) => {
      this.props.history.push(`/edit/${item.id}`)
    }
    deleteItem = (item) => {
      this.props.actions.deleteItem(item)
    }
    render(){
      const { data } = this.props
      const { items, categories, currentDate, isLoading } = data
      const { tabView } = this.state
      const tabIndex = tabsText.findIndex(tabText => tabText === tabView)
      const itemsWithCategory = Object.keys(items).map(id => {
        items[id].category = categories[items[id].cid]
        return items[id]
      })
      let totalIncome = 0, totalOutcome = 0
      itemsWithCategory.forEach(item => {
        if(item.category.type === TYPE_OUTCOME){
           totalOutcome += item.price
        } else {
            totalIncome += item.price
        }
      })
      return (
        <React.Fragment>
          <header className="App-header">
            <div className="row mb-5">
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="row">
              <div className="col">
                <MonthPicker 
                  year={ currentDate.year }
                  month={ currentDate.month }
                  onChange={this.changeDate}
                />
              </div>
              <div className="col">
                <TotalPrice 
                  income = {totalIncome}
                  outcome = {totalOutcome}
                />
              </div>
            </div>
          </header>
          <div className="content-area py-3 px-3" >
            { isLoading &&
              <Loader />
            }
            { !isLoading &&
              <React.Fragment>
                <Tabs activeIndex={tabIndex} onTabChange={this.changeView}>
                  <Tab>
                    <Ionicon 
                      className="rounded-circle mr-2"
                      fontSize="20px"
                      color={'#007bff'}
                      icon="ios-paper"
                    />
                      列表模式
                  </Tab>
                  <Tab>
                    <Ionicon 
                      className="rounded-circle mr-2"
                      fontSize="20px"
                      color={'#007bff'}
                      icon="ios-pie"
                    />
                      图表模式
                  </Tab>
                </Tabs>
                <CreateBtn onClick={this.createItem} />
                {
                  tabView === LIST_VIEW &&
                  <PriceList 
                    items={itemsWithCategory}
                    onModifyItem={this.modifyItem}
                    onDeleteItem={this.deleteItem}
                  />
                }
                { tabView === LIST_VIEW && itemsWithCategory.length === 0 &&
                  <div className="alert alert-light text-center no-record">
                    您还没有任何记账记录
                  </div>
                }
                {
                  tabView === CHART_VIEW &&
                  <h1 className="chart-title">这里是图表区域</h1>
                }
              </React.Fragment>
            }
          </div>
        </React.Fragment>
      )
    }
  }

  export default withRouter(withContext(Home))