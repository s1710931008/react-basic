import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getA3ById } from '../../api/contact'

export default function ContactDetail() {
    const { id } = useParams()

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await getA3ById(id)
                console.log(res.data)
            } catch (error) {
                console.error(error)
            }
        }

        if (id) {
            fetchDetail()
        }
    }, [id])

    return <h1>Contact Detail: {id}</h1>
}