import {useEffect, useState} from 'react'
import FieldSelector from '../fieldSelector/fieldSelector';
import FormFieldList from '../formFieldList/formFieldList';
import EditFieldModal from '../editFieldModal/editFieldModal';
import FormPreview from '../formPreview/formPreview';
export default function FormBuilder() {

    const [formFields, setFormFields] = useState([]);
    const [selectedField, setSelectedField] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const addFormField=(item, index)=>{

        const newFieldName = `name_${Math.random().toString().slice(-10)}`;
        console.log(newFieldName);

        const {label, description, placeholder} ={
            label:'',
            description:'',
            placeholder:'',
        }

        const newField = {
            checked: true,
            description: description || '',
            disabled: false,
            label: label || newFieldName,
            name: newFieldName,
            onChange: () => {},
            onSelect: () => {},
            placeholder: placeholder || 'Placeholder',
            required: true,
            rowIndex: index,
            setValue: () => {},
            value: '',
            item,
        }
        setFormFields([...formFields, newField])
    }


    //handle edit modal
    const openEditDialog =(field)=> {
        setSelectedField(field)
        setIsDialogOpen(true)
    }

    const updateFormField = (path, updates) => {
        const updatedFields = JSON.parse(JSON.stringify(formFields));
        let current = updatedFields;
        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]]
        }
        current[path[path.length - 1]] = {
        ...current[path[path.length - 1]],
        ...updates,
        }
        setFormFields(updatedFields)
    }


const findFieldPath = (
    fields,
    name,
    ) => {
    const search = (
        currentFields,
        currentPath,
    ) => {
        for (let i = 0; i < currentFields.length; i++) {
        const field = currentFields[i]
        if (Array.isArray(field)) {
            const result = search(field, [...currentPath, i])
            if (result) return result
        } else if (field.name === name) {
            return [...currentPath, i]
        }
        }
        return null
    }
    return search(fields, [])
    }

const handleSaveField = (updatedField) => {
    if (selectedField) {
        const path = findFieldPath(formFields, selectedField.name)
        if (path) {
        updateFormField(path, updatedField)
        }
    }
    setIsDialogOpen(false)
    }

    // console.log('>>',formFields);

  return (
    <div className='flex justify-between justify-items-center gap-2 mx-5 '>
        <FieldSelector 
        addFormField={addFormField}
        />
        <FormFieldList
        formFields={formFields}
        setFormFields={setFormFields}
        updateFormField={updateFormField}
        openEditDialog={openEditDialog}
        />
        <EditFieldModal
        isOpen={isDialogOpen}
        onClose={()=>setIsDialogOpen(false)}
        field={selectedField}
        onSave={handleSaveField}
        />
        <FormPreview formFields={formFields}/>
    </div>
  )
}
