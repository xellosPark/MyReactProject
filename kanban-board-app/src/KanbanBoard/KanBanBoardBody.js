// KanBanBoardBody.js
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './KanBanBoardBody.css';

// Helper function to reorder the task list
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// Moves an item from one list to another list.
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

function KanBanBoardBody() {
  const [state, setState] = useState({
    todo: [
      { id: 'todo-1', text: 'Issue 1' },
      { id: 'todo-2', text: 'Issue 2' }
    ],
    done: [
      { id: 'done-1', text: 'Completed Issue' }
    ]
  });

  // This function is called when the drag ends
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        state[source.droppableId],
        source.index,
        destination.index
      );

      const newState = {
        ...state,
        [source.droppableId]: items
      };

      setState(newState);
    } else {
      const result = move(
        state[source.droppableId],
        state[destination.droppableId],
        source,
        destination
      );

      setState({
        ...state,
        todo: result.todo,
        done: result.done
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        <Droppable droppableId="todo">
          {(provided) => (
            <div
              className="kanban-column"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="kanban-header">할 일</div>
              {state.todo.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      className="kanban-card"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.text}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="done">
          {(provided) => (
            <div
              className="kanban-column"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="kanban-header">완료된 일</div>
              {state.done.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      className="kanban-card"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.text}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default KanBanBoardBody;