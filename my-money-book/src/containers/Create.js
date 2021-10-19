import React from 'react'
import PropTypes from 'prop-types'
import CategorySelect from '../components/CategorySelect'
import PriceFrom from '../components/PriceForm'

const filterCategories = [
    {
        "id": 1,
        "name": '旅行',
        "type": 'outcome',
        "iconName": 'ios-plane'
    },
    {
        "id": 2,
        "name": '理财',
        "type": 'income',
        "iconName": 'logo-yen'
    },
    {
        "id": 3,
        "name": '理财',
        "type": 'income',
        "iconName": 'logo-yen'
    }
]
class CreatePage extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
        selectedCategory: null,
        validationPassed: true,
      }
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
       const { selectedCategory, validationPassed } = this.state
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