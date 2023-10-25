'use client'
import { DesktopIcon, HamburgerMenuIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'
import { NavBarOption } from '@/types/utils'
import { cn } from '@/lib/utils'

export const DropdownNavbarMenu = ({ options, className }: { options: NavBarOption[], className: string }) => {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className={cn(
                    'absolute right-0 w-10 h-10',
                    className,
                )}>
                    <HamburgerMenuIcon className="w-3/5 h-3/5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[90vw] translate-x-[-5vw] translate-y-2">
                <DropdownMenuGroup>
                    { options.map(option => (
                        <DropdownMenuItem key={option.value}>
                            <a href={option.value}><span>{option.label}</span></a>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <span>Toggle Mode</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent sideOffset={-124} alignOffset={40}>
                                <DropdownMenuItem onClick={() => setTheme('light')}>
                                    <SunIcon className="mr-2 h-4 w-4" />
                                    <span>Light</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme('dark')}>
                                    <MoonIcon className="mr-2 h-4 w-4" />
                                    <span>Dark</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme('system')}>
                                    <DesktopIcon className="mr-2 h-4 w-4" />
                                    <span>System</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}