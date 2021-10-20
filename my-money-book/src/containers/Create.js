import React from 'react'
import PropTypes from 'prop-types'
import CategorySelect from '../components/CategorySelect'
import { Tabs, Tab } from '../components/Tabs'
import PriceFrom from '../components/PriceForm'
import { testCategories } from '../testData'
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility'

const tabsText = [TYPE_OUTCOME, TYPE_INCOME]
class CreatePage extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
        selectedTab: TYPE_OUTCOME,
        selectedCategory: null,
        validationPassed: true,
      }
   }
   tabChange = (index) => {
     this.setState({
      selectedTab: tabsText[index],
     })
   }
   selectCategory = (category) => {
     this.setState({
        selectedCategory: category
     })
   }
   submitFrom = (data, isEditMode) => {
      console.log(data, isEditMode,this.state.selectedCategory)
      if (!this.state.selectedCategory) {
        this.setState({
          validationPassed: false
        })
        return
      }
      this.props.history.push('/')
   }
   cancelSubmit = () => {
    this.props.history.push('/')
   }
   render() {
       const { selectedTab, selectedCategory, validationPassed } = this.state
       const tabIndex = tabsText.findIndex(text => text === selectedTab)
       const filterCategories = testCategories.filter(category => category.type === selectedTab)
       const editItem = {
        "title": "buy stuff for kitten",
        "price": 100,
        "date": "2018-08-15",
        "monthCategory": "2018-8",
        "id": "_kly1klf4g",
        "cid": "1",
        "timestamp": 1534291200000
      }
       return (
           <div className="create-page py-3 px-3 rounded mt-3" style={{background: '#fff'}} >
              <Tabs activeIndex={tabIndex} onTabChange={this.tabChange}>
                 <Tab>支出</Tab>
                 <Tab>收入</Tab>
              </Tabs>
              <CategorySelect categories={filterCategories} 
                onSelectCategory={this.selectCategory}
                selectedCategory={selectedCategory}
              />
              <PriceFrom onFormSubmit = {this.submitFrom} 
                onCancelSubmit = {this.cancelSubmit}
                item = {editItem}
              />
              { !validationPassed &&
                <div className="alert alert-danger mt-5" role="alert">
                    请选择分类信息
                </div>
              }
           </div>
       )
   }
}

export default CreatePage