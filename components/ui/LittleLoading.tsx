import Image from "next/image";
import { motion } from "framer-motion"

export default function LittleLoading() {
    return (
        <motion.div
          className="inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="relative w-10 h-10">
              <Image
                src="/images/zenith-logo.png"
                alt="Zenith Logo"
                fill
              />
            </div>
          </motion.div>
        </motion.div>
    )
}
