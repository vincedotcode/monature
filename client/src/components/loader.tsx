import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white border border-lime-500 rounded-lg p-4 flex items-center justify-center">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center justify-center"
        >
          <Leaf className="h-12 w-12 text-lime-500" />
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;
