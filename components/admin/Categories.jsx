import { useState } from "react";
import Input from "../form/Input"
import Title from "../ui/Title"

const Categories = () => {
    const [inputText, setInputText] = useState("");
    const [categories, setCategories] = useState([
        { name: "Pizza" },
        { name: "Burger" },
        { name: "Pasta" },
        { name: "Salad" },
        { name: "Dessert" },
        { name: "Drink" },
    ]);

    return (
        <>
            <Title className="text-[40px] text-center md:text-start">Categories</Title>
            <div className="mt-5">
                <div className="flex flex-1 gap-4 items-center">
                    <Input placeholder="Add a new Category..." onChange={(e) => setInputText(e.target.value)} value={inputText} />
                    <button
                        className="btn-primary"
                        onClick={() => {
                            setCategories([...categories, { name: inputText }]);
                            setInputText("");
                        }}>Add</button>
                </div>
                <div className="mt-10 border-t-2 border-primary pt-10">
                    {
                        categories.length > 0 ? (
                            categories.map((category, index) => (
                                <div className="flex justify-between mt-4" key={index}>
                                    <b className="text-xl">{category.name}</b>
                                    <button className="btn-primary !bg-danger" onClick={() => setCategories(categories.filter((_, i) => i !== index))}>Delete</button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No categories</p>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Categories