"use client"

import { motion } from 'framer-motion'

export default function DisplayPlans({children} : {children: React.ReactNode}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 text-center'>
                {children}
            </ul>
        </motion.div>
    )
}
