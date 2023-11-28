"use client";
import Cookies from 'js-cookie';
import React, { useState, useEffect } from "react";

export default function Confirm({ kendaraanId, kendaraanName }) {
  const [modal, setModal] = useState(false);
  const [tglMulai, setTglMulai] = useState('');
  const [tglBerakhir, setTglBerakhir] = useState('');
  const [lamaSewa, setLamaSewa] = useState('');
  const [totalBiaya, setBiaya] = useState('');
  const token = Cookies.get('token');
  const biaya = 300000;

  useEffect(() => {
    const calculateCostAndDays = () => {
      const startDate = new Date(tglMulai);
      const endDate = new Date(tglBerakhir);

      const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
      const lamaSewa = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      const totalBiaya = biaya * lamaSewa;

      setLamaSewa(lamaSewa);
      setBiaya(totalBiaya);
    };

    calculateCostAndDays();
  }, [tglMulai, tglBerakhir]);
  function handleChange() {
    setModal(!modal);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/kendaraan/${kendaraanId}/sewa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        tanggalSewa: Date.now(),
        lamaSewa: lamaSewa,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Bad Request');
        } else {
          alert("berhasil");
        }
        return response.json();
      })
      .then(data => {
        console.log('Response from API:', data);
      })
      .catch(error => {
        console.error('Error sending data to API:', error);
      });
  };

  return (
    <div className="h-fit w-full rounded-lg p-4" style={{ backgroundColor: 'rgba(235, 235, 235, 1)' }}>
      <button className="btn py-1 px-3 font-semibold text-sm bg-accent rounded-lg text-primary mt-2" onClick={handleChange}>Pesan</button>
      {modal && (
        <div className="p-4 flex flex-col h-full">
          <h1 className="font-bold text-3xl text-accent" style={{ letterSpacing: '-0.04em' }}>
            {kendaraanName}
          </h1>
          <div className="pt-8 pb-8">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-between">
                <h1 className="text-accent font-normal text-2xl">Start Date</h1>
                <div>
                  <input
                    className="rounded-md py-2 px-3 w-full focus:border-1 focus:ring-2 focus:border-b-red-600 focus:ring-accent"
                    type="date"
                    name=""
                    value={tglMulai}
                    onChange={(e) => setTglMulai(e.target.value)}
                    placeholder="DD-MM-YYYY"
                    style={{ backgroundColor: 'rgba(217, 217, 217, 1)', fontSize: '16px', paddingRight: '8px' }}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <h1 className="text-accent font-normal text-2xl">End Date</h1>
                <div>
                  <input
                    className="rounded-md py-2 px-3 w-full focus:border-1 focus:ring-2 focus:border-b-red-600 focus:ring-accent"
                    type="date"
                    name=""
                    value={tglBerakhir}
                    onChange={(e) => setTglBerakhir(e.target.value)}
                    placeholder="DD-MM-YYYY"
                    style={{ backgroundColor: 'rgba(217, 217, 217, 1)', fontSize: '16px', paddingRight: '8px' }}
                    required
                  />
                </div>
              </div>
              <hr className="my-4" style={{ borderTop: '2px solid rgba(217, 217, 217, 1)' }} />
              <div className="flex items-center justify-between">
                <h1 className="text-accent font-normal text-2xl">Rental Cost</h1>
                <h2 className="text-accent font-normal text-2xl">IDR {new Intl.NumberFormat('id-ID').format(biaya)}</h2>
              </div>
              <hr className="my-4" style={{ borderTop: '2px solid rgba(217, 217, 217, 1)' }} />
              <h1 className="font-bold text-3xl text-accent" style={{ letterSpacing: '-0.04em' }}>
                Total
              </h1>
              <div className="flex items-center justify-between">
                <h1 className="text-accent font-normal text-2xl">
                  {lamaSewa} hari x rental cost
                </h1>
                <h2 className="text-accent font-semibold text-2xl">IDR {new Intl.NumberFormat('id-ID').format(totalBiaya)}</h2>
              </div>
              <div className="h-fit w-full rounded-lg py-2 px-3 flex items-center justify-center mt-auto" style={{ backgroundColor: 'rgba(2, 69, 90, 1)' }}>
                <button type="submit" className="text-primary text-2xl font-semibold m-2">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
