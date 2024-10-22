import React from 'react'
import { GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react"
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
        <Card className="group min-h-[400px] bg-gradient-to-br from-[#1e1e1e] to-[#2d2424] text-white border-none transition-all duration-300 hover:bg-gradient-to-br hover:from-[#232323] hover:to-[#362b2b]">
            <CardHeader className="relative z-10 text-center pt-12 pb-8">
                <div className="relative mx-auto mb-8">
                    <Avatar className="w-32 h-32 mx-auto">
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
                    <CardTitle className="text-2xl font-bold text-white">
                        {member.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-normal">
                        {member.position}
                    </CardDescription>
                </div>
            </CardHeader>
            
            <CardContent className="flex-grow" />
            
            <CardFooter className="flex justify-center gap-6 pb-12">
                {social?.github && (
                    <a 
                        href={social.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-200"
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
                        className="text-gray-400 hover:text-white transition-colors duration-200"
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
                        className="text-gray-400 hover:text-white transition-colors duration-200"
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
                        className="text-gray-400 hover:text-white transition-colors duration-200"
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