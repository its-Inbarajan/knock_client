import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../features/store/Store'
import { getLists } from '../../features/actions/listActions'
import { RootState } from '@reduxjs/toolkit/query'
import { IlistTypes } from '../../types/listTypes'

export const ListView = () => {

    const url = import.meta.env.VITE_API_URL
    const dispatch = useDispatch<AppDispatch>()
    const { lists } = useSelector((state: RootState) => state.lists)
    useEffect(() => {
        axios.get(`${url}/api/lists/getLists`).then((res) => {
            const response = res.data.response;
            dispatch(getLists(response))
        }).catch((err) => {
            console.log(err)
        })
    }, [url, dispatch])
    return (
        <React.Fragment>
            <div className="relative isolate mt-24 overflow-hidden min-h-screen">
                {lists && lists.length > 0 ? (
                    lists.map((item: IlistTypes) => {
                        return (
                            <>
                                <div className="flex px-3 py-3">
                                    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
                                        <img className="w-full " src={item?.conver_photos[0]?.secure_url ? item?.conver_photos[0]?.secure_url : "https://tailwindcss.com/img/card-top.jpg"} alt="Sunset in the mountains" />
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">{item?.name}</div>
                                            <p className="text-gray-700 text-base">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et
                                                perferendis eaque, exercitationem praesentium nihil.
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </>
                        )
                    })
                ) : "Data not found!"}
            </div>
        </React.Fragment>
    )
}
