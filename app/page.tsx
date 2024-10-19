// import Image from 'next/image';
// import React from 'react'
// import img from '@/app/assets/photo-1719937050792-a6a15d899281.avif'

// const page = async () => {
  
//   const data = await fetch('https://jsonplaceholder.typicode.com/users' , {
//     cache : 'no-store', 
//   })
//   const response = await data.json()
//   console.log(response);

    
//   return (
//     <>
//     <h1 className='text-center mt-5 text-2xl'>Meme Maker { new Date().toLocaleTimeString()}</h1>
//     <div className='flex justify-center  mt-5'>
//      <Image src={img} width={200} height={200} alt='image'/>
//     </div>
//     {response.map((item: {  name : string, id : number, email: string, phone: string})=>{
//       return <div key={item.id} className='text-center mt-3 text-xl'>
//         <h1>{item.name}</h1>
//         <h1>{item.email}</h1>
//         <h1>{item.phone}</h1>
//         <hr />
//         {/* <h1>{item.name}</h1> */}
//       </div>
//     })}
//     </>
//   )
// }

// export default page





import { url } from 'inspector';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async () => {
  
interface Memes{
  id : string;
  name : string;
  url : string;
  box_count : number;
}

  const data = await fetch('https://api.imgflip.com/get_memes' , {
    cache : 'no-store',
  })
  const response = await data.json()
  console.log(response.data.memes);
  

  return (
    <div className='min-h-screen bg-[#D17FF1] flex flex-col items-center justify-center'>
    <h1 className='text-center mt-5 text-2xl '>Meme Maker</h1>
    <div className='flex justify-center items-center gap-5 flex-wrap'>
    {response.data.memes.map((item : Memes)=>{
      return <div>
         <Image  src={item.url} width={200} height={200} alt='memes' />
         <Link href={{
          pathname : 'creatememe',
          query : {
            url : item.url,
            id : item.id,
            box_count : item.box_count
          }
          }}>
           <div className='text-center'>
           <button className='mt-4 p-2 bg-black text-white rounded'>Generate Meme</button>
           </div>
          </Link>
        
        </div>
    })}
    </div>
    </div>
  )
}

export default page



