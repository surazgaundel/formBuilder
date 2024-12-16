import React from 'react'
import {fieldTypes} from '../../utils/formItem'
export default function FieldSelector({addFormField}) {
  return (
    <div className='flex flex-col gap-2 w-max ml-3 mr-20'>
        {fieldTypes.map(({id,name})=>{
          return(
            <button
            key={id}
            onClick={() => addFormField(name,0)}
            className="rounded-full"
            >
              {name}
            </button>
          )
        })}
    </div>
  )
}
