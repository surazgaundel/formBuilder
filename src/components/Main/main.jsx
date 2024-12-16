import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Main = () => {
  const [fields, setFields] = useState([]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    const [dropIndex] = items.splice(result.destination.index, 1);

    setFields([...items, reorderedItem, ...items.slice(dropIndex)]);
  };

  const addField = (type) => {
    setFields([...fields, { id: `field-${fields.length + 1}`, type }]);
  };

  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  return (
    <div className="form-builder">
      <h2>Form Builder</h2>
      <button onClick={() => addField('text')}>Add Text Field</button>
      <button onClick={() => addField('email')}>Add Email Field</button>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div 
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {field.type}
                      <button onClick={() => removeField(field.id)}>Remove</button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Main;
