import React from 'react'
import PropTypes from 'prop-types'
import CategorySelect from '../components/CategorySelect'

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
      }
   }
   selectCategory = (category) => {
     this.setState({
        selectedCategory: category
     })
   }
   render() {
       const { selectedCategory } = this.state
       return (
           <div className="create-page py-3 px-3 rounded mt-3" style={{background: '#fff'}} >
              <CategorySelect categories={filterCategories} 
                onSelectCategory={this.selectCategory}
                selectedCategory={selectedCategory}
                />
           </div>
       )
   }
}

export default CreatePage