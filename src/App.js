import {Grommet, Box,  Heading, DateInput, Text, Grid}  from 'grommet'
import React,{useState,useEffect} from 'react'
import moment from 'moment'
import Theme from './theme'
import Worker from 'workerize-loader!./worker'; // eslint-disable-line import/no-webpack-loader-syntax

const instance = new Worker()


function App() {
const [dob,setDob] = useState(moment( new Date ).subtract(15,'year').format("MM/DD/YYYY"))
const [deathAge,setDeathAge] = useState(80)

  const handleDob = (e) => {
   setDob(e.value) 
  }
  
  return (
    <Grommet theme={Theme}>
      <Heading size="xLarge" textAlign="center" justify="center"  >Memento Mori</Heading>
      <DOBSelector dob={dob} handleDob={handleDob}/>
        <DaysToLive deathAge={deathAge} dob={dob}/>
    </Grommet>
  );
}


const Cell = React.memo( ({isChecked}) => {
 return <Box   border style={{width:'100%',height:'100%',display:'table'}}>
   <div
   style={{
     width:'100%',
     height:"100%",
transition:'opacity .4s linear',backgroundColor:"black",opacity:isChecked?1:0
   }}
   />
   
 </Box> 
} )


const CellBlock =  ({cells,today,index}) => {
  const age = index *5
  const [bottom,setBottom] = useState(null)
  const [position,setPosition] = useState("relative")
  
  const handleStyles= ()=>{
  if(window.innerWidth > 600 && index % 2 !== 0){
  setBottom("inherit")
  }  
  else{
    return setBottom("0px")
  }
  }

useEffect(()=>{
  handleStyles()
  window.addEventListener('resize',handleStyles)
return ()=> window.removeEventListener('resize',handleStyles)
},[])
debugger
 return  <Box animation="fadeIn"><Grid

 style={{position:'relative'}}
 columns={["repeat(26,10px)"]}
 rows={["repeat(10,10px)"]}
 gap="xsmall"
 align="center"
 justify="center"
 >{ cells.map((cellData,i)=><Cell key={i} isChecked={cellData.isChecked} today={today}/>) }
<Text
style={{
  position:'absolute',
  right:"-20px",
  bottom
}}
size="xsmall"
>{age}</Text>
 </Grid> </Box>
} 


const DaysToLive = ({dob,deathAge}) => {
  const today = new Date()
  const [boxes,setBoxes] = useState([])
  const [hasMounted, sethasMounted] = useState(false)

useEffect(()=>{

instance.calcBoxes(moment(dob).format("MM/DD/YYYY"),deathAge,"week").then((boxes)=>{
setBoxes(boxes)
})

sethasMounted(true)
},[])

useEffect(() => {
 
 
  if(hasMounted && dob){
instance.calcBoxes(moment( dob ).format("MM/DD/YYYY"),deathAge,"week").then((boxes)=>{
setBoxes(boxes)
})
    }
  }, [dob])

 return <Grid
 style={{justifyContent:'center',maxWidth:'872px',marginLeft:'auto',marginRight:'auto',position:'relative'}}
 margin={{
   vertical:"small"
 }}
 gap="small"
 columns={['repeat(auto-fit,minmax(400px,49%))']}
 justify="center"
 >
{ 
boxes.map((data,i)=><CellBlock key={i+1} index={i+1} cells={data} today={today}/>)
 }
 </Grid> 
}


const DOBSelector = ({handleDob,dob}) => {
  
return<Box
border="horizontal"
pad="small"
align="center"
justify="between"
>
  <Text size="xsmall">DOB</Text>
<Box basis="50%">
  <DateInput
  
 format="mm/dd/yyyy" 
 style={{fontSize:".8em",fontWeight:100}}
  value={dob} onChange={handleDob}/>
</Box>

</Box>
}


export default App;
