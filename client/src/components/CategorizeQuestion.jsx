import React, { useState } from "react";

const CategorizeQuestion = ({ questionIndex, updateQuestionData }) => {
    const [questionTitle, setQuestionTitle] = useState("");
    const [categories, setCategories] = useState(["", ""]);
    const [items, setItems] = useState([]);
    const [errors, setErrors] = useState({});

    const handleCategoryChange = (index, value) => {
        const updatedCategories = [...categories];
        updatedCategories[index] = value;
        setCategories(updatedCategories);
    };

    const handleAddCategory = () => {
        setCategories([...categories, ""]);
    };

    const handleDeleteCategory = (index) => {
        const updatedCategories = categories.filter((_, i) => i !== index);
        setCategories(updatedCategories);
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setItems(updatedItems);
    };

    const handleAddItem = () => {
        setItems([...items, { name: "", category: "" }]);
    };

    const handleDeleteItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    const handleSaveQuestion = () => {
        const newErrors = {};

        if (!questionTitle.trim()) {
            newErrors.questionTitle = "Question title is required.";
        }

        if (categories.length < 1 || categories.some((category) => !category.trim())) {
            newErrors.categories = "At least one valid category is required.";
        }

        if (items.some((item) => !item.name.trim() || !item.category.trim())) {
            newErrors.items = "Each item must have a name and category.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        updateQuestionData(questionIndex, { categories, items, questionTitle });
        alert("Question Saved Successfully");
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md max-w-3xl mx-auto">
            <label className="block mb-2 text-gray-800 font-bold text-lg">
                Question Title :
            </label>
            <input
                type="text"
                placeholder="Enter Question Title"
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
                className="block w-full rounded-md border-gray-300 py-2 px-3 mb-1 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.questionTitle && (
                <p className="text-red-500 text-sm">{errors.questionTitle}</p>
            )}

            <label className="text-gray-800 font-bold text-lg mt-4 block">
                Categories :
            </label>
            {categories.map((category, index) => (
                <div key={index} className="flex items-center gap-4 mb-2">
                    <input
                        type="text"
                        placeholder={`Category ${index + 1}`}
                        value={category}
                        onChange={(e) => handleCategoryChange(index, e.target.value)}
                        className="w-[250px] rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <button
                        type="button"
                        onClick={() => handleDeleteCategory(index)}
                        className="text-red-500 hover:text-red-700"
                    >
                        ❌
                    </button>
                </div>
            ))}
            {errors.categories && (
                <p className="text-red-500 text-sm">{errors.categories}</p>
            )}
            <button
                type="button"
                onClick={handleAddCategory}
                className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700"
            >
                Add Category
            </button>

            <label className="text-gray-800 font-bold text-lg mt-6 block">
                Items and Categories Assignment:
            </label>
            {items.map((item, index) => (
                <div key={index} className="flex justify-between gap-4 mt-4 w-full">
                    <input
                        type="text"
                        placeholder={`Item ${index + 1}`}
                        value={item.name}
                        onChange={(e) => handleItemChange(index, "name", e.target.value)}
                        className="flex-1 rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <select
                        value={item.category}
                        onChange={(e) => handleItemChange(index, "category", e.target.value)}
                        className="flex-1 rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select the Category</option>
                        {categories.map((category, idx) => (
                            <option key={idx} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <button type="button" onClick={() => handleDeleteItem(index)}>
                        ❌
                    </button>
                </div>
            ))}
            {errors.items && (
                <p className="text-red-500 text-sm mt-2">{errors.items}</p>
            )}
            <button
                type="button"
                onClick={handleAddItem}
                className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700"
            >
                Add Item
            </button>

            <button
                type="button"
                onClick={handleSaveQuestion}
                className="mt-6 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-700 w-full"
            >
                Save Question
            </button>
        </div>
    );
};

export default CategorizeQuestion;
