import { reservationSchema } from "@/schema/reservation"
import Input from "./form/Input"
import Title from "./ui/Title"
import { useFormik } from "formik"

const Reservation = () => {

    const onSubmit = async (values, actions) => {
        await new Promise((resolve) => setTimeout(resolve, 4000))
        actions.resetForm();
    }

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            fullName: "",
            phoneNumber: "",
            email: "",
            persons: "",
            date: "",
        },
        onSubmit,
        validationSchema: reservationSchema
    })

    const inputs = [
        {
            id: 1,
            name: "fullName",
            type: "text",
            placeholder: "Your Full Name",
            value: values.fullName,
            errorMessage: errors.fullName,
            touched: touched.fullName
        },
        {
            id: 2,
            name: "phoneNumber",
            type: "number",
            placeholder: "Your Phone Number",
            value: values.phoneNumber,
            errorMessage: errors.phoneNumber,
            touched: touched.phoneNumber
        },
        {
            id: 3,
            name: "email",
            type: "email",
            placeholder: "Your Email Address",
            value: values.email,
            errorMessage: errors.email,
            touched: touched.email
        },
        {
            id: 4,
            name: "persons",
            type: "number",
            placeholder: "How Many Persons?",
            value: values.persons,
            errorMessage: errors.persons,
            touched: touched.persons
        },
        {
            id: 5,
            name: "date",
            type: "datetime-local",
            placeholder: "",
            value: values.date,
            errorMessage: errors.date,
            touched: touched.date
        },
    ]

    return (
        <div className="container mx-auto py-12">
            <Title className="text-[40px] mb-10">Book A Table</Title>
            <div className="sm:flex flex-wrap justify-between gap-10">
                <form className="flex-1 h-[400px]" onSubmit={handleSubmit} onBlur={handleBlur}>
                    <div className="flex flex-col gap-y-3">
                        {
                            inputs.map((input) => (
                                <Input key={input.id} {...input} onChange={handleChange} />
                            ))
                        }
                    </div>
                    <button type="submit" className="btn-primary mt-4">BOOK NOW</button>
                </form>
                <div className="flex h-[400px] mt-10 sm:mt-0">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387196.0768088125!2d-74.30915884677587!3d40.69667266973555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20Amerika%20Birle%C5%9Fik%20Devletleri!5e0!3m2!1str!2str!4v1748267564125!5m2!1str!2str"
                        width="600"
                        height="400"
                        allowFullScreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        className="border border-primary"
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

export default Reservation