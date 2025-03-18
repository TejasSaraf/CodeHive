import { signIn } from "@/app/components/configurations/auth"
import React from 'react';

export default function Navbar() {
    return(
        <nav className='nav flex h-12 w-100 justify-center justify-between m-3'>
            <h1 className='text-white text-xl font-medium'>CodeHive</h1>
            <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit" className='text-white text-xl'>Signin with Google</button>
    </form>
        </nav>
    )
}
