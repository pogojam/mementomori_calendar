
import moment from 'moment'
const setBlock = (array,interval) => {
  const output =[]
  let temp = []
     for (let index = 0; index < array.length; index++) {
       if(index !== 0 && index %interval === 0){
         temp.push(array[index])
         output.push(temp)
         temp = []
       }
       else{
         if(index !==0){

         temp.push(array[index])
         }
       }
     } 
       return output
}
export function calcBoxes (dob,deathAge,type="week") {
   const today = new Date()
  const block = {
    weeks:260
  }
  switch (type) {
    case 'week':
      const weekArray = [...Array( Math.floor( deathAge *365 /7 ) ) ] 
      const weeks = []
      for(let i=0; i < weekArray.length ; i++){
        const date = moment(dob).add(i,'week')
          weeks.push({
            id:date.format("MM/DD/YYYY"),
            isChecked:date.isBefore(today)
          })
      }
        const BlockedWeeks = setBlock(weeks,block.weeks)
    return BlockedWeeks 
      break;
    default:
    return [...Array(  Math.floor( deathAge *365 /7 ) ) ] 
      break;
  }

}