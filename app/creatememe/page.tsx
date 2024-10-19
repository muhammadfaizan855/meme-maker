'use client'

import { saveAs } from 'file-saver'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

const Page = ({ searchParams }: { searchParams: { id: string; url: string; box_count: number } }) => {
    const [meme, setMeme] = useState<string | null>(null);
    const inputs = useRef<HTMLInputElement[]>(Array(searchParams.box_count).fill(null));

    const createMeme = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const texts = inputs.current.map(input => input?.value).filter(Boolean);
        const data = await fetch(`https://api.imgflip.com/caption_image?template_id=${searchParams.id}&username=Muhammad_Faizan&password=programmer123&${texts.map((text, index) => `text${index}=${text}`).join('&')}`, {
            method: 'POST'
        });
        const response = await data.json();
        setMeme(response.data.url);
    }


    const getInputFields = () => {
        const fields = [];
        for (let i = 0; i < searchParams.box_count; i++) {
            fields.push(
                <input
                    type="text"
                    key={i}
                    placeholder={`Text ${i + 1}`}
                    ref={el => inputs.current[i] = el}
                    className="w-full flex flex-col p-3 my-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300"
                />
            );
        }
        return fields;
    };

    return (
        <div className='min-h-screen bg-[#D17FF1] flex flex-col items-center justify-center'>

            <h1 className='text-center mt-5 text-3xl my-5'>Create Meme</h1>
            
            <Image src={searchParams.url} width={400} height={200} alt='memes' />
            <form onSubmit={createMeme}>
                {getInputFields()}
                <div className='text-center'>
                <button type='submit' className='mt-4 p-2 my-5 bg-black text-white rounded'>Generate Meme</button>
                </div>
            </form>
            
            {meme && <Image src={meme} width={400} height={200} alt="Generated Meme" />}
        </div>
    );
}

export default Page;
