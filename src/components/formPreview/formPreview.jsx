/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { generateFromCode, renderFormFields } from './generateCode';

export default function FormPreview({ formFields }) {
  const [activeTab, setActiveTab] = useState('preview');
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

  const formattedCode = generateFromCode(formFields);


  return (
    <div className="w-full h-full col-span-1 rounded-xl flex flex-col justify-center">
      <div className="w-full">
        <div className="flex justify-center w-fit mx-auto gap-2">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 border-b-2 ${activeTab === 'preview' ? 'border-blue-500' : 'border-transparent'}`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`px-4 py-2 border-b-2 ${activeTab === 'json' ? 'border-blue-500' : 'border-transparent'}`}
          >
            JSON
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 border-b-2 ${activeTab === 'code' ? 'border-blue-500' : 'border-transparent'}`}
          >
            Code
          </button>
        </div>
      </div>
      {/* preview */}
      {activeTab === 'preview' && (
          <div className="space-y-4 h-full md:max-h-[70vh] overflow-auto">
            {formFields.length > 0 ? (
              <form onSubmit={handleSubmit} className="space-y-4 py-5 max-w-lg mx-auto">
                {formFields.map((field) => renderFormFields(field, formValues, handleChange))}
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Submit
                </button>
              </form>
            ) : (
              <div className="h-[50vh] flex justify-center items-center">
                <p>No form element selected yet.</p>
              </div>
            )}
          </div>
        )}

        {/* json */}
        {activeTab === 'json' && (
          <div className="space-y-4 h-full md:max-h-[70vh] overflow-auto">
            {formFields.length > 0 ? (
              <pre className="p-4 text-sm rounded-lg">
                {JSON.stringify(formFields, null, 2)}
              </pre>
            ) : (
              <div className="h-[50vh] flex justify-center items-center">
                <p>No form element selected yet.</p>
              </div>
            )}
          </div>
        )}

        {/* code  */}
        {activeTab === 'code' && (
          <div className="relative">
            {formFields.length > 0 ? (
              <div>
                <button
                  className="absolute right-10 top-2 px-4 py-2 hover:bg-gray-700 rounded-md"
                  onClick={() => {
                    navigator.clipboard.writeText(formattedCode);
                    alert('Code copied to clipboard!');
                  }}
                >
                  Copy Code
                </button>
                <pre className="p-4 text-sm rounded-lg h-full md:max-h-[70vh] overflow-auto">
                  {formattedCode}
                </pre>
              </div>
            ) : (
              <div className="h-[50vh] flex justify-center items-center">
                <p>No form element selected yet.</p>
              </div>
            )}
          </div>
        )}
    </div>
  );
}
