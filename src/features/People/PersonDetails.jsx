import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getPersonDetailsAsync, selectPersonDetails } from "./personSlice"


const PersonDetails = () =>  {
    const dispatch = useDispatch();
    const { id } = useParams();
    const personDetails = useSelector(selectPersonDetails);

    console.log(personDetails)

    useEffect(() => {
        dispatch(getPersonDetailsAsync(id))
    }, [dispatch, id])

    return (
        <div>{personDetails}</div>
    )
}

export default PersonDetails
