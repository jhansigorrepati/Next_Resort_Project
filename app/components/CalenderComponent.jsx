
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange } from 'react-date-range';

import React from 'react'
import { useState } from 'react';

const CalenderComponent = ({onDatesSelect}) => {
    const[showCalender,setShowCalender]= useState(false)
    const[date,setDate]=useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
          }
    ])

    const [selectedDates,setSelectedDates] = useState(null)
    const handleSelectDtaes = async()=>{
        const startDate = date[0].startDate.toLocaleDateString()   //assigning dates here
        const endDate = date[0].endDate.toLocaleDateString()

        setSelectedDates(`Selected Dates: ${startDate}-${endDate}`)
        setShowCalender(false)
        const bookingDates ={startDate, endDate}
        console.log("Selected dates from calender: ",bookingDates)
        if(onDatesSelect){
            onDatesSelect(bookingDates)
        }
    }
    const currentDate = new Date().toDateString();
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate()+1)

    const formattedDate = nextDate.toDateString()
  return (
    <div className='calenderSection'>
        <div className="currentDate" onClick={()=>setShowCalender(!showCalender)}>
            {!selectedDates && (
                <>
                {`${currentDate}-${formattedDate}`}

                </>
            )}
            {selectedDates && (
                <div className='' style={{color:'red'}}>
                    {selectedDates}
                </div>
            )}

        </div>
        {showCalender &&
         <DateRange
         editableDateInputs={true}
         onChange={item => setDate([item.selection])}
         moveRangeOnFirstSelection={false}
         ranges={date}
         className='dateRange'
       />
        }

        <button onClick={handleSelectDtaes} className='calenderButton'>
            Select Dates
        </button>

    </div>
  )
}

export default CalenderComponent