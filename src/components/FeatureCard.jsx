import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiRadio, FiShield, FiUploadCloud } from 'react-icons/fi';

const ICONS = {
  target: FiTarget,
  scan: FiRadio,
  shield: FiShield,
  upload: FiUploadCloud
};

export default function FeatureCard({ title, description, icon, index = 0 }) {
  const Icon = ICONS[icon] || FiTarget;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="card p-6"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-moss-50 dark:bg-moss-500/10 text-moss-500">
        <Icon size={20} />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-paper-200/70">{description}</p>
    </motion.div>
  );
}
