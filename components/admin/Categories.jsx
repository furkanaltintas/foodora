import { useEffect, useState } from "react";
import Input from "../form/Input"
import Title from "../ui/Title"
import axios from "axios";

const Categories = () => {
    const [inputText, setInputText] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
                console.log(res)
                setCategories(res?.data);
            } catch (err) {
                console.log(err);
            }
        }
        getCategories();
    }, []);

    const handleCreate = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { title: inputText });
            setCategories([...categories, res.data]);
            setInputText("");
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async (id) => {
        try {
            if (!confirm("Are you sure you want to delete this category?")) return;
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`);
            setCategories(categories.filter((category) => category._id !== id));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Title className="text-[40px] text-center md:text-start">Categories</Title>
            <div className="mt-5">
                <div className="flex flex-1 gap-4 items-center">
                    <Input placeholder="Add a new Category..." onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleCreate()} value={inputText} />
                    <button
                        className="btn-primary"
                        onClick={() => {
                            setCategories([...categories, { title: inputText }]);
                            setInputText("");
                        }}>Add</button>
                </div>
                <div className="mt-10 border-t-2 border-primary py-4 max-h-[250px] overflow-auto">
                    {
                        categories.length > 0 ? (
                            <>
                                {
                                    categories.map((category, index) => (
                                        <div className="flex justify-between border-b-2 py-4 pr-4" key={index}>
                                            <b className="text-xl">{category.title}</b>
                                            <button className="btn-primary !bg-danger" onClick={() => handleDelete(category._id)}>
                                                Delete
                                            </button>
                                        </div>
                                    ))
                                }
                            </>
                        ) : (
                            <p className="text-center">No categories</p>
                        )
                    }
                </div>
                {
                    categories.length > 0 && (
                        <div className="text-right text-gray-400 mt-4">
                            Toplam Kategori Sayısı: {categories.length}
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Categories