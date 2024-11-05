import React, { FormEvent, useState } from "react";
import { IlistTypes } from "../../types/listTypes";
import { Plus, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { createLists } from "../../features/actions/listActions";
import { AppDispatch } from "../../features/store/Store";

export const CreatelistView = () => {
    const [isMain, setIsMain] = useState<boolean>(false);

    const [listValue, setListValue] = useState<IlistTypes>({
        name: "",
        description: "",
        conver_photos: [],
        price: "",
        benefits: [""],
        additional_details: [
            {
                attribute: "",
                value: "",
            },
        ],
        category: "",
    });

    const addBenefit = () => {
        setListValue((prev) => ({
            ...prev,
            benefits: [...prev.benefits, ""], // Add an empty string to benefits
        }));
    };

    const removeBenefit = (index: number) => {
        setListValue((prev) => ({
            ...prev,
            benefits: prev.benefits.filter((_, i) => i !== index),
        }));
    };

    const addAdditionalDetail = () => {
        setListValue((prev) => ({
            ...prev,
            additional_details: [
                ...prev.additional_details,
                { attribute: "", value: "" },
            ],
        }));
    };

    const removeAdditionalDetail = (index: number) => {
        setListValue((prev) => ({
            ...prev,
            additional_details: prev.additional_details.filter((_, i) => i !== index),
        }));
    };

    const handleChange = (
        type: "benefit" | "additionalDetail",
        index: number,
        key: "value" | "attribute" | string,
        value: string
    ) => {
        if (type === "benefit") {
            const newBenefits = [...listValue.benefits];
            newBenefits[index] = value; // Update the specific benefit
            setListValue((prev) => ({ ...prev, benefits: newBenefits }));
        } else if (type === "additionalDetail") {
            const newDetails = [...listValue.additional_details];
            newDetails[index][key as "attribute" | "value"] = value; // Update the specific detail
            setListValue((prev) => ({ ...prev, additional_details: newDetails }));
        }
    };

    const handleNextPage = (e: FormEvent) => {
        e.preventDefault();
        setIsMain((preve) => !preve);
    };
    const url = import.meta.env.VITE_API_URL;
    const dispatch = useDispatch<AppDispatch>()
    const handleListSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', listValue.name);
        formData.append('description', listValue.description);
        formData.append('price', listValue.price);
        formData.append('category', listValue.category);

        listValue.conver_photos.forEach((file) => {
            formData.append('conver_photos', file);
        });

        await axios.post(`${url}/api/lists/createLists`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        }).then((res) => {
            const response = res.data.response;
            console.log(response)
            const message = res.data.message
            toast.success(message)
            dispatch(createLists(response))
        }).catch((err) => {
            console.log(err)
        })
    };
    const handleInputChange = (e: React.FormEvent) => {
        const { name, value, type, files } = e.target as HTMLInputElement; // Correct type assertion

        setListValue((prev) => ({
            ...prev,
            [name]: type === 'file'
                ? files ? [...prev.conver_photos, ...Array.from(files)] : prev.conver_photos // Convert FileList to array or use an empty array if no files
                : value
        }));
    }
    console.log(listValue)
    return (
        <React.Fragment>
            <div className="relative isolate overflow-hidden min-h-screen">
                <div className="max-w-full mx-auto md:max-w-7xl mt-16">
                    <form noValidate onSubmit={handleListSubmit}>
                        <div className="grid md:grid-cols-2 grid-cols-1 md:space-y-0 md:gap-5 space-y-4 px-4 py-6">
                            {!isMain ? (
                                <>
                                    <div className="">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Name"
                                            value={listValue.name}
                                            onChange={handleInputChange}
                                            className="w-full block bg-gray-300 focus:outline-none text-sm rounded-lg placeholder:text-gray-600 px-3 py-2"
                                        />
                                    </div>
                                    <div className="">
                                        <textarea
                                            name="description"
                                            id="description"
                                            placeholder="Description"
                                            value={listValue.description}
                                            onChange={handleInputChange}
                                            className="w-full block bg-gray-300 focus:outline-none text-sm rounded-lg placeholder:text-gray-600 px-3 py-2"
                                        />
                                    </div>
                                    <div className="">
                                        <div className="flex justify-between items-center">
                                            <label
                                                htmlFor="conver_photos"
                                                className="font-medium leading-6 tracking-wide md:text-lg text-sm text-black"
                                            >
                                                Conver photos
                                            </label>
                                            {/* <span className="text-sm px-2 py-1 rounded-full bg-gray-400">
                                                6
                                            </span> */}
                                        </div>
                                        <input
                                            type="file"
                                            name="conver_photos"
                                            accept="application/png"
                                            multiple
                                            id="conver_photos"
                                            onChange={handleInputChange}
                                            placeholder="conver_photos"
                                            className="w-full mt-2 block bg-gray-300 focus:outline-none text-sm rounded-lg placeholder:text-gray-600 px-3 py-2 "
                                        />
                                    </div>
                                    <div className="">
                                        <div className="flex justify-between items-center">
                                            <label
                                                htmlFor="price"
                                                className="font-medium leading-6 tracking-wide md:text-lg text-sm text-black"
                                            >
                                                Price
                                            </label>
                                            {/* <span className='text-sm px-2 py-1 rounded-full bg-gray-400'>6</span> */}
                                        </div>
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            placeholder="Price"
                                            onChange={handleInputChange}
                                            value={listValue.price}
                                            className="w-full mt-2 block bg-gray-300 focus:outline-none text-sm rounded-lg placeholder:text-gray-600 px-3 py-2 "
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="">
                                        <div className="flex justify-between items-center">
                                            <label
                                                htmlFor="benefit"
                                                className="font-medium leading-6 tracking-wide md:text-lg text-sm text-black"
                                            >
                                                Benefits
                                            </label>
                                            <button
                                                type="button"
                                                onClick={addBenefit}
                                                className="text-sm font-medium flex justify-center items-center text-blue-500 px-4 py-1 bg-transparent"
                                            >
                                                <Plus className="size-4" /> Add
                                            </button>
                                        </div>

                                        {listValue.benefits.map((benefit, index) => (
                                            <div key={index}>
                                                <div className="relative my-3">
                                                    <input
                                                        type="text"
                                                        value={benefit}
                                                        id="benefit"
                                                        onChange={(e) => handleChange('benefit', index, 'value', e.target.value)}
                                                        placeholder="Benefits"
                                                        className="w-full block bg-gray-300 focus:outline-none text-sm rounded-lg placeholder:text-gray-600 px-3 py-2"
                                                    />
                                                    <button type="button" className="w-fit absolute inset-y-0 px-3 end-0 bg-red-500 rounded-lg text-white" onClick={() => removeBenefit(index)}><Trash2 className="size-5" /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="">
                                        <div className="flex justify-between items-center">
                                            <label
                                                htmlFor="additional_details"
                                                className="font-medium leading-6 tracking-wide md:text-lg text-sm text-black"
                                            >
                                                Additional Detail
                                            </label>
                                            <button
                                                type="button"
                                                onClick={addAdditionalDetail}
                                                className="text-sm font-medium flex justify-center items-center gap-1.5 text-blue-500 px-4 py-1 bg-transparent"
                                            >
                                                <Plus className="size-4" /> Add
                                            </button>
                                        </div>
                                        {listValue.additional_details.map((detail, index) => (
                                            <div key={index}>
                                                <div className="flex justify-between gap-3 items-center">
                                                    <input
                                                        type="text"
                                                        value={detail.attribute}
                                                        onChange={(e) => handleChange('additionalDetail', index, 'attribute', e.target.value)}
                                                        placeholder="Attribute"
                                                        className="w-full block bg-gray-300 focus:outline-none text-sm rounded-lg placeholder:text-gray-600 px-3 py-2"
                                                    />
                                                    <div className="relative w-full my-3">
                                                        <input
                                                            type="text"
                                                            value={detail.value}
                                                            onChange={(e) => handleChange('additionalDetail', index, 'value', e.target.value)}
                                                            placeholder="Value"
                                                            className="w-full block bg-gray-300 focus:outline-none text-sm rounded-lg placeholder:text-gray-600 px-3 py-2"
                                                        />
                                                        {index > 0 && (
                                                            <button type="button" className="w-fit absolute inset-y-0 px-3 end-0 bg-red-500 rounded-lg text-white" onClick={() => removeAdditionalDetail(index)}><Trash2 className="size-5" /></button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="">
                                        <select className="w-full mt-2 block bg-gray-300 focus:outline-none text-sm rounded-lg placeholder:text-gray-600 px-3 py-2 "
                                            name="category" value={listValue.category} id="category" onChange={handleInputChange}>
                                            <option value="" selected>Select Category</option>
                                            <hr className="bg-black" />
                                            <option value="category1" selected>Category 1</option>
                                            <option value="category2" selected>Category 2</option>
                                            <option value="category3" selected>Category 3</option>
                                        </select>
                                    </div>
                                </>
                            )}
                            <div className="w-full col-span-full">
                                {!isMain ? (
                                    <button
                                        type="button"
                                        onClick={handleNextPage}
                                        className="block w-full mt-3 text-white text-xl font-medium leading-6 tracking-wide bg-blue-700 py-3 rounded-xl px-12"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="block w-full mt-3 text-white text-xl font-medium leading-6 tracking-wide bg-blue-700 py-3 rounded-xl px-12"
                                    >
                                        Submit
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};
