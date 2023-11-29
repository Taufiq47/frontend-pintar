"use client"
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function History() {
    const [sewaData, setSewaData] = useState([]);
    const token = Cookies.get('token');
    const [status, setStatus] = useState('select');
    const [denda, setDenda] = useState(0);
    const moment = require('moment');

    const tgl = (timestamp) => {
        return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
    }

    useEffect(() => {
        const fetchSewaData = () => {
            fetch(`http://localhost:8080/api/kendaraan/all/sewa`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Data dari API:', data);

                    setSewaData(data);
                })
                .catch(error => {
                    console.error('Error fetching sewa data:', error);
                });
        };

        fetchSewaData();
    }, []);

    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <div className="px-24 pt-12 space-y-12">
                    <h1 className="font-semibold text-5xl text-accent">History</h1>
                </div>
            </div>
            <div className="px-28 pt-10 mb-4 space-y-8">
                <h2 className="font-semibold text-3xl text-gray-600">On Order</h2>
                {sewaData.map((sewa) => (
                    <div key={sewa.userId} className="h-fit bg-accent rounded-lg space-x-2 px-4 py-2 mx-32 ml-32 ">
                        <div className="flex justify-between">
                            <div className="px-8 pt-4">
                                <h3 className="font-bold text-4xl text-primary">Id Kendaraan : {sewa.kendaraanId}</h3>
                            </div>
                            <div className="px-4 pt-4 mr-90">
                                <p className="font-semibold text-2xl text-gray-400">{tgl(sewa.tanggalSewa)}</p>
                                <p className="font-semibold text-1xl text-gray-400">Lama Sewa : {sewa.lamaSewa} Hari</p>
                            </div>
                        </div>
                        <div className="px-6 pt-14">
                            <p className="font-semibold text-2xl text-primary">IDR {sewa.totalHargaSewa.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                        </div>
                        <div className="flex justify-between">
                            <div className="pl-8 pt-3 pb-4">
                                <p className="font-semibold text-1xl text-gray-400">+ denda : IDR  -</p>
                            </div>
                            <div className="px-8 pb-4 text-right">
                                <p className="font-semibold text-4xl text-yellow-500">Paid</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
