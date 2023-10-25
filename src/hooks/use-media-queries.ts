import { useMediaQuery } from 'usehooks-ts'
import { useIsRendered } from './use-is-rendered'

export const useMediaQuerySm = () => {
    const rendered = useIsRendered()
    const matches = useMediaQuery('(min-width: 640px)')
    return rendered && matches
}

export const useMediaQueryMd = () => {
    const rendered = useIsRendered()
    const matches = useMediaQuery('(min-width: 768px)')
    return rendered && matches
}

export const useMediaQueryLg = () => {
    const rendered = useIsRendered()
    const matches = useMediaQuery('(min-width: 1024px)')
    return rendered && matches
}

export const useMediaQueryXl = () => {
    const rendered = useIsRendered()
    const matches = useMediaQuery('(min-width: 1280px)')
    return rendered && matches
}

export const useMediaQuery2Xl = () => {
    const rendered = useIsRendered()
    const matches = useMediaQuery('(min-width: 1536px)')
    return rendered && matches
}
