"use client"
import { useEffect, useState } from 'react';
export default function Page() {
  useEffect(() => {
    window.location.href = "/login";
  }, []);
  return null;
}
