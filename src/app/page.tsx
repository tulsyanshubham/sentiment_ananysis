'use client';
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PieChartComp } from '@/components/ui/pie'

export default function page() {
  const [posStatus, setPosStatus] = useState(0);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPosStatus(0);
    const response = await fetch('http://localhost:5000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    })
    const result = await response.json()
    if (result.sentiment === "Positive") {
      setPosStatus(result.percentage);
    }
    else {
      setPosStatus(100 - result.percentage);
    }
    console.log(result)
  };
  const [text, setText] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  return (
    <div className='flex items-center justify-center flex-col gap-10'>
      <form onSubmit={handleSubmit}>
        <div className='w-[40vw] mt-16 flex flex-row gap-2 flex-2'>
          <Label htmlFor="inp" className='text-2xl'>Text</Label>
          <Input id="inp" type="text" required onChange={handleChange} />
          <Button>Get</Button>
        </div>
      </form>
      {posStatus !== 0 ? <PieChartComp posStatus={posStatus} /> : ("")}
    </div>
  )
}
