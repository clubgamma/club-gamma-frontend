import React from 'react'
import { GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon, Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const TeamCard = ({ member }) => {
    const { social } = member || {};

    return (
        <Card className="group relative min-h-[465px] bg-gradient-to-br from-[#1e1e1e] to-[#2d2424] text-white border-none transition-all duration-300 hover:bg-gradient-to-br overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-red-500/10 to-transparent rounded-full blur-2xl transform translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 left-0 w-44 h-44 bg-gradient-to-tr from-red-600/10 to-transparent rounded-full blur-2xl transform -translate-x-16 translate-y-16" />
            <CardHeader className="relative z-10 text-center pt-12 pb-4">
                <div className="relative mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                    <Avatar className="w-44 h-44 ring-4 ring-red-500/10">
                        <AvatarImage
                            src={member.imageUrl}
                            alt={member.name}
                            className="object-cover"
                        />
                        <AvatarFallback className="bg-[#2d2424] text-gray-300">
                            {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="space-y-3">
                    <CardTitle
                        className="text-2xl font-bold text-white/90 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-rose-500 group-hover:via-red-500 group-hover:to-orange-400 group-hover:bg-clip-text group-hover:text-transparent"
                    >
                        {member.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-medium">
                        {member.position}
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="text-center">
                <div className="relative">
                    <Quote className="w-6 h-6 mx-auto text-red-500/40" strokeWidth={1.5} />
                    <p className="text-gray-400 italic text-sm leading-relaxed">
                        "{member.tagline}"
                    </p>
                </div>
            </CardContent>

            <CardFooter className="absolute bottom-0 left-0 right-0 flex justify-center gap-6 pb-8">
                {social?.github && (
                    <a
                        href={social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                        <GithubIcon className="h-5 w-5" strokeWidth={1.5} />
                        <span className="sr-only">GitHub</span>
                    </a>
                )}
                {social?.linkedin && (
                    <a
                        href={social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                        <LinkedinIcon className="h-5 w-5" strokeWidth={1.5} />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                )}
                {social?.twitter && (
                    <a
                        href={social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                        <TwitterIcon className="h-5 w-5" strokeWidth={1.5} />
                        <span className="sr-only">Twitter</span>
                    </a>
                )}
                {social?.instagram && (
                    <a
                        href={social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                        <InstagramIcon className="h-5 w-5" strokeWidth={1.5} />
                        <span className="sr-only">Instagram</span>
                    </a>
                )}
            </CardFooter>
        </Card>
    );
};

export default TeamCard;