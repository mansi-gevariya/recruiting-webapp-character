import { FC, useState } from 'react';
import { CLASS_LIST } from '../../../consts';
import { Attributes, Class } from '../../../types'; // adjust the path as needed

interface ClassListProps {
  attributes: Record<string, number>;
}

export const ClassList: FC<ClassListProps> = ({ attributes }) => {
  const [selectedClassName, setSelectedClassName] = useState<Class | null>(null);
  const [selectedClassAttributes, setSelectedClassAttributes] = useState<Attributes | null>(null);

  const handleOpen = (className: Class) => {
    const selectedClass = CLASS_LIST[className];
    setSelectedClassName(className);
    setSelectedClassAttributes(selectedClass);
  };

  const handleClose = () => {
    setSelectedClassName(null);
    setSelectedClassAttributes(null);
  };

  return (
    <div className="w-1/3 p-4 mx-8 bg-gray-600 border-gray-300 rounded-2xl my-6 text-left">
      <h2 className="text-2xl font-bold mb-4">Class List</h2>
      <div className="space-y-2">
        {(Object.keys(CLASS_LIST) as Class[]).map((className) => {
          const requirements = CLASS_LIST[className];
          // Check if all required attributes are met (current value is greater than or equal to the requirement)
          const meetsRequirements = Object.entries(requirements).every(
            ([attr, reqValue]) => attributes[attr] >= reqValue
          );

          return (
            <div
              key={className}
              onClick={() => handleOpen(className)}
              className={`cursor-pointer p-2 transition-colors text-white border-b border-gray-300 ${
                meetsRequirements ? 'bg-green-500 rounded border-b-0' : ''
              }`}
            >
              {className}
            </div>
          );
        })}
      </div>

      {selectedClassAttributes && selectedClassName && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg relative max-w-md w-full text-black">
            <h3 className="text-xl font-bold mb-5">{selectedClassName} Minimum Requirements</h3>
            <ul className="list-disc list-inside">
              {Object.keys(selectedClassAttributes).map((attribute) => (
                <li key={attribute}>
                  {attribute}: {selectedClassAttributes[attribute]}
                </li>
              ))}
            </ul>
            <button
              onClick={handleClose}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
