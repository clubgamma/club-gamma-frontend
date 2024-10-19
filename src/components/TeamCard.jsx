import React from 'react'
import { GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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
        <Card className="overflow-hidden font-dm-sans bg-gradient-to-br from-[#2a2a2a] to-[#3d2a2a] text-white border-none transition-all duration-200 hover:scale-105 hover:shadow-xl">
            <div className="inset-0 bg-gradient-to-tr from-purple-500/10 to-orange-500/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            <CardHeader className="relative z-10 text-center">
                <div className="relative mx-auto  mb-4">
                    <Avatar className="w-28 h-28 mx-auto border-4 border-[#2a2a2a]">
                        <AvatarImage src={member.imageUrl} alt={member.name} />
                    </Avatar>
                </div>
                <CardTitle className="mt-4 text-2xl font-bold text-gray-100">{member.name}</CardTitle>
                <CardDescription className="text-gray-300 italic">{member.position}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center space-x-4">
                {social?.github && (
                    <Button variant="ghost" size="icon" asChild>
                        <a href={social.github} target="_blank" rel="noopener noreferrer">
                            <GithubIcon className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </a>
                    </Button>
                )}
                {social?.linkedin && (
                    <Button variant="ghost" size="icon" asChild>
                        <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                            <LinkedinIcon className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                    </Button>
                )}
                {social?.twitter && (
                    <Button variant="ghost" size="icon" asChild>
                        <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                            <TwitterIcon className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </a>
                    </Button>
                )}
                {social?.instagram && (
                    <Button variant="ghost" size="icon" asChild>
                        <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                            <InstagramIcon className="h-5 w-5" />
                            <span className="sr-only">Instagram</span>
                        </a>
                    </Button>
                )

                }
            </CardFooter>
        </Card>
    );
};

export default TeamCard;
