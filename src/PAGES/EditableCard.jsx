import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EditableCard = () => {
  const [open, setOpen] = useState(true);
  const [items, setItems] = useState(["Item 1", "Item 2"]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <motion.div 
      className="max-w-xl mx-auto bg-white shadow-md rounded p-4 my-4 dark:bg-gray-800"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Card Header */}
      <motion.div 
        className="flex justify-between items-center"
        variants={itemVariants}
      >
        <h2 className="text-lg font-bold">My Editable Card</h2>
        <motion.button
          onClick={() => setOpen(!open)}
          className="text-sm text-blue-500 hover:underline"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {open ? "Minimize" : "Expand"}
        </motion.button>
      </motion.div>

      {/* Animated Content Section */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="space-y-2">
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded"
                    variants={itemVariants}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>{item}</span>
                    <motion.button
                      onClick={() => deleteItem(index)}
                      className="text-red-500 text-sm hover:underline"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Delete
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.button
                onClick={addItem}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add Item
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EditableCard;
