
export const generateImport=()=> {

    const importSet=new Set([
    '"use strict"',
    'import { useState } from "react"',
    ]);
  return importSet;
}

export const renderFields=(fields)=>{
    return fields.map(fieldOrGroup=>{
    if (Array.isArray(fieldOrGroup)) {
        const colSpan = fieldOrGroup.length === 2 ? 6 : 4
        return `
        <div className="grid grid-cols-12 gap-4">
        ${fieldOrGroup
            .map(
            (field) => `
        <div className="col-span-${colSpan}">
            ${generateCodeSnippet(field)}
        </div>
        `,
            )
            .join('')}
        </div>`
        } else {
        return generateCodeSnippet(fieldOrGroup)
        }
    })
        .join('\n        ')
}

export const generateCodeSnippet=(field)=>{
    const item =field.item.toLowerCase();
    switch(item) {
        case 'checkbox':
            return `
            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <section>
            <input
                type='checkbox'
                checked={field.value}
                onCheckedChange={field.onChange}
                ${field.disabled ? 'disabled' : ''}
            />
            </section>
            <div className="space-y-1 leading-none">
            <label>${field.label}</label>
            </div>
            </div>
            `;
        case 'input':
            return `
            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <section>
            <input
                type='text'
                checked={field.value}
                onCheckedChange={field.onChange}
                ${field.disabled ? 'disabled' : ''}
            />
            </section>
            <div className="space-y-1 leading-none">
            <label>${field.label}</label>
            </div>
            </div>
            `
        default:
            return null;
    }
}

export const generateFromCode=(formFields)=>{
    const imports = Array.from(generateImport()).join('\n');
    
    const component=`
    export default function MyForm() {
        const [formValues, setFormValues] = useState(() => {
        const defaultValues = {};
        formFields.forEach((field) => {
        defaultValues[field.name] = field.value || '';
        });
        return defaultValues;
    });

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormValues((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formValues);
    };

    return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        ${renderFields(formFields)}
        <Button type="submit">Submit</Button>
    </form>
    )
`;

return imports + '\n\n' + component;
}


export const renderFormFields = (field, formValues,handleChange) => {
    switch (field?.item.toLowerCase()) {
        case 'checkbox':
        return (
            <div key={field.name} className="flex items-center space-x-2">
            <input
                type="checkbox"
                id={field.name}
                name={field.name}
                checked={formValues[field.name]}
                disabled={field.disabled}
                onChange={handleChange}
                className="rounded-md border-gray-300"
            />
            <label htmlFor={field.name}>{field.label}</label>
            </div>
        );
        case 'input':
        return (
            <div key={field.name} className="flex flex-col space-y-1">
            <label htmlFor={field.name}>{field.label}</label>
            <input
                type="text"
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={formValues[field.name]}
                disabled={field.disabled}
                required={field.required}
                onChange={handleChange}
                className="border rounded-md px-2 py-1"
            />
            </div>
        );
        default:
        return null;
    }
    };