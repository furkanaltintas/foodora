import { footerSchema } from "@/schema/footer";
import { useFormik } from "formik";
import Title from "../ui/Title";
import Input from "../form/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const Footer = () => {
    const [buttonName, setButtonName] = useState("Update");
    const [iconName, setIconName] = useState("fa fa-");
    const [linkAddress, setLinkAddress] = useState("https://");
    const [footerData, setFooterData] = useState([]);
    const [socialMediaLinks, setSocialMediaLinks] = useState([]);

    useEffect(() => {
        const getFooterData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/footer`);
                if (res && res.data) {
                    setFooterData(res.data);
                    setSocialMediaLinks(res.data.socialMedia);
                } else {
                    setButtonName("Create");
                }

            } catch (err) {
                console.error(err);
            }
        }
        getFooterData();
    }, [])

    const onSubmit = async (values, actions) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/footer/${footerData._id}`, {
                location: values.location,
                email: values.email,
                phoneNumber: values.phoneNumber,
                desc: values.desc,
                openingHours: {
                    day: values.day,
                    hour: values.time,
                },
                socialMedia: setSocialMediaLinks
            });
            if (res.status === 200) {
                toast.success("Footer updated successfully");
            }
        } catch (err) {
            console.error(err);
        }
    }

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        enableReinitialize: true, // Formik formunuzu oluştururken, initialValues (başlangıç değerleri) props'u değiştiğinde formun değerlerini sıfırlayıp yeniden başlatmasını sağlar.
        initialValues: {
            location: footerData?.location,
            email: footerData?.email,
            phoneNumber: footerData?.phoneNumber,
            desc: footerData?.desc,
            day: footerData?.openingHours?.day,
            time: footerData?.openingHours?.hour,
        },
        onSubmit,
        validationSchema: footerSchema
    })

    const inputs = [
        {
            id: 1,
            name: "location",
            type: "text",
            placeholder: "Your Location",
            value: values.location,
            errorMessage: errors.location,
            touched: touched.location
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Your Email Address",
            value: values.email,
            errorMessage: errors.email,
            touched: touched.email
        },
        {
            id: 3,
            name: "phoneNumber",
            type: "number",
            placeholder: "Your Phone Number",
            value: values.phoneNumber,
            errorMessage: errors.phoneNumber,
            touched: touched.phoneNumber
        },
        {
            id: 4,
            name: "desc",
            type: "text",
            placeholder: "Your Description",
            value: values.desc,
            errorMessage: errors.desc,
            touched: touched.desc
        },
        {
            id: 5,
            name: "day",
            type: "text",
            placeholder: "Update Day",
            value: values.day,
            errorMessage: errors.day,
            touched: touched.day
        },
        {
            id: 6,
            name: "time",
            type: "text",
            placeholder: "Update Time",
            value: values.time,
            errorMessage: errors.time,
            touched: touched.time
        },
    ]

    const handleCreate = (e) => {
        setSocialMediaLinks([
            ...footerData?.socialMedia, {
                icon: iconName,
                link: linkAddress
            },
        ]);
        setLinkAddress("https://");
        setIconName("fa fa-");
    }

    return (
        <form onSubmit={handleSubmit}>
            <Title className="text-[40px] text-center md:text-start">Footer Settings</Title>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
                {
                    inputs.map((input) => (
                        <Input key={input.id} {...input} onChange={handleChange} onBlur={handleBlur} />
                    ))
                }
            </div>
            <div className="mt-4 flex justify-between md:items-center md:flex-row flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Input placeholder="Link Address" value={linkAddress} onChange={e => setLinkAddress(e.target.value)} />
                    <Input placeholder="Icon Name" value={iconName} onChange={e => setIconName(e.target.value)} />
                    <button className="btn-primary w-full" type="button" onClick={handleCreate}>Icon Add</button>
                </div>
                <ul className="flex items-center justify-center md:justify-normal gap-8">
                    {
                        socialMediaLinks?.map((item, index) => (
                            <li key={index}>
                                <i className={`${item.icon} text-2xl`}></i>
                                <button 
                                className="text-danger"
                                type="button"
                                onClick={() => {
                                    setIcons((prev) => prev.filter((item, i) => i !== index));
                                }}>
                                    <i className="fa fa-trash text-xl ml-2"></i>
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <button type="submit" className="btn-primary mt-4 w-full md:w-fit">{buttonName}</button>
        </form>
    )
}

export default Footer