import { useEffect, useState } from 'react'

export const useIsRendered = () => {
    const [rendered, setRendered] = useState(false)
    useEffect(() => {
        setRendered(true)
    }, [])
    return rendered
}