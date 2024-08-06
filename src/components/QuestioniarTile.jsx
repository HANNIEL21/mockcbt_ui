import React, { useState, useEffect } from 'react';

const QuestioniarTile = ({ title, options, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        handleChecked();
    }, [selectedOption]);

    const handleOptionSelect = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        onSelect(value);
    };

    const handleChecked = () => {
        const radios = document.getElementsByName('option');
        radios.forEach((radio) => {
            if (radio.value === selectedOption) {
                radio.checked = true;
            } else {
                radio.checked = false;
            }
        });
    };

    return (
        <div className="w-full border-b-2 py-3">
            <div className="flex justify-between items-center">
                <div className="w-3/4">
                    <h3 className="text-lg">{title}</h3>
                </div>
                <div className="w-1/4 flex justify-between">
                    {options.map((option, index) => (
                        <label key={index} className="inline-block">
                            <input
                                type="radio"
                                name="option"
                                value={`${option}-${index}`} // Unique value for each radio input
                                className="form-radio h-5 w-5"
                                onChange={handleOptionSelect}
                            />
                            <span className="ml-2">{option}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestioniarTile;
