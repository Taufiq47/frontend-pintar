"use client"
import { Router } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function adminList() {
    const [dataKendaraan, setKendaraan] = useState([]);
    const moment = require('moment');
    const token = Cookies.get('token');

    const tgl = (timestamp) => {
        return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
    }

    useEffect(() => {
        const fetchData = () => {
            fetch(`http://localhost:8080/api/kendaraan`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Data dari API:', data);

                    setKendaraan(data);
                })
                .catch(error => {
                    console.error('Error fetching sewa data:', error);
                });
        };

        fetchData();
    }, []);

    const handleDelete = (carId) => {
        fetch(`http://localhost:8080/api/kendaraan/${carId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Gagal menghapus kendaraan. Status: ${response.status}`);
          }
          alert("Berhasil menghapus kendaraan");
          return response.json();
        })
        .then(data => {
          console.log('Response dari API:', data);
          window.location.reload();
        })
        .catch(error => {
          console.error('Kesalahan mengirim data ke API:', error.message);
        });
        
      };

    return (
        <div className="bg-primary">
            <nav className="flex justify-between px-12 py-6 bg-accent">
                <h1 className="text-xl text-yellow-500 font-bold">PintarRent</h1>
                <div className="space-x-6 text-gray-500 font-semibold">
                    <a href="http://" className="hover:text-primary">Penyewaan</a>
                    <a href="http://" className="hover:text-primary">Kendaraan</a>
                </div>
                <button className="py-1 px-2 bg-yellow-500 rounded-sm text-white font-semibold hover:bg-yellow-400 transition-colors">Logout</button>
            </nav>

            <main className="flex justify-center w-screen">
                <div className="w-[35rem] py-6 space-y-2">
                    <div className="w-full flex justify-between">
                        <h1 className="text-accent font-extrabold text-xl mb-3">Car List: </h1>
                        <button className="py-1 px-2 h-fit bg-blue-500 rounded-sm text-white font-semibold hover:bg-blue-400 transition-colors">Add Car</button>
                    </div>

                    {dataKendaraan.map((car) => (
                        <div key={car.kendaraanId} className="h-fit w-full bg-narrow rounded-lg p-4">
                            <div className="flex justify-between">
                                <div className="flex">
                                    <img className="h-20" src="./sewamobil.png" alt="" />
                                    <div className="flex flex-col h-full">
                                        <h1 className="text-2xl font-bold text-accent mb-3">{car.namaKendaraan}</h1>
                                        <div className="flex space-x-2">
                                            <img className="h-6" src="./Users.svg" alt="" />
                                            <span>4</span>
                                            <img className="h-5" src="./Case.svg" alt="" />
                                            <span>2</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end justify-between">
                                    <div>
                                        <span className="text-xs font-semibold text-gray-600">Starts From</span>
                                        <p className="text-sm font-bold text-accent">IDR {car.hargaSewa.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}/day</p>
                                    </div>
                                    <div className="space-x-1">
                                        <button onClick={() => handleDelete(car.kendaraanId)}
                                            className="py-[2px] px-2 h-fit bg-red-500 rounded-sm text-white font-semibold hover:bg-red-400 transition-colors">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))};

                </div>
            </main>
        </div>
    );
}