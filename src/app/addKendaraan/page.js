"use client"
import React, { useState } from "react";

export default function adminAdd() {
    const [namaKendaraan, setNamaKendaraan] = useState('');
    const [tipeKendaraan, settipeKendaraan] = useState('');
    const [hargaSewa, sethargaSewa] = useState(0);
    const [jumlahKetersediaan, setjumlahKetersediaan] = useState(0);

    const handleAddKendaraan = () => {
        if (!namaKendaraan || !tipeKendaraan || !hargaSewa || !jumlahKetersediaan) {
            alert('Pastikan semua kolom terisi!');
            return;
        }

        const hargaSewanya = Number(hargaSewa);
        const jumlahKetersediaannya = Number(jumlahKetersediaan);

        const data = {namaKendaraan,
            tipeKendaraan,
            hargaSewanya,
            jumlahKetersediaannya}
            console.log(data);

        fetch('http://localhost:8080/api/kendaraan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDEyOTU1MDYsImV4cCI6MTcwMTMwMjcwNiwidXNlcklkIjo4LCJzdGF0dXMiOiJhZG1pbiIsIm5hbWEiOiJIYWxvIiwiZW1haWwiOiJoYWlAZ21haWwuY29tIn0.rBSO5XmS9ycI1iiI8bbXnyz4CV7eXovWnvN3iEKoCCQ`,
            },
            mode: 'cors',
            body: JSON.stringify(
                {
                    namaKendaraan,
                    tipeKendaraan,
                    hargaSewa:hargaSewanya,
                    jumlahKetersediaan:jumlahKetersediaannya
                }
            ),
        })
            .then(response => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                } else {
                    alert('Gagal Menambah Data, silahkan coba lagi');
                }
            })
            .then(data => {
                alert('berhasil Menambah Data!');
                window.location.reload();
            })
            .catch(error => {
                console.log('Error fetching registration data:', error);
                alert('Gagal Menambah Data, silahkan coba lagi');
            });
    };

    return (
        <div className="bg-primary">
            <nav className="flex justify-between px-12 py-6 bg-accent">
                <h1 className="text-xl text-yellow-500 font-bold">Logo</h1>
                <div className="space-x-6 text-gray-500 font-semibold">
                    <a href="http://" className="hover:text-primary">Penyewaan</a>
                    <a href="http://" className="hover:text-primary">Kendaraan</a>
                </div>
                <button
                    className="py-1 px-2 bg-yellow-500 rounded-sm text-white font-semibold hover:bg-yellow-400 transition-colors">Logout</button>
            </nav>

            <main className="flex justify-center w-screen">
                <div className="w-[35rem] py-6 space-y-4">
                    <div className="w-full flex justify-between">
                        <h1 className="text-accent font-extrabold text-xl mb-3">Add Car</h1>
                        <button
                            className="py-1 px-2 h-fit bg-blue-500 rounded-sm text-white font-semibold hover:bg-blue-400 transition-colors">Back</button>
                    </div>

                    <div className="space-y-2">
                        <div className="relative">
                            <label className="leading-7 text-sm text-accent">Name</label>
                            <input type="text" value={namaKendaraan}
                                onChange={(e) => setNamaKendaraan(e.target.value)} className="w-full bg-transparent bg-opacity-50 rounded border border-accent focus:border-accent focus:ring-2 focus:ring-gray-200 text-base outline-none text-accent py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative">
                            <label className="leading-7 text-sm text-accent">Type</label>
                            <input type="text" className="w-full bg-transparent bg-opacity-50 rounded border border-accent focus:border-accent focus:ring-2 focus:ring-gray-200 text-base outline-none text-accent py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={tipeKendaraan}
                                onChange={(e) => settipeKendaraan(e.target.value)}/>
                        </div>
                        <div className="relative">
                            <label className="leading-7 text-sm text-accent">Pricing</label>
                            <input type="number" className="w-full bg-transparent bg-opacity-50 rounded border border-accent focus:border-accent focus:ring-2 focus:ring-gray-200 text-base outline-none text-accent py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={hargaSewa}
                                onChange={(e) => sethargaSewa(e.target.value)}/>
                        </div>
                        <div className="relative">
                            <label className="leading-7 text-sm text-accent">Available</label>
                            <input type="number" className="w-full bg-transparent bg-opacity-50 rounded border border-accent focus:border-accent focus:ring-2 focus:ring-gray-200 text-base outline-none text-accent py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" value={jumlahKetersediaan}
                                onChange={(e) => setjumlahKetersediaan(e.target.value)}/>
                        </div>
                    </div>

                    <div className="">
                        <button onClick={handleAddKendaraan} className="py-1 px-2 h-fit bg-blue-500 rounded-sm text-white font-semibold hover:bg-blue-400 transition-colors">Add</button>
                    </div>
                </div>
            </main>
        </div>
    );
}