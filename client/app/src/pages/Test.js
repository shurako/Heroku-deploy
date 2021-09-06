import React, {useState} from 'react'
import { Droppable, DragDropContext, Draggable } from 'react-beautiful-dnd'
function Test() {

    const data1 = [
        { id: '1', data: 1 },
        { id: '2', data: 2 },
        { id: '7', data: 3 },
        { id: '10', data: 10 },
    ]
    const data2 = [
        { id: '4', data: 4 },
        { id: '5', data: 5 },
        { id: '6', data: 6 }
    ]

    const [data, setData] = useState(data1)
    const [dataa, setDataa] = useState(data2)

    const [columns, setColumns] = useState({
        ['1'] : {
            data: data1
        },
        ['2'] : {
            data: data2
        }
    })

const [test, setTest] = useState([
    {   id: '100',
        data : data1},
    {   id: '200',
        data: data2}
])

    const handleOnDragEnd = (result) => {
        console.log(result  )
        

        if(!result.destination) return;
        if(result.source.draggableId !== result.destination.droppableId){
            const source = test.find( column => column.id == result.source.droppableId )
            const dest = test.find( column => column.id == result.destination.droppableId )
            const [removed] = source.data.splice(result.source.index, 1)
            dest.data.splice(result.destination.index, 0, removed )
            console.log(removed, dest, test[1])

            
            
            
        }

        else{
            const source = test.find( column => column.id == result.source.droppableId )

            const [reorderedItem ] = source.data.splice(result.source.index, 1)
            source.data.splice(result.destination.index, 0, reorderedItem)
        }
        

    }

    return (
        <div style = {{display: 'flex'}}>
            <DragDropContext onDragEnd={handleOnDragEnd} >
               {test.map(column => <Droppable key ={column.id} droppableId = {column.id}>
                   {provided => (
                       <div
                        {...provided.droppableProps}
                        ref ={provided.innerRef}
                       >
                           {column.data.map((item, index) => <Draggable key = {item.id } draggableId = {item.id} index = {index}> 
                                {provided => (
                                    <div className = 'test' {...provided.dragHandleProps} {...provided.draggableProps} ref = {provided.innerRef} >
                                    {item.data}
                                </div>
                                )}
                           </Draggable>)}
                           {provided.placeholder}
                       </div>
                       
                   )}
               </Droppable>) }
     
                
            </DragDropContext>

            

                        
            
        </div>
    )
}

export default Test

// return items.map((item, index) => (
//     <Draggable
//       // adding a key is important!
//       key={item.id}
//       draggableId={item.id}
//       index={index}
//     >
//       {(provided, snapshot) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//         >
//           {item.content}
//         </div>
//       )}
//     </Draggable>
//   ));

