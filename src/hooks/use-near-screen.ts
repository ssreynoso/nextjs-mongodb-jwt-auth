import { useEffect, useRef, useState } from 'react'

type configProps = {
    distance?: string
    externalRef?: React.RefObject<HTMLDivElement> | null
    once?: boolean
}

export const useNearScreen = function ({ distance = '100px', externalRef, once = true }: configProps) {
    const [isNearScreen, setIsNearScreen] = useState(false)
    const fromRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let observer: IntersectionObserver

        const element = externalRef ? externalRef.current : fromRef.current

        const cb: IntersectionObserverCallback = function (
            entries: IntersectionObserverEntry[],
            obs: IntersectionObserver
        ) {
            const el = entries[0]
            if (el.isIntersecting) {
                setIsNearScreen(true)
                if (once) obs.disconnect()
            } else {
                if (!once) setIsNearScreen(false)
            }
        }

        // Envolvemos un valor en una promesa
        // De esta forma no hacemos un new Promise y le pasamos la función, etc...
        Promise.resolve(
            IntersectionObserver
            // typeof IntersectionObserver !== 'undefined'
            //     ? IntersectionObserver
            //     : import ('intersection-observer')
        ).then(() => {
            observer = new IntersectionObserver(cb, {
                rootMargin: distance,
            })

            if (element) observer.observe(element)
        })

        return () => observer && observer.disconnect()
    })

    return {
        isNearScreen,
        fromRef,
    }
}
