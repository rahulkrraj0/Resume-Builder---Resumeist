import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiZap, FiArrowRight } from 'react-icons/fi';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import UploadResume from '../components/UploadResume';
import JobDescription from '../components/JobDescription';
import Loader from '../components/Loader';
import { useResume } from '../context/ResumeContext.jsx';
import { FEATURES } from '../utils/constants';

export default function Home() {
  const navigate = useNavigate();
  const { generate, status, error, resumeText, jobDescription } = useResume();
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleGenerate = async () => {
    const result = await generate();
    if (result.ok) {
      toast.success('Resume tailored successfully');
      navigate('/builder');
    } else {
      toast.error(result.message);
    }
  };

  const isLoading = status === 'loading';
  const readyToGenerate = resumeText.trim().length >= 40 && jobDescription.trim().length >= 40;

  return (
    <div>
      <Hero onStart={scrollToForm} />

      <section className="section-pad py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="eyebrow">Why Resumeist</p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Built for accuracy, tuned for ATS</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section ref={formRef} id="builder-form" className="section-pad py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="eyebrow">Get started</p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Two inputs. One tailored resume.</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <UploadResume />
            <JobDescription />
          </div>

          {status === 'error' && error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              role="alert"
              className="mt-6 rounded-xl border border-clay-500/30 bg-clay-500/5 px-4 py-3 text-center text-sm text-clay-500"
            >
              {error}
            </motion.p>
          )}

          <div className="mt-8 flex flex-col items-center gap-4">
            {isLoading ? (
              <Loader full label="Tailoring your resume against the job description…" />
            ) : (
              <button
                type="button"
                onClick={handleGenerate}
                disabled={!readyToGenerate}
                className="btn-accent px-8 py-4 text-base"
              >
                <FiZap /> Generate resume <FiArrowRight />
              </button>
            )}
            {!readyToGenerate && !isLoading && (
              <p className="text-xs text-ink-400">
                Add both your resume and the job description to enable generation.
              </p>
            )}
            {!isLoading && (
              <p className="max-w-md text-center text-xs text-ink-400">
                Powered by Puter AI — free to use. The first generation may ask you to sign in with a
                free Puter account; usage draws from that account's small free credit balance.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
