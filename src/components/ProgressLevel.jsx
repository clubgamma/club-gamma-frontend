import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Trophy, Target, Zap, Award } from 'lucide-react'

const ProgressLevel = ({ userData }) => {
    const { prs } = userData
    const [showCelebration, setShowCelebration] = useState(false)

    const categorizePRs = (prs) => {
        const categorized = {
            easy: { solved: 0, total: 0 },
            medium: { solved: 0, total: 0 },
            hard: { solved: 0, total: 0 }
        };

        prs.forEach(pr => {
            if (pr.points === 8) {
                categorized.hard.solved++;
                categorized.hard.total++;
            } else if (pr.points === 5) {
                categorized.medium.solved++;
                categorized.medium.total++;
            } else if (pr.points < 5) {
                categorized.easy.solved++;
                categorized.easy.total++;
            }
        });

        return categorized;
    };

    const prStats = categorizePRs(prs);

    const difficulties = [
        {
            label: 'Hard',
            solved: prStats.hard.solved,
            total: prStats.hard.total || 757,
            icon: Star,
            color: 'text-rose-400'
        },
        {
            label: 'Medium',
            solved: prStats.medium.solved,
            total: prStats.medium.total || 1742,
            icon: Target,
            color: 'text-amber-400'
        },
        {
            label: 'Easy',
            solved: prStats.easy.solved,
            total: prStats.easy.total || 830,
            icon: Zap,
            color: 'text-emerald-400'
        },

    ];

    const attempting = prs.filter(pr => pr.state === 'merged').length;

    return (
        <div className="flex w-full sm:max-w-[500px] items-center justify-center text-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-opacity-60 rounded-3xl shadow-2xl p-6 max-w-md w-full backdrop-blur-lg border border-red-500/20"
            >
                <motion.h2
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="text-xl font-bold text-start mb-6 text-red-300"
                >
                    Your Coding Journey
                </motion.h2>
                

                <div className="space-y-4 mb-8">
                    {difficulties.map((difficulty, index) => (
                        <motion.div
                            key={difficulty.label}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.5 }}
                            className="bg-gradient-to-br from-[#2a2a2a] to-[#3d2929] rounded-lg p-4 shadow-md flex items-center justify-between"
                        >
                            <div className="flex items-center space-x-3">
                                <difficulty.icon className={`w-6 h-6 ${difficulty.color}`} />
                                <span className="font-medium">{difficulty.label}</span>
                            </div>
                            <div className="text-right">
                                <div className={`text-lg font-bold ${difficulty.color}`}>
                                    {difficulty.solved}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="text-center"
                >
                    <span className="bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm font-medium">
                        {attempting} Problems Accepted out of {prs.length}
                    </span>
                </motion.div>

                <AnimatePresence>
                    {showCelebration && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        >
                            <Trophy className="w-24 h-24 text-yellow-400 animate-bounce" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default ProgressLevel