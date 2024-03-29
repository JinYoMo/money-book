import React,{Component} from 'react';
import Ionicon from 'react-ionicons';
import logo from '../logo.svg';
import { withRouter } from 'react-router-dom'
import PieChart from '../components/PieChart'
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME } from '../utility'
import PriceList from '../components/PriceList'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import TotalPrice from '../components/TotalPrice'
import Loader from '../components/Loader'
import { Tabs, Tab } from '../components/Tabs';
import withContext from '../WithContext'
  
const tabsText = [LIST_VIEW, CHART_VIEW]

const generateChartDataByCategory = (items, type = TYPE_INCOME) => {
  let categoryMap = {}
  items.filter(item => item.category.type === type).forEach(item => {
    if(categoryMap[item.cid]){
      categoryMap[item.cid].value += item.price * 1
      categoryMap[item.cid].items.push(item.id)
    }else{
      categoryMap[item.cid] = {
        name: item.category.name,
        value: item.price * 1,
        items: [item.id]
      }
    }
  })
  return Object.keys(categoryMap).map(mapKey => ( { ...categoryMap[mapKey] }))
}
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
      const chartOutcomDataByCategory = generateChartDataByCategory(itemsWithCategory, TYPE_OUTCOME)
      const chartIncomeDataByCategory = generateChartDataByCategory(itemsWithCategory, TYPE_INCOME)

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
                  <React.Fragment>
                    <PieChart title="本月支出" categoryData={chartOutcomDataByCategory} />
                    <PieChart title="本月收入" categoryData={chartIncomeDataByCategory} />
                  </React.Fragment>
                }
              </React.Fragment>
            }
          </div>
        </React.Fragment>
      )
    }
  }

  export default withRouter(withContext(Home))