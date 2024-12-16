/* eslint-disable react/prop-types */
import React from 'react'
import { LuPencil, LuTrash2 } from 'react-icons/lu'
export default function FieldInput({field,formFields,setFormFields,openEditDialog}) {

    const removeColumn = (field) => {
      setFormFields(formFields.filter(fields => fields.name !== field.name))
      }

  return (
    <div className="flex items-center gap-1 border rounded-xl px-3 py-1.5 w-full">
          <div className="flex items-center gap-5 w-full">
            <div className="w-full text-sm">{field.item}</div>
            <button
              size="icon"
              onClick={() => openEditDialog(field)}
            >
              <LuPencil />
            </button>
            <button 
            onClick={()=>removeColumn(field)}
            >
              <LuTrash2 />
            </button>
          </div>
</div>
  )
}
