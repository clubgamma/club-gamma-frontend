import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code2, Bug, BookOpen, Puzzle, Boxes } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

const ProgressLevel = ({ userData }) => {
    const { prs } = userData;
    const [showCelebration] = useState(false);

    const categorizePRs = (prs) => {
        const categorized = {
            hard: 0,
            medium: 0,
            easy: 0,
            bug: 0,
            docs: 0
        };

        prs.forEach(pr => {
            if (pr.points === 8)
                categorized.hard++;
            else if (pr.points === 5)
                categorized.medium++;
            else if (pr.points === 3)
                categorized.easy++;
            else if (pr.points === 2)
                categorized.bug++;
            else if (pr.points === 1)
                categorized.docs++;
        });

        return categorized;
    };

    const prStats = categorizePRs(prs);

    const difficulties = [
        [
            {
                label: 'Hard',
                solved: prStats.hard,
                icon: Boxes,
                color: 'text-red-400',
                bgColor: 'bg-red-950/50',
                description: 'Complex features'
            },
            {
                label: 'Medium',
                solved: prStats.medium,
                icon: Puzzle,
                color: 'text-red-400',
                bgColor: 'bg-red-950/50',
                description: 'Moderate changes'
            }
        ],
        [
            {
                label: 'Easy',
                solved: prStats.easy,
                icon: Code2,
                color: 'text-red-400',
                bgColor: 'bg-red-950/50',
                description: 'Simple tasks'
            },
            {
                label: 'Bug',
                solved: prStats.bug,
                icon: Bug,
                color: 'text-red-400',
                bgColor: 'bg-red-950/50',
                description: 'Bug fixes'
            }
        ],
        [
            {
                label: 'Docs',
                solved: prStats.docs,
                icon: BookOpen,
                color: 'text-red-400',
                bgColor: 'bg-red-950/50',
                description: 'Documentation'
            }
        ]
    ];

    const totalPRs = prs.filter(pr => pr.state === 'merged').length;
    const completionRate = totalPRs > 0 ? Math.round((totalPRs / prs.length) * 100) : 0;

const DifficultyItem = ({ difficulty }) => (
    <div className="group bg-[#1e1e1e]/50 hover:bg-[#2a2a2a]/50 border border-[#4e3535] hover:border-red-900/50 transition-all duration-300 rounded-lg p-3 h-full">
        <div className="flex items-center justify-between h-full">
            <div className="flex items-center space-x-3">
                <div className={`rounded-lg ${difficulty.bgColor} sm:p-0 md:p-2`}>
                    <difficulty.icon className={`w-4 h-4 ${difficulty.color}`} />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-white sm:text-xs md:text-sm">{difficulty.label}</h3>
                    <p className={cn('block', 'sm:hidden', 'md:block', "text-xs text-zinc-400")}>{difficulty.description}</p>
                </div>
            </div>
            <div className="flex items-baseline space-x-1 sm:space-x-0 md:space-x-1">
                <span className={`text-lg font-bold ${difficulty.color}`}>
                    {difficulty.solved}
                </span>
            </div>
        </div>
    </div>
);

    return (
        <Card className="bg-gradient-to-br from-[#2a2a2a] to-[#3d2929] border-[#4e3535] w-full sm:w-[500px]">
            <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
                    Progress Overview
                </h2>

                <div className="space-y-3">
                    {difficulties.map((row, rowIndex) => (
                        <div key={rowIndex} className="grid grid-cols-2 gap-3">
                            {row.map((difficulty, index) => (
                                <div key={difficulty.label} className={row.length === 1 ? 'col-span-2' : ''}>
                                    <DifficultyItem difficulty={difficulty} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="mt-4 pt-4 border-t border-[#4e3535]">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-400">Acceptance Rate</span>
                        <span className="text-lg font-bold text-red-400">{completionRate}%</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProgressLevel;
