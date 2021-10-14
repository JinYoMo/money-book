import React from 'react'
import PropTypes from 'prop-types'
import { padLeft, range } from '../utility'

class MonthPicker extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          isOpen: false,
          selectYear: this.props.year,
          selectMonth: this.props.month
        }
    }
    toggleDropdown = (event) => {
      event.preventDefault();
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
    selectYear = (event, yearNumber) => {
      event.preventDefault()
      this.setState({
        selectYear: yearNumber
      })
    }
    selectMonth = (event, monthNumber) => {
      event.preventDefault()
      this.setState({
        isOpen: false
      })
      this.props.onChange(this.state.selectYear, monthNumber)
    }
    render(){
        const {year, month} = this.props
        const { isOpen, selectYear, selectMonth } = this.state
        const monthRange = range(12,1)
        const yearRange = range(9,-4).map(number => number + year)
        return (
            <div className="dropdown month-picker-component">
                <h4>选择月份</h4>
                <button 
                  className="btn btn-lg btn-secondary dropdown-toggle"
                  onClick={this.toggleDropdown} 
                >
                    {`${year}年${padLeft(month)}月`}
                </button>
                { isOpen &&
                  <div className="dropdown-menu" style={{display:'block'}}>
                    <div className="row">
                        <div className="col border-right years-range">
                           {yearRange.map((yearNumber,index)=>
                             <a key={index} 
                               href="#"
                               onClick={(event) => {this.selectYear(event, yearNumber)}}
                               className={(yearNumber === selectYear) ? 'dropdown-item active':'dropdown-item'}
                              >
                                {yearNumber} 年
                             </a>
                           )}
                        </div>
                        <div className="col months-range">
                           {monthRange.map((monthNumber,index)=>
                             <a key={index} 
                               href="#"
                               onClick={(event) => {this.selectMonth(event, monthNumber)}}
                               className={(monthNumber === selectMonth) ? 'dropdown-item active':'dropdown-item'}
                             >
                                {padLeft(monthNumber)} 月
                             </a>
                           )}
                        </div>
                    </div>
                  </div>
                }
            </div>
        )
    }
}

MonthPicker.propsTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default MonthPicker