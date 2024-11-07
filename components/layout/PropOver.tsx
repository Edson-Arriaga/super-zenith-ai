import { motion } from "framer-motion";

type PropOverProps = {
    children: React.ReactNode
}

export default function PropOver({children} : PropOverProps) {
    return (
        <motion.div
            className="absolute h-4/5 shadow-md bg-gradient-to-r from-zenith-dark-purple via-zenith-dark-purple border-zenith-yellow border-l-2 inset-0 my-auto left-20 z-50 text-zenith-yellow min-w-60 flex items-center justify-start pl-2 rounded-lg "
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0}}
            transition={{ duration: 0.4 }}
        >
            <div className="absolute w-full h-full inset-0  bg-purple-500/10 z-40 rounded-lg" />
            <p className="relative z-50 text-center font-black text-zenith-yellow px-1">
                {children}
            </p>
        </motion.div>
    )
}
