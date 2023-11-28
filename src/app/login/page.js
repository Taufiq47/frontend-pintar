"use client"
import Cookies from 'js-cookie';
import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            alert('Pastikan semua kolom terisi!');
            return;
        }

        fetch(`http://localhost:8080/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({ email, password }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('Login gagal, masukkan kembali email dan password');
                    setPassword('');
                    setEmail('');
                }
            })
            .then(data => {
                const token = data.token;

                Cookies.set('token', token);

                console.log('Login berhasil! Token:', token);
                window.location.href = '/home';
            })
            .catch(error => {
                console.error('Error fetching login data:', error);
            });
        }

    return (
        <div className="flex w-full h-screen">
            <div className="w-1/2 h-full">
                <div className="px-24 pt-12 space-y-12">
                    <h1 className="font-extrabold text-5xl text-yellow-500">PintarRent</h1>
                    <div>
                        <h3 className="font-extrabold text-5xl text-accent">Discover Your World, Your Way!</h3>
                        <p className="font-normal text-xl pt-3 text-accent">From roads to rivers, and skies above, find the perfect rental for every journey!</p>
                    </div>
                    <img src="./mobil.png" alt="" />
                </div>
            </div>
            <div className="flex w-1/2 h-full items-center bg-secondary rounded-l-[48px]">
                <div className="flex flex-col w-full items-center space-y-6">
                    <h1 className="font-bold text-5xl text-accent">Welcome</h1>
                    <div className="w-80 flex flex-col space-y-6">
                        <div className="relative h-14 w-full min-w-[200px]">
                            <input
                                className="peer h-full w-full border-b border-gray-900 bg-transparent pt-4 pb-1.5 font-sans text-xl font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                                type="text"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:text-xl peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Email
                            </label>
                        </div>
                        <div className="relative h-14 w-full min-w-[200px]">
                            <input
                                className="peer h-full w-full border-b border-gray-900 bg-transparent pt-4 pb-1.5 font-sans text-xl font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:text-xl peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Password
                            </label>
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-center space-y-4">
                        <button className="bg-accent py-1 px-4 rounded-lg text-secondary font-bold hover:bg-accent text-lg" id="loginBtn" onClick={handleLogin}>Login</button>
                        <p className="font-light text-sm">Not a Member? <a className="text-blue-950 hover:text-blue-700" href='/register'>Register Now</a></p>
                    </div>
                </div>
            </div>
        </div>)
}