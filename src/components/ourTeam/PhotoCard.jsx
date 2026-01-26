import { useLayoutEffect, useRef, useState } from 'react'
import {
    leftBorder,
    rightBorder,
    instaIcon,
    mailIcon
} from '../../assets/ourTeam'
import purpleInsta from '../../assets/ourTeam/purple_insta.png'
import purpleGmail from '../../assets/ourTeam/purple_gmail.png'
import orangeInsta from '../../assets/ourTeam/yellow_insta.png'
import orangeGmail from '../../assets/ourTeam/yellow_email.png'

const PhotoCard = ({ imageUrl, name, role, size = "normal", theme = "blue" }) => {
    const cardRef = useRef(null);
    const [labelWidth, setLabelWidth] = useState('auto');

    const getSizeClasses = () => {
        if (size === "small") {
            return {
                image: "w-[82px] sm:w-[110px] md:w-[110px] lg:w-[138px] xl:w-[12.8vw] 2xl:w-[14.8vw]",
                bottom: "-bottom-[38px] sm:-bottom-[50px] md:-bottom-[45px] lg:-bottom-[50px] xl:-bottom-[75px] 2xl:-bottom-[95px]",
                icon: "w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-[2.5vw] xl:h-[2.5vw] 2xl:w-[3vw] 2xl:h-[3vw]",
                name: "text-[0.38rem] sm:text-[0.48rem] md:text-[0.58rem] lg:text-[0.65rem] xl:text-[0.65vw] 2xl:text-[0.85vw]",
                role: "text-[0.28rem] sm:text-[0.38rem] md:text-[0.48rem] lg:text-[0.55rem] xl:text-[0.45vw] 2xl:text-[0.65vw]",
                labelClass: "label-pill-compact"
            };
        } else if (size === "medium") {
            return {
                image: "w-[90px] sm:w-[122px] md:w-[122px] lg:w-[150px] xl:w-[13.8vw] 2xl:w-[15.8vw]",
                bottom: "-bottom-[42px] sm:-bottom-[54px] md:-bottom-[50px] lg:-bottom-[54px] xl:-bottom-[82px] 2xl:-bottom-[105px]",
                icon: "w-[21px] h-[21px] sm:w-7 sm:h-7 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-[2.7vw] xl:h-[2.7vw] 2xl:w-[3.3vw] 2xl:h-[3.3vw]",
                name: "text-[0.5rem] sm:text-[0.65rem] md:text-[0.75rem] lg:text-[0.88rem] xl:text-[0.95vw] 2xl:text-[1.15vw]",
                role: "text-[0.4rem] sm:text-[0.55rem] md:text-[0.65rem] lg:text-[0.75rem] xl:text-[0.75vw] 2xl:text-[0.95vw]",
                labelClass: "label-pill-compact"
            };
        } else {
            return {
                image: "w-[108px] sm:w-[140px] md:w-[140px] lg:w-[165px] xl:w-[16vw] 2xl:w-[19vw]",
                bottom: "-bottom-[45px] sm:-bottom-[58px] md:-bottom-[54px] lg:-bottom-[58px] xl:-bottom-[90px] 2xl:-bottom-[115px]",
                icon: "w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-[3.2vw] xl:h-[3.2vw] 2xl:w-[3.8vw] 2xl:h-[3.8vw]",
                name: "text-[0.65rem] sm:text-[0.7rem] md:text-[0.85rem] lg:text-[1rem] xl:text-[1.1vw] 2xl:text-[1.3vw]",
                role: "text-[0.55rem] sm:text-[0.6rem] md:text-[0.75rem] lg:text-[0.85rem] xl:text-[0.9vw] 2xl:text-[1.1vw]",
                labelClass: ""
            };
        }
    };

    const classes = getSizeClasses();
    const imageWidthClasses = classes.image;
    const bottomClasses = classes.bottom;
    const iconWidthClasses = classes.icon;
    const nameTextSize = classes.name;
    const roleTextSize = classes.role;

    useLayoutEffect(() => {
        const updateWidth = () => {
            if (cardRef.current) {
                const multiplier = window.innerWidth < 640 ? 2.2 : 3.8;
                setLabelWidth(cardRef.current.offsetWidth * multiplier);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const getIcons = () => {
        if (theme === 'orange') {
            return { insta: orangeInsta, mail: orangeGmail };
        } else if (theme === 'purple') {
            return { insta: purpleInsta, mail: purpleGmail };
        }
        return { insta: instaIcon, mail: mailIcon };
    };

    const icons = getIcons();

    const getLabelClass = () => {
        const baseClass = classes.labelClass;
        if (theme === 'orange') {
            return `label-pill-ticket-orange ${baseClass}`;
        } else if (theme === 'purple') {
            return `label-pill-ticket-purple ${baseClass}`;
        }
        return `label-pill-ticket ${baseClass}`;
    };

    const isLongName = name && name.length >= 11;
    const nameDisplaySize = isLongName
        ? "text-[0.32rem] sm:text-[0.42rem] md:text-[0.52rem] lg:text-[0.6rem] xl:text-[0.55vw] 2xl:text-[0.75vw]"
        : nameTextSize;

    return (
        <div className="relative flex flex-col items-center">
            <div ref={cardRef} className={`relative flex items-center bg-white p-[1.5px] sm:p-[2px] md:p-[2.5px] rounded-[12px] sm:rounded-[15px] md:rounded-[18px] shadow-xl transform transition-transform hover:scale-105`}>
                <img src={leftBorder} className="h-[96%] absolute top-[-3%] w-auto z-[2] pointer-events-none -left-3 sm:-left-4 md:-left-5 lg:-left-[24px]" alt="" />
                <div className={`${imageWidthClasses} aspect-[16/24] overflow-hidden relative rounded-[10.5px] sm:rounded-[13px] md:rounded-[16px]`}>
                    <img src={imageUrl} alt={name || "Team Member"} className="w-full h-full object-cover" />
                </div>
                <img src={rightBorder} className="h-[106%] absolute top-[-3%] w-auto z-[2] pointer-events-none -right-3 sm:-right-4 md:-right-5 lg:-right-[24px]" alt="" />
            </div>

            {(name || role) && (
                <div className={`absolute ${bottomClasses} flex items-center gap-0.5 sm:gap-1 md:gap-1.5 z-10`}>
                    <a href="#" className={`${iconWidthClasses} flex items-center justify-center transition-transform hover:scale-110`}>
                        <img src={icons.insta} className="max-w-full max-h-full object-contain drop-shadow-md" alt="Instagram" />
                    </a>

                    <div
                        className={`${getLabelClass()} px-4 text-center`}
                        style={{ width: labelWidth }}
                    >
                        <div className={`${nameDisplaySize} text-white font-bold tracking-wider leading-[1.1] uppercase font-sans whitespace-nowrap`}>
                            {name}
                        </div>
                        <div className={`${roleTextSize} text-white/95 font-normal tracking-[0.12em] uppercase font-sans leading-tight`}>
                            {role}
                        </div>
                    </div>

                    <a href="#" className={`${iconWidthClasses} flex items-center justify-center transition-transform hover:scale-110`}>
                        <img src={icons.mail} className="max-w-full max-h-full object-contain drop-shadow-md" alt="Email" />
                    </a>
                </div>
            )}
        </div>
    )
}

export default PhotoCard
