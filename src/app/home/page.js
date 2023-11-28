"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Confirm from "../component/confirm";

export default function Home() {
    const [carData, setCarData] = useState([]);
    const token = Cookies.get("token");

    const handleLogout = () => {
        Cookies.remove("token");

        window.location.href = "/login";
    };

    const handleHistory = () => {
        window.location.href = "/login";
    };

    useEffect(() => {
        const fetchCarData = () => {
            fetch("http://localhost:8080/api/kendaraan", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Data dari API:", data);
                    setCarData(data);
                })
                .catch((error) => {
                    console.error("Error fetching car data:", error);
                });
        };

        fetchCarData();
    }, []);

    return (
        <div className="flex w-full h-screen">
            <div className="w-1/2 h-full bg-accent">
                <div className="p-24 flex flex-col h-full justify-between">
                    <h1 className="font-extrabold text-5xl text-yellow-500">
                        PintarRent
                    </h1>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-white font-extrabold text-3xl">
                                Time to roll! Explore our diverse fleet
                            </h1>
                            <p className="text-white font-normal text-base">
                                choose the perfect ride, and kickstart your adventure with
                                flexible rental dates
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <button
                            className="text-white font-bold text-2xl"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                        <button onClick={handleHistory} className="text-white font-bold text-2xl">History</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-1/2 p-12 overflow-auto min-h-screen">
                <div>
                    <h1 className="text-accent font-extrabold text-2xl mb-3">
                        Car List:
                    </h1>
                    <div className="flex flex-col space-y-2" id="cards">
                        {carData.map((car) => (
                            <div
                                key={car.kendaraanId}
                                className="h-fit w-full bg-narrow rounded-lg p-4"
                            >
                                <div className="flex justify-between">
                                    <div className="flex">
                                        <img className="h-20" src="./sewamobil.png" alt="" />
                                        <div className="flex flex-col h-full">
                                            <h1 className="text-2xl font-bold text-accent mb-3">
                                                {car.namaKendaraan}
                                            </h1>
                                            <div className="flex space-x-2">
                                                <img className="h-6" src="/Users.svg" alt="" />
                                                <span>5</span>
                                                <img className="h-5" src="/Case.svg" alt="" />
                                                <span>5</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs font-semibold text-gray-600">
                                            Mulai Dari
                                        </span>
                                        <p
                                            id="hargaSewa"
                                            className="text-sm font-bold text-accent"
                                        >{`IDR ${car.hargaSewa}/hari`}</p>
                                    </div>
                                </div>
                                <div className="py-2">
                                    <Confirm
                                        kendaraanId={car.kendaraanId}
                                        kendaraanName={car.namaKendaraan}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
