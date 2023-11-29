"use client"
import { useEffect, useState } from 'react';
export default function Page() {
  useEffect(() => {
    // Redirect ke halaman login hanya sekali saat komponen dimuat
    window.location.href = "/login";
  }, []);
  return null;
}
