/* eslint-disable react/prop-types */
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import FieldInput from './fieldInput';
import ButtonWithDropdown from '../dropDownContext/dropDownContext';

export default function FormFieldList({ formFields, setFormFields,openEditDialog }) {

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(formFields);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setFormFields(items);
    };

return (
    <div className=''>   
    <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="fieldItem">
        {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className='flex flex-col gap-2'>
            {formFields.map((item, index) => (
                <Draggable 
                    key={item.name || index} 
                    draggableId={`${item.name || index}`} 
                    index={index}>
                {(provided) => (
                    <div 
                    className="flex gap-2"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    >
                    <FieldInput
                    field={item}
                    index={index}
                    formFields={formFields}
                    setFormFields={setFormFields}
                    openEditDialog={openEditDialog}
                    />
                    <ButtonWithDropdown/>
                    {/* <button
                        size="icon"
                        className="text-center h-min rounded-full"
                        // onClick={handleDropDown}
                        >+</button>  */}
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
}
