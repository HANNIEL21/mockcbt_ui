import React, { useState } from 'react';

const OptionsWidget = ({ question, options, onAnswerSelect }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedOption) {
            console.log('Selected option:', selectedOption);
            // Pass the selected option to the parent component
            onAnswerSelect(selectedOption);
        } else {
            alert('Please select an option before submitting.');
        }
    };

    return (
        <div className="options-widget h-full">
            <form onSubmit={handleSubmit} className='h-3/4 flex flex-col justify-between'>
                <h3>{question}</h3>
                <div>
                    {options.map((option, index) => (
                        <div key={index} className="flex items-center mb-4">
                            <input
                                type="radio"
                                id={`option-${index}`}
                                name="option"
                                value={option}
                                checked={selectedOption === option}
                                onChange={handleOptionChange}
                                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            />
                            <label
                                htmlFor={`option-${index}`}
                                className="ml-2 text-lg text-gray-700"
                            >
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
};

export default OptionsWidget;
