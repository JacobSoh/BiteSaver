"use client"
import { motion, AnimatePresence } from "framer-motion";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";
import { useContext, useRef } from "react";

export default function Transition({
  children
}: {
  children: React.ReactNode;
}) {
  const key = usePathname()
  const variants = {
    hidden: { opacity: 0, y: 50},
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  }

  function FrozenRouter(props: { children: React.ReactNode }) {
    const context = useContext(LayoutRouterContext ?? {})
    const frozen = useRef(context).current;
    if (!frozen) {
      return <>{props.children}</>;
    }
    return (
      <LayoutRouterContext.Provider value={frozen}>
        {props.children}
      </LayoutRouterContext.Provider>
    );
  }

  return (
    <AnimatePresence mode="wait">
        <motion.div
        key={key}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: "easeInOut", duration: 0.5 }}
        >
          <FrozenRouter>
            {children}
          </FrozenRouter>
        </motion.div>
    </AnimatePresence>
  );
}