import { FC } from 'react';

interface AttributeProps {
  name: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const AttributeItem: FC<AttributeProps> = ({ name, value, onIncrement, onDecrement }) => {
  // Calculate ability modifier based on the attribute value
  const modifier = Math.floor((value - 10) / 2);
  const formattedModifier = modifier >= 0 ? `+${modifier}` : modifier.toString();

  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-200">
      <div className="w-1/3 text-left">
        <div className="font-medium">{name}</div>
        <div className="text-sm text-white">Modifier: {formattedModifier}</div>
      </div>
      <div className="flex items-center">
        <button
          onClick={onDecrement}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          -
        </button>
        <span className="mx-4 text-lg font-medium">{value}</span>
        <button
          onClick={onIncrement}
          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
};
