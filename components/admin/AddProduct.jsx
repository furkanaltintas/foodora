import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { GiCancel } from "react-icons/gi";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = ({ setIsProductModal, setProducts }) => {
    const [file, setFile] = useState(null)
    const [imageSrc, setImageSrc] = useState(null)

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [category, setCategory] = useState("pizza")
    const [prices, setPrices] = useState([])

    const [extra, setExtra] = useState({ text: "", price: "" })
    const [extraOptions, setExtraOptions] = useState([])

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
                setCategories(res.data)
            } catch (err) {
                console.log(err);

            }
        };
        getProducts();
    }, []);

    const handleExtra = (e) => {
        if (extra) {
            if (extra.text && extra.price) {
                setExtraOptions((prev) => [...prev, extra]) // [...extraOptions, extra]
                setExtra({ text: "", price: "" })
            }
        }
    }

    // Dosya girişinde (örneğin bir input[type="file"] alanında) bir değişiklik olduğunda çağrılacak fonksiyon
    const handleOnChange = (changeEvent) => {

        // Yeni bir FileReader nesnesi oluşturuluyor, bu nesne dosyaları okuyabilmek için kullanılır
        const reader = new FileReader()

        // Dosya okuma işlemi tamamlandığında çalışacak olan fonksiyon tanımlanıyor
        reader.onload = function (onLoadEvent) {

            // Okunan dosyanın içeriğini (base64 formatında veri URL’si) bir state değişkenine atıyoruz
            // Bu genellikle bir <img> etiketinde önizleme yapmak için kullanılır
            setImageSrc(onLoadEvent.target.result)

            // Orijinal dosyayı da başka bir state değişkenine atıyoruz
            // Bu genelde sunucuya yüklemek için kullanılır
            setFile(changeEvent.target.files[0])
        }

        // Kullanıcının seçtiği dosya, FileReader ile veri URL’si (base64) formatında okunuyor
        reader.readAsDataURL(changeEvent.target.files[0])
    }

    const changePrice = (e, index) => {
        const currentPrices = prices;
        currentPrices[index] = e.target.value;
        setPrices(currentPrices);
    }

    // Bir dosya yükleme işlemini yöneten async (asenkron) fonksiyon
    const handleCreate = async () => {

        // FormData nesnesi oluşturuluyor; bu, dosya ve verileri HTTP ile göndermek için kullanılır
        const data = new FormData()

        // 'file' isimli dosya, FormData nesnesine ekleniyor
        // Bu 'file' değişkeninin önceden tanımlanmış ve bir dosya içermesi gerekiyor
        data.append("file", file)

        // Cloudinary'de önceden tanımlanmış bir upload preset (ön ayar) ekleniyor
        // Bu ayar, Cloudinary hesabında oluşturulmuş olmalı
        data.append("upload_preset", "food-ordering")

        try {
            // Cloudinary API'sine bir POST isteği gönderiliyor
            // Bu istek, dosyayı Cloudinary'a yüklemek için kullanılır
            // Bu, FormData içindeki dosyayı Cloudinary'e yükler
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dlqv5cazr/image/upload", data) // dlqv5cazr => cloud name

            const { url } = uploadRes.data;
            const newProduct = {
                img: url,
                title,
                desc,
                category: category.toLowerCase(),
                prices,
                extraOptions,
            }

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, newProduct);
            if (res.status === 201) {
                setIsProductModal(false)
                setProducts((prev) => [...prev, res.data]) // yeni ürün listeye eklendi
                toast.success("Product created successfully")
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen
         after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
            <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
                <div className="w-full h-full grid place-content-center">
                    <div className="relative z-50 md:w-[600px] w-[400px] bg-white border-2 p-10 rounded-3xl">
                        <Title className="text-[40px] text-center">Add a New Product</Title>
                        <div className="flex flex-col text-sm mt-6">
                            <label className="flex items-center gap-2">
                                <input type="file" onChange={handleOnChange} className="hidden" />
                                <button className="btn-primary rounded-none bg-blue-600 pointer-events-none">Choose and Image</button>
                                {
                                    imageSrc && (
                                        <img src={imageSrc} className="w-12 h-12 ml-auto rounded-full" />
                                    )
                                }
                            </label>
                        </div>
                        <div className="flex flex-col text-sm mt-6">
                            <label className="font-semibold mb-[2px]">Title</label>
                            <input type="text" placeholder="Write a title..." className="border-2 p-2 text-sm px-1 outline-none" onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="flex flex-col text-sm mt-6">
                            <label className="font-semibold mb-[2px]">Desc</label>
                            <textarea type="text" placeholder="Write a description..." className="border-2 p-2 text-sm px-1 outline-none" onChange={(e) => setDesc(e.target.value)}></textarea>
                        </div>
                        <div className="flex flex-col text-sm mt-6">
                            <label className="font-semibold mb-[2px]">Categories</label>
                            <select type="text" placeholder="Write a description..." className="border-2 p-2 text-sm px-1 outline-none" onChange={(e) => setCategory(e.target.value)}>
                                {
                                    categories.length > 0 && categories.map((category) => (
                                        <option key={category._id} value={category.title.toLowerCase()}>{category.title}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex flex-col text-sm mt-6">
                            <label className="font-semibold mb-[2px]">Prices</label>
                            {
                                category === "pizza" ? (
                                    <div className="flex justify-between gap-4 md:flex-nowrap flex-wrap">
                                        <input type="number" placeholder="small" className="border-b-2 p-2 pl-0 text-sm outline-none w-full" onChange={(e) => changePrice(e, 0)} />
                                        <input type="number" placeholder="medium" className="border-b-2 p-2 pl-0 text-sm outline-none w-full" onChange={(e) => changePrice(e, 1)} />
                                        <input type="number" placeholder="large" className="border-b-2 p-2 pl-0 text-sm outline-none w-full" onChange={(e) => changePrice(e, 2)} />
                                    </div>
                                ) : (
                                    <input type="number" placeholder="price" className="border-b-2 p-2 pl-0 text-sm outline-none" onChange={(e) => changePrice(e, 0)} />
                                )
                            }
                        </div>
                        <div className="flex flex-col text-sm mt-6">
                            <label className="font-semibold mb-[2px]">Extra</label>
                            <div className="flex gap-4 md:flex-nonwrap flex-wrap">
                                <input type="text" placeholder="Item" className="border-b-2 p-2 pl-0 text-sm outline-none" name="text" value={extra.text} onChange={(e) => setExtra({ ...extra, [e.target.name]: e.target.value })} />
                                <input type="text" placeholder="Price" className="border-b-2 p-2 pl-0 text-sm outline-none" name="price" value={extra.price} onChange={(e) => setExtra({ ...extra, [e.target.name]: e.target.value })} />
                                <button type="button" className="btn-primary ml-auto" onClick={handleExtra}>Add</button>
                            </div>
                        </div>
                        <div className="mt-2 flex gap-2">
                            {
                                extraOptions.map((item, index) => (
                                    <span key={index} onClick={() => {
                                        setExtraOptions(
                                            extraOptions.filter((_, i) => i !== index)
                                        );
                                    }} className="inline-block border border-orange-500 text-orange-500 p-1 rounded-xl text-xs cursor-pointer">{item.text}</span>
                                ))
                            }
                        </div>
                        <div>
                            <button type="submit" className="btn-primary !bg-success float-right mt-6" onClick={handleCreate}>Create</button>
                            <button className="absolute top-4 right-4" onClick={() => setIsProductModal(false)}>
                                <GiCancel size={23} className="hover:text-primary transition-all" />
                            </button>
                        </div>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    )
}

export default AddProduct